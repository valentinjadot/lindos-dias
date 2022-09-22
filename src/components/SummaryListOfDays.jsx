import 'dayjs/locale/es';

export default function SummaryListOfDays({ goodHalfDays }) {
  if (goodHalfDays.length > 3) {
    return '';
  }
  const formater = (e) => (
    `${e.date.locale('es').format('el dddd D')} en la ${e.type === 'morning' ? 'mañana' : 'tarde'}`
  );
  const formattedDates = goodHalfDays.map(formater);

  const buildHumanizedList = () => {
    const lastDate = formattedDates[formattedDates.length - 1];
    const allOtherDates = formattedDates.slice(0, formattedDates.length);
    return `${allOtherDates.join(', ')} y ${lastDate}`;
  };

  let sentence;
  if (formattedDates.length === 1) {
    [sentence] = formattedDates;
  } else {
    sentence = buildHumanizedList();
  }
  return `${sentence}.`;
}
