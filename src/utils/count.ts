import mapTimestampToMonthsAgo from '../utils/map-timestamp-to-months-ago';
import mapTimestampToYearsAgo from '../utils/map-timestamp-to-years-ago';

const HOURS_PER_DAY = 24;
const MILLISECONDS_PER_SECOND = 1000;
const MINUTES_PER_HOUR = 60;
const ONE = 1;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_MINUTE: number =
  MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
const MILLISECONDS_PER_HOUR: number =
  MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
const MILLISECONDS_PER_DAY: number = MILLISECONDS_PER_HOUR * HOURS_PER_DAY;

export default class Count {
  private readonly _value: number;

  public constructor(value: number) {
    this._value = value;
  }

  public count(
    unit: 'days' | 'hours' | 'minutes' | 'months' | 'now' | 'years',
  ): number {
    if (unit === 'now') {
      return ONE;
    }

    switch (unit) {
      case 'days':
        return this._getUnitsAgo(MILLISECONDS_PER_DAY);
      case 'hours':
        return this._getUnitsAgo(MILLISECONDS_PER_HOUR);
      case 'minutes':
        return this._getUnitsAgo(MILLISECONDS_PER_MINUTE);
      case 'months':
        return mapTimestampToMonthsAgo(this._value);
      case 'years':
        return mapTimestampToYearsAgo(this._value);
    }
  }

  private _getUnitsAgo(millisecondsPerUnit: number): number {
    return Math.round((Date.now() - this._value) / millisecondsPerUnit);
  }
}
