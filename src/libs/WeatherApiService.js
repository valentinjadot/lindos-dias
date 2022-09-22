import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import Day from './Day';
import HalfDay from './HalfDay';

dayjs.extend(isSameOrBefore);

const NOON_IN_HOURS = 12;
export default class WeatherApiService {
  constructor(coords) {
    this.coords = coords;
    this.url = null;
    this.timeSeries = {
      daily: [],
      hourly: [],
    };
    this.days = [];
  }

  async loadDays() {
    if (!this.coords.latitude || !this.coords.longitude) {
      throw new Error('No coordinates provided');
    }
    await this.buildAPIUrl();
    await this.fetchDataFromWeatherAPI();
    this.buildDays();
    return this.days;
  }

  async fetchDataFromWeatherAPI() {
    const res = await fetch(this.url);
    const { daily, hourly } = await res.json();

    this.timeSeries = {
      daily,
      hourly,
    };
  }

  async buildAPIUrl() {
    this.url = `https://api.open-meteo.com/v1/forecast?latitude=${this.coords.latitude}&longitude=${this.coords.longitude}&hourly=precipitation,cloudcover,windspeed_10m&daily=sunrise,sunset&timezone=auto`;
  }

  savePosition(position) {
    this.position = position;
  }

  buildDays() {
    this.timeSeries.daily.time.forEach((dayString, i) => {
      const date = dayjs(dayString);

      const evaluatedDay = new Day({
        date,
        sunrise: dayjs(this.timeSeries.daily.sunrise[i]),
        sunset: dayjs(this.timeSeries.daily.sunset[i]),
        morning: new HalfDay(date, 'morning'),
        afternoon: new HalfDay(date, 'afternoon'),
      });

      this.timeSeries.hourly.time.forEach((timeString, timeSerieIndex) => {
        const hour = dayjs(timeString);
        this.addHourlyDataToEvaluatedDay(hour, timeSerieIndex, evaluatedDay);
      });

      this.days.push(evaluatedDay);
    });
  }

  addHourlyDataToEvaluatedDay(hour, timeSerieIndex, evaluatedDay) {
    if (!this.isRelevantHour(evaluatedDay, hour)) {
      return;
    }
    const pointedHalfDay = this.isMorning(hour) ? evaluatedDay.morning : evaluatedDay.afternoon;

    pointedHalfDay.addPrecipitation(this.timeSeries.hourly.precipitation[timeSerieIndex]);
    pointedHalfDay.addCloudcover(this.timeSeries.hourly.cloudcover[timeSerieIndex]);
    pointedHalfDay.addWindspeed(this.timeSeries.hourly.windspeed_10m[timeSerieIndex]);
    pointedHalfDay.addHour();
  }

  static isRelevantHour(evaluatedDay, hour) {
    const isSameDay = hour.isSame(evaluatedDay.date, 'day');
    const isDaylight = (hour.isAfter(evaluatedDay.sunrise)
      && hour.isSameOrBefore(evaluatedDay.sunset));
    return isSameDay && isDaylight;
  }

  static isMorning(hour) {
    return hour.hour() < NOON_IN_HOURS;
  }
}
