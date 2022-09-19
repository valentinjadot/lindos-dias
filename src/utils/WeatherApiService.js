import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import HalfDay from './HalfDay';
import Day from './Day';
dayjs.extend(isSameOrBefore);

const NOON_IN_HOURS = 12;

export default class WeatherApiService {
  constructor() {
    this.WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=-51.73&longitude=-72.50&hourly=precipitation,cloudcover,windspeed_10m&daily=sunrise,sunset&timezone=auto`;
    this.timeSeries = {
      daily: [],
      hourly: []
    };
    this.days = [];
    this.goodHalfDays = [];
  }

  async loadDays() {
    await this.fetchDataFromWeatherAPI();
    this.buildDays();
    return this.days;
  }

  async fetchDataFromWeatherAPI() {
    let res = await fetch(this.WEATHER_API_URL);
    let { daily, hourly } = await res.json();

    this.timeSeries = {
      daily,
      hourly
    };
  }

  buildDays() {
    this.timeSeries.daily.time.forEach((dayString, i) => {

      const date = dayjs(dayString);

      let evaluatedDay = new Day({
        date,
        sunrise: dayjs(this.timeSeries.daily.sunrise[i]),
        sunset: dayjs(this.timeSeries.daily.sunset[i]),
        morning: new HalfDay(date, "morning"),
        afternoon: new HalfDay(date, "afternoon")
      })

      this.timeSeries.hourly.time.forEach((timeString, timeSerieIndex) => {
        const hour = dayjs(timeString);
        this.addHourlyDataToEvaluatedDay(hour, timeSerieIndex, evaluatedDay);
      });

      this.days.push(evaluatedDay);

      if (evaluatedDay.morning.hasGoodWeather()) {
        this.goodHalfDays.push(evaluatedDay.morning);
      }

      if (evaluatedDay.afternoon.hasGoodWeather()) {
        this.goodHalfDays.push(evaluatedDay.afternoon);
      }
    });
  }


  addHourlyDataToEvaluatedDay(hour, timeSerieIndex, evaluatedDay) {
    if (!this.isRelevantHour(evaluatedDay, hour)) {
      return;
    }
    const pointedHalfDay = this.isMorning(hour) ? evaluatedDay.morning : evaluatedDay.afternoon
    pointedHalfDay.weather.precipitation += this.timeSeries.hourly.precipitation[timeSerieIndex];
    pointedHalfDay.weather.cloudcover += this.timeSeries.hourly.cloudcover[timeSerieIndex];
    pointedHalfDay.weather.windspeed += this.timeSeries.hourly.windspeed_10m[timeSerieIndex];
    pointedHalfDay.hours++;
  }

  isRelevantHour(evaluatedDay, hour) {
    let isSameDay = hour.isSame(evaluatedDay.date, "day");
    let isDaylight = (hour.isAfter(evaluatedDay.sunrise) && hour.isSameOrBefore(evaluatedDay.sunset));
    return isSameDay && isDaylight;
  }

  isMorning(hour) {
    return hour.hour() < NOON_IN_HOURS;
  }
}
