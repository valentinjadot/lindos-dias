function HalfDay(props) {
  const { data } = props;

  return (
    <div className={(data.hasGoodWeather() ? 'highlighted' : null)}>
      <p>💦 {data.weather.precipitation.toFixed(2)} mm</p>
      <p>⛅️ {data.averageCloudcover().toFixed(2)} %</p>
      <p>🌬 {data.averageWindspeed().toFixed(2)} km/h</p>
      <hr />
    </div>
  );
}

export default HalfDay;
