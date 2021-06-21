import mockDateNow from '../test-utils/mock-date-now';
import mapTimestampToMonthsAgo from './map-timestamp-to-months-ago';

const ONE = 1;
const EIGHT = 8;
const TEST_DAY = 20;
const TEST_MONTH = 4;
const TEST_YEAR = 1990;
const THREE = 3;
const TWELVE = 12;
const TWO = 2;
const ZERO = 0;
const TEST_DATE: Date = new Date(TEST_YEAR, TEST_MONTH, TEST_DAY);
const TEST_TIMESTAMP: number = TEST_DATE.getTime();

describe('mapTimestampToMonthsAgo', (): void => {
  beforeEach((): void => {
    mockDateNow(TEST_TIMESTAMP);
  });

  it('should handle 0 months', (): void => {
    const oneDayAgo: Date = new Date(TEST_YEAR, TEST_MONTH, TEST_DAY - ONE);
    expect(mapTimestampToMonthsAgo(oneDayAgo.getTime())).toBe(ZERO);
  });

  it('should handle 1 month', (): void => {
    // Partial month
    const oneMonthAgoByDays: Date = new Date(TEST_YEAR, TEST_MONTH, -ONE);
    expect(mapTimestampToMonthsAgo(oneMonthAgoByDays.getTime())).toBe(ONE);

    // Full month
    const oneMonthAgoByMonths: Date = new Date(
      TEST_YEAR,
      TEST_MONTH - ONE,
      TEST_DAY,
    );
    expect(mapTimestampToMonthsAgo(oneMonthAgoByMonths.getTime())).toBe(ONE);
  });

  it('should handle 2+ months', (): void => {
    const twoMonthsAgo: Date = new Date(TEST_YEAR, TEST_MONTH - TWO, TEST_DAY);
    expect(mapTimestampToMonthsAgo(twoMonthsAgo.getTime())).toBe(TWO);

    const threeMonthsAgo: Date = new Date(
      TEST_YEAR,
      TEST_MONTH - THREE,
      TEST_DAY,
    );
    expect(mapTimestampToMonthsAgo(threeMonthsAgo.getTime())).toBe(THREE);

    const eightMonthsAgo: Date = new Date(
      TEST_YEAR,
      TEST_MONTH - EIGHT,
      TEST_DAY,
    );
    expect(mapTimestampToMonthsAgo(eightMonthsAgo.getTime())).toBe(EIGHT);
  });

  it('should handle 12 months', (): void => {
    const oneYearAgo: Date = new Date(TEST_YEAR - ONE, TEST_MONTH, TEST_DAY);
    expect(mapTimestampToMonthsAgo(oneYearAgo.getTime())).toBe(TWELVE);
  });
});
