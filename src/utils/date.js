export const getTimeFromBartResponse = (timestring = '', date = null) => {
  if (!(date instanceof Date)) {
    date = new Date();
  }
  try {
    const isPM = timestring.toLowerCase().includes('pm');
    const result = timestring.match(/\d?\d/g);

    const hours = isPM
      ? result[0] === '12'
        ? '12'
        : parseInt(result[0], 10) + 12
      : result[0] === '12'
      ? '0'
      : result[0];

    date.setHours(hours, result[1]);
    if (result[2]) {
      date.setSeconds(result[2]);
    }
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

export const getFormattedTime = (date = null) => {
  if (date instanceof Date) {
    return date.toLocaleTimeString('en-US').toLowerCase();
  }
  return null;
};
export const getFormattedTimeDifference = (date1, date2) => {
  if (date1 && date2) {
    const ms = date2.getTime() - date1.getTime();

    return ms / 1000 / 60;
  }
  return null;
};
