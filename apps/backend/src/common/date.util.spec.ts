import { BadRequestException } from '@nestjs/common';
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz';
import {
  combineDateAndTime,
  eachDayInRange,
  nextWeekday,
  weekdayInTimeZone,
} from './date.util';

const TZ = 'Africa/Cairo';

describe('combineDateAndTime', () => {
  it('returns the instant whose clinic-local wall clock matches the given date and time', () => {
    const instant = combineDateAndTime('2026-06-18', '09:00', TZ);

    // Asserting the rendered wall-clock time avoids hard-coding the DST offset
    // (Cairo is +03:00 in June, +02:00 in winter).
    expect(formatInTimeZone(instant, TZ, 'yyyy-MM-dd HH:mm')).toBe(
      '2026-06-18 09:00',
    );
  });

  it('rejects a date that is not in YYYY-MM-DD format', () => {
    expect(() => combineDateAndTime('2026/06/18', '09:00', TZ)).toThrow(
      BadRequestException,
    );
  });

  it('rejects a time that is not in HH:mm format', () => {
    expect(() => combineDateAndTime('2026-06-18', '9:00', TZ)).toThrow(
      BadRequestException,
    );
  });

  it('rejects a well-formatted but impossible calendar date', () => {
    // Passes both regexes but resolves to an invalid instant.
    expect(() => combineDateAndTime('2026-13-01', '09:00', TZ)).toThrow(
      BadRequestException,
    );
  });
});

describe('eachDayInRange', () => {
  it('returns an empty list when the range is reversed', () => {
    const start = fromZonedTime('2026-06-17T00:00:00', TZ);
    const end = fromZonedTime('2026-06-15T00:00:00', TZ);

    expect(eachDayInRange(start, end, TZ)).toEqual([]);
  });

  it('returns one inclusive clinic-midnight instant per day across the range', () => {
    const start = fromZonedTime('2026-06-15T00:00:00', TZ);
    const end = fromZonedTime('2026-06-17T00:00:00', TZ);

    const days = eachDayInRange(start, end, TZ);

    expect(days.map((d) => formatInTimeZone(d, TZ, 'yyyy-MM-dd'))).toEqual([
      '2026-06-15',
      '2026-06-16',
      '2026-06-17',
    ]);
    // Every entry must land exactly on clinic midnight, not bleed across the boundary.
    days.forEach((d) =>
      expect(formatInTimeZone(d, TZ, 'HH:mm')).toBe('00:00'),
    );
  });
});

describe('weekdayInTimeZone', () => {
  // Sun=0 .. Sat=6, evaluated in Africa/Cairo.
  test.each([
    ['2026-06-21', 0], // Sunday
    ['2026-06-18', 4], // Thursday
    ['2026-06-20', 6], // Saturday
  ])('%s maps to weekday %i', (date, expected) => {
    const instant = fromZonedTime(`${date}T00:00:00`, TZ);
    expect(weekdayInTimeZone(instant, TZ)).toBe(expected);
  });
});

describe('nextWeekday', () => {
  // From Thursday 2026-06-18, the next Sunday is 2026-06-21.
  const from = fromZonedTime('2026-06-18T00:00:00', TZ);

  test.each([
    [0, '2026-06-21'],
    [1, '2026-06-28'],
  ])('week offset %i resolves to %s', (offset, expected) => {
    const result = nextWeekday(from, 0, offset, TZ);
    expect(formatInTimeZone(result, TZ, 'yyyy-MM-dd')).toBe(expected);
  });
});
