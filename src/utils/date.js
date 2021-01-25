export const getTimeFromBartResponse = (timestring = '', date = null) => {
  if (!(date instanceof Date)) {
    date = new Date();
  }
  try {
    const isPM = timestring.toLowerCase().includes('pm');
    const result = timestring.match(/\d\d/g);

    const hours = isPM
      ? result[0] === '12'
        ? '12'
        : parseInt(result[0], 10) + 12
      : result[0] === '12'
      ? '0'
      : result[0];

    date.setHours(hours, result[1], result[2]);
  } catch (e) {}
  return date;
};
export const getDateTenDaysPast = (date = new Date()) => {
  const tenDaysMS = 10 * 24 * 60 * 60 * 1000;
  return new Date(date.getTime() - tenDaysMS);
};
export const getDateEightWeeksHence = (date = new Date()) => {
  const eightWeeksMS = 8 * 7 * 24 * 60 * 60 * 1000;
  return new Date(date.getTime() + eightWeeksMS);
};
