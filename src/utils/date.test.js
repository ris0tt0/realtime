import { getTimeFromBartResponse } from './date';

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
