export const getTime = (time) => {
  const isPM = time.includes('PM');
  // pacific daylight
  const isPDT = time.includes('PDT');
  // the time.
  const times = [...time.matchAll(/\d\d/g)];
  let hour = times[0][0];
  if (isPM) {
    if (hour !== '12') {
      hour = `${parseInt(hour, 10) + 12}`;
    }
  } else {
    if (hour === '12') {
      hour = '00';
    }
  }
  return [hour, times[1][0], times[2][0]];
};

export const getDateTime = (time, date) => {
  const t = getTime(time);
  let retVal;
  if (!date) {
    retVal = new Date();
    retVal.setHours(t[0], t[1], t[2]);
    return retVal;
  }
  retVal = new Date(date);
  retVal.setHours(t[0], t[1], t[2]);
  return retVal;
};
