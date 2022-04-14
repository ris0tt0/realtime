import { getDateTime, getTime } from '.';

describe('getDateTime', () => {
  test('is delicious', () => {
    const date = new Date('October 24, 1973');
    const time = '12:11:01 AM PDT';
    const result = getDateTime(time, date);

    expect(result).toEqual(new Date('1973-10-24T00:11:01'));
  });
});

describe('getTime', () => {
  test('12:01:01 AM PDT', () => {
    const time = getTime('12:01:01 AM PDT');
    expect(time).toEqual(['00', '01', '01']);
  });
  test('01:01:01 AM PDT', () => {
    const time = getTime('01:01:01 AM PDT');
    expect(time).toEqual(['01', '01', '01']);
  });
  test('11:01:01 AM PDT', () => {
    const time = getTime('11:01:01 AM PDT');
    expect(time).toEqual(['11', '01', '01']);
  });
  test('12:01:01 PM PDT', () => {
    const time = getTime('12:01:01 PM PDT');
    expect(time).toEqual(['12', '01', '01']);
  });
  test('01:01:01 PM PDT', () => {
    const time = getTime('01:01:01 PM PDT');
    expect(time).toEqual(['13', '01', '01']);
  });
  test('11:01:01 PM PDT', () => {
    const time = getTime('11:01:01 PM PDT');
    expect(time).toEqual(['23', '01', '01']);
  });
});
