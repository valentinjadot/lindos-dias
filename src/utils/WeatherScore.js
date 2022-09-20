export default class WeatherScore {
  constructor({ precipitation, averageCloudcover, averageWindspeed }) {
    this.MAX_RAIN_MM = 3;
    this.MAX_WIND_KMH = 30;
    this.precipitation = precipitation;
    this.averageCloudcover = averageCloudcover;
    this.averageWindspeed = averageWindspeed;
  }

  score() {
    const total = this.precipitationScore() + this.cloudcoverScore() + this.windScore();
    return this.mapScore(total, 0, 3, 0, 100);
  }

  precipitationScore() {
    return this.mapScore(this.precipitation, this.MAX_RAIN_MM, 0)
  }

  cloudcoverScore() {
    return this.mapScore(this.averageCloudcover, 100, 0, 0, 1);
  }

  windScore() {
    return this.mapScore(this.averageWindspeed, this.MAX_WIND_KMH, 0)
  }

  mapScore(n, realMin, realMax, scoreMin = 0, scoreMax = 1) {
    return ((n - realMin) / (realMax - realMin)) * (scoreMax - scoreMin) + scoreMin;
  };

}
