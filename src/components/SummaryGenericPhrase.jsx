import 'dayjs/locale/es';

export default function SummaryGenericPhrase({ goodHalfDays }) {
  const count = goodHalfDays.length;
  if (count === 0) {
    return 'Pucha, parce que se vienen días malitos 😔';
  }
  if (count > 3) {
    return (
      'Se vienen varios días muy buenos! 🍾'
    );
  }

  const counWord = () => {
    if (count === 1) return 'un';
    if (count === 2) return 'dos';
    if (count === 3) return 'tres';
    return '';
  };

  const maybePluralize = count > 1 ? 's' : '';

  return (
    `Hay ${counWord()} momento${maybePluralize}
      muy bueno${maybePluralize}: `
  );
}
