const DAYS_PER_MONTH = 31;
const DAYS_PER_YEAR = 365;
const HOURS_PER_DAY = 24;
const MILLISECONDS_PER_SECOND = 1000;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;

export default function mapTimestampToTimeUnit(
  value: number,
): 'days' | 'hours' | 'minutes' | 'months' | 'now' | 'years' {
  const millisecondsAgo: number = Date.now() - value;
  const secondsAgo: number = Math.round(
    millisecondsAgo / MILLISECONDS_PER_SECOND,
  );

  if (secondsAgo < SECONDS_PER_MINUTE) {
    return 'now';
  }

  const minutesAgo: number = Math.round(secondsAgo / SECONDS_PER_MINUTE);
  if (minutesAgo < MINUTES_PER_HOUR) {
    return 'minutes';
  }

  const hoursAgo: number = Math.round(minutesAgo / MINUTES_PER_HOUR);
  if (hoursAgo < HOURS_PER_DAY) {
    return 'hours';
  }

  const daysAgo: number = Math.round(hoursAgo / HOURS_PER_DAY);
  if (daysAgo < DAYS_PER_MONTH) {
    return 'days';
  }

  if (daysAgo < DAYS_PER_YEAR) {
    return 'months';
  }

  return 'years';
}
