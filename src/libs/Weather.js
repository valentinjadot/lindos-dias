export default class Weather {
  constructor({ precipitation, cloudcover, windspeed }) {
    this.precipitation = precipitation;
    this.cloudcover = cloudcover;
    this.windspeed = windspeed;
  }

  averageCloudcover() {
    return this.cloudcover / this.hours;
  }

  averageWindspeed() {
    return this.windspeed / this.hours;
  }

  isGood() {
    return this.precipitation < 3 && this.averageCloudcover() < 30 && this.averageWindspeed() < 25;
  }
}
