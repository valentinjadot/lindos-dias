import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import HalfDay from './HalfDay';
import Day from './Day';
dayjs.extend(isSameOrBefore);

const NOON_IN_HOURS = 12;

export default class WeatherApiService {
  constructor() {
    this.timeSeries = {
      daily: [],
      hourly: []
    };
    this.days = [];
  }

  async loadDays() {
    await this.buildAPIUrl();
    await this.fetchDataFromWeatherAPI();
    this.buildDays();
    return this.days;
  }

  getCoords() {
    return this.position.coords;
  }

  async fetchDataFromWeatherAPI() {
    let res = await fetch(this.url);
    let { daily, hourly } = await res.json();

    this.timeSeries = {
      daily,
      hourly
    };
  }

  async buildAPIUrl() {
    this.position = await this.requestPosition();
    let { latitude, longitude } = this.getCoords();
    this.url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=precipitation,cloudcover,windspeed_10m&daily=sunrise,sunset&timezone=auto`;
  }

  requestPosition() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
    };

    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        position => { resolve(position); },
        error => { reject(error); },
        options);
    });
  }

  savePosition(position) {
    this.position = position;
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

  isRelevantHour(evaluatedDay, hour) {
    let isSameDay = hour.isSame(evaluatedDay.date, "day");
    let isDaylight = (hour.isAfter(evaluatedDay.sunrise) && hour.isSameOrBefore(evaluatedDay.sunset));
    return isSameDay && isDaylight;
  }

  isMorning(hour) {
    return hour.hour() < NOON_IN_HOURS;
  }
}
