export const generateId = () =>
  `item-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const getDefaultInstruction = (category) => {
  const map = {
    верх: 'Сложите пополам вдоль, затем ещё раз пополам',
    низ: 'Сложите по швам, избегая заломов',
    платье: 'Повесьте на плечики или сложите втрое',
    бельё: 'Аккуратно сверните в рулон',
    обувь: 'Используйте формодержатели, храните в коробках',
    аксессуары: 'Разложите по органайзерам по типу',
    другое: 'Сложите аккуратно по швам',
  };
  return map[category] || map['другое'];
};

export const getDefaultWashing = (category) => {
  const map = {
    верх: '30°C, деликатный режим. Сушить в расправленном виде.',
    низ: '40°C, можно отжим. Сушить на верёвке.',
    платье: 'Химчистка или 30°C без отжима.',
    бельё: '30°C, без кондиционера. Сушить горизонтально.',
    обувь: 'Чистить влажной тканью. Не стирать в машине.',
    аксессуары: 'Протирать сухой тканью. Избегать влаги.',
    другое: 'Следуйте инструкции на ярлычке.',
  };
  return map[category] || map['другое'];
};

export const isDue = (reminderDate) => {
  if (!reminderDate) return false;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(reminderDate);
  due.setHours(0, 0, 0, 0);
  return due <= now;
};
