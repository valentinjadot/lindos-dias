import WeatherScore from "./WeatherScore";
export default class HalfDay {
  constructor(date, type) {
    this.date = date;
    this.type = type;
    this.weatherData = {
      precipitation: 0,
      cloudcover: 0,
      windspeed: 0,
      hours: 0
    }
  }
  set sunset(time) {
    this.sunset = time
  }
  set sunrise(time) {
    this.sunrise = time
  }

  addPrecipitation(precipitation) {
    this.weatherData.precipitation += precipitation;
  }

  addCloudcover(cloudcover) {
    this.weatherData.cloudcover += cloudcover;
  }

  addWindspeed(windspeed) {
    this.weatherData.windspeed += windspeed;
  }

  addHour() {
    this.weatherData.hours++;
  }

  precipitation() {
    return this.weatherData.precipitation;
  }

  averageCloudcover() {
    return this.weatherData.cloudcover / this.weatherData.hours;
  }

  averageWindspeed() {
    return this.weatherData.windspeed / this.weatherData.hours;
  }

  weatherScore() {
    return new WeatherScore({
      precipitation: this.precipitation(),
      averageCloudcover: this.averageCloudcover(),
      averageWindspeed: this.averageWindspeed(),
    })
  }
}
