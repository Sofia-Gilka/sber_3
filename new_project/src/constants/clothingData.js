export const ASSISTANT_IGNORED_WORDS = [
  'добавить',
  'добавь',
  'положи',
  'запиши',
  'закинь',
  'напомнить',
  'удалить',
  'удали',
  'убери',
  'выполни',
  'выполнил',
  'сложил',
  'сделал',
  'готово',
  'вещь',
  'одежду',
  'гардероб',
  'как',
  'стирать',
  'складывать',
];

export const CLOTHING_CATEGORIES = [
  'верх',
  'низ',
  'платье',
  'бельё',
  'обувь',
  'аксессуары',
  'другое',
];

export const CATEGORY_OPTIONS = CLOTHING_CATEGORIES.map((cat) => ({
  value: cat,
  label: cat.charAt(0).toUpperCase() + cat.slice(1),
}));
