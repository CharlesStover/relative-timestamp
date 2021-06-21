const HOURS_PER_DAY = 24;
const MILLISECONDS_PER_SECOND = 1000;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_MINUTE: number =
  MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
const MILLISECONDS_PER_HOUR: number =
  MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
const MILLISECONDS_PER_DAY: number = MILLISECONDS_PER_HOUR * HOURS_PER_DAY;

export default function mapTimeUnitToMillisecondsPerUnit(
  unit: 'days' | 'hours' | 'minutes' | 'now',
): number {
  switch (unit) {
    case 'days':
      return MILLISECONDS_PER_DAY;
    case 'minutes':
    case 'now':
      return MILLISECONDS_PER_MINUTE;
    case 'hours':
      return MILLISECONDS_PER_HOUR;
  }
}
