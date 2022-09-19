import HalfDay from "./HalfDay";

function Day(props) {
  const { date, morning, afternoon } = props;
  const formattedDate = date.locale('es').format('dddd, MMMM D YYYY');

  return (
    <div>
      <h2>{formattedDate}:</h2>
      <div>
        <h3>Mañana:</h3>
        <HalfDay data={morning} />
      </div>
      <div>
        <h3>Tarde:</h3>
        <HalfDay data={afternoon} />
      </div>
      <hr />
    </div>
  );
}

export default Day;
