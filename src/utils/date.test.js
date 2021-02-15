import { getFormattedTime, getTimeFromBartResponse } from './date';

describe('getTimeFromBartResponse', () => {
  it('returns null with no parameters', () => {
    const date = getTimeFromBartResponse();
    expect(date instanceof Date).toBeTruthy();
  });
  it('returns 12:42:46 pm', () => {
    const date = getTimeFromBartResponse('12:41:46 PM PST');
    expect(date.getHours()).toEqual(12);
    expect(date.getMinutes()).toEqual(41);
    expect(date.getSeconds()).toEqual(46);
  });
  it('returns 12:41:46 AM', () => {
    const date = getTimeFromBartResponse('12:41:46 AM  PST');
    expect(date.getHours()).toEqual(0);
    expect(date.getMinutes()).toEqual(41);
    expect(date.getSeconds()).toEqual(46);
  });
  it('returns 02:41:46 PM', () => {
    const date = getTimeFromBartResponse('02:41:46 PM PST');
    expect(date.getHours()).toEqual(14);
    expect(date.getMinutes()).toEqual(41);
    expect(date.getSeconds()).toEqual(46);
  });
  it('returns 03:41:46 AM', () => {
    const date = getTimeFromBartResponse('03:41:46 AM PST');
    expect(date.getHours()).toEqual(3);
    expect(date.getMinutes()).toEqual(41);
    expect(date.getSeconds()).toEqual(46);
  });
});

describe('getFormattedTime', () => {
  it('returns null with no parameters', () => {
    expect(getFormattedTime()).toBeNull();
  });
  it('returns 9:09:09 for am', () => {
    expect(getFormattedTime(new Date('October 24, 1973 09:09:09'))).toBe(
      '9:09:09'
    );
  });
  it('returns 10:10:10 for am', () => {
    expect(getFormattedTime(new Date('October 24, 1973 10:10:10'))).toBe(
      '10:10:10'
    );
  });
  it('returns 11:11:11 for am', () => {
    expect(getFormattedTime(new Date('October 24, 1973 11:11:11'))).toBe(
      '11:11:11'
    );
  });
  it('returns 12:12:12 for pm', () => {
    expect(getFormattedTime(new Date('October 24, 1973 12:12:12'))).toBe(
      '12:12:12'
    );
  });
  it('returns 1:13:13 for pm', () => {
    expect(getFormattedTime(new Date('October 24, 1973 13:13:13'))).toBe(
      '1:13:13'
    );
  });

  it('returns 9:09:09 for pm', () => {
    expect(getFormattedTime(new Date('October 24, 1973 21:09:09'))).toBe(
      '9:09:09'
    );
  });
  it('returns 10:10:10 for pm', () => {
    expect(getFormattedTime(new Date('October 24, 1973 22:10:10'))).toBe(
      '10:10:10'
    );
  });
  it('returns 11:11:11 for pm', () => {
    expect(getFormattedTime(new Date('October 24, 1973 23:11:11'))).toBe(
      '11:11:11'
    );
  });
  it('returns 12:01 for am', () => {
    expect(getFormattedTime(new Date('October 24, 1973 00:01:00'))).toBe(
      '12:01'
    );
  });
  it('returns 1:13:13 for am', () => {
    expect(getFormattedTime(new Date('October 24, 1973 01:13:13'))).toBe(
      '1:13:13'
    );
  });
});
