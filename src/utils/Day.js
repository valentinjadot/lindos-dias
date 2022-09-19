export default class Day {
    constructor({
        date,
        sunrise,
        sunset,
        morning,
        afternoon
    }) {
        this.date = date;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.morning = morning;
        this.afternoon = afternoon;
    }
}
