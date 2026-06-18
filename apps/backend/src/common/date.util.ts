import { fromZonedTime, toZonedTime } from "date-fns-tz"
import { BadRequestException } from "@nestjs/common";
import { getDay, addDays, isValid } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

export function combineDateAndTime(date: string, time: string, timezone: string) {
    // Date Check for format YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new BadRequestException('Invalid date, expected YYYY-MM-DD');
    // Time Check for format HH:mm
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new BadRequestException('Invalid time, expected HH:mm');

    const instant = fromZonedTime(`${date}T${time}:00`, timezone);
    if (!isValid(instant)) {
        throw new BadRequestException('Invalid date/time combination');
    }

    return instant;
}

export function eachDayInRange(start: Date, end: Date, timezone: string): Date[] {
    if (start > end) return [];

    const days: Date[] = [];

    let cursor = formatInTimeZone(start, timezone, "yyyy-MM-dd");
    const last = formatInTimeZone(end, timezone, "yyyy-MM-dd");

    while (cursor <= last) {
        days.push(fromZonedTime(`${cursor}T00:00:00`, timezone));

        const next = new Date(`${cursor}T00:00:00Z`);
        next.setUTCDate(next.getUTCDate() + 1);
        cursor = next.toISOString().slice(0, 10);
    }

    return days;
}

enum Weekday {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
}
// This means for example if today is 25 May what is the date of the next Thursday?
export function nextWeekday(date: Date, weekday: Weekday, weekOffset: number = 0, timezone: string) {
    const zoned = toZonedTime(date, timezone);
    const currentDay = getDay(zoned);
    let daysUntilNext = (weekday - currentDay + 7) % 7;
    daysUntilNext += (weekOffset * 7);

    return addDays(zoned, daysUntilNext);
}

// Day-of-week 0-6 (Sun-Sat) computed in the clinic timezone, matching getDay() semantics.
// date-fns 'i' is the ISO day of week (1=Mon..7=Sun); % 7 maps Sun(7)->0.
export function weekdayInTimeZone(date: Date, timezone: string): number {
    return Number(formatInTimeZone(date, timezone, 'i')) % 7;
}

// Returns the next Sunday's clinic-midnight instant strictly after the given date.
export function startOfNextWeekSunday(date: Date, timezone: string): Date {
    const currentDay = weekdayInTimeZone(date, timezone);
    const daysUntilNextSunday = (Weekday.SUNDAY - currentDay + 7) % 7 || 7;

    const baseDate = new Date(`${formatInTimeZone(date, timezone, "yyyy-MM-dd")}T00:00:00Z`);
    baseDate.setUTCDate(baseDate.getUTCDate() + daysUntilNextSunday);
    const dayDate = baseDate.toISOString().slice(0, 10);

    return fromZonedTime(`${dayDate}T00:00:00`, timezone);
}