import WeatherScore from "./WeatherScore";
export default class HalfDay {
  constructor(date, type) {
    this.date = date;
    this.type = type;
    this.weather = {
      precipitation: 0,
      cloudcover: 0,
      windspeed: 0,
    }
    this.hours = 0;
  }
  set sunset(time) {
    this.sunset = time
  }
  set sunrise(time) {
    this.sunrise = time
  }

  averageCloudcover() {
    return this.weather.cloudcover / this.hours;
  }

  averageWindspeed() {
    return this.weather.windspeed / this.hours;
  }

  weatherScore() {
    return new WeatherScore({
      precipitation: this.weather.precipitation,
      averageCloudcover: this.averageCloudcover(),
      averageWindspeed: this.averageWindspeed(),
    }).score();
  }
}
