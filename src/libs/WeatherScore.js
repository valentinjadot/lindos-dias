export default class WeatherScore {
  constructor({ precipitation, averageCloudcover, averageWindspeed }) {
    this.MAX_RAIN_MM = 3;
    this.MAX_WIND_KMH = 30;
    this.precipitation = precipitation;
    this.averageCloudcover = averageCloudcover;
    this.averageWindspeed = averageWindspeed;
  }

  tierIndex() {
    if (this.score() >= 80) return 3;
    if (this.score() >= 60) return 2;
    if (this.score() >= 10) return 1;
    return 0;
  }

  score() {
    const total = this.precipitationScore() + this.cloudcoverScore() + this.windScore();
    return WeatherScore.mapScore(total, 0, 3, 0, 100);
  }

  precipitationScore() {
    return WeatherScore.mapScore(this.precipitation, this.MAX_RAIN_MM, 0);
  }

  cloudcoverScore() {
    return WeatherScore.mapScore(this.averageCloudcover, 100, 0, 0, 1);
  }

  windScore() {
    return WeatherScore.mapScore(this.averageWindspeed, this.MAX_WIND_KMH, 0);
  }

  static mapScore(n, realMin, realMax, scoreMin = 0, scoreMax = 1) {
    return ((n - realMin) / (realMax - realMin)) * (scoreMax - scoreMin) + scoreMin;
  }
}
