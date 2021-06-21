import mockDateNow from '../test-utils/mock-date-now';
import mapTimestampToYearsAgo from './map-timestamp-to-years-ago';

const ONE = 1;
const TEST_MONTH = 4;
const TEST_YEAR = 1990;
const TEN = 10;
const TWO = 2;
const ZERO = 0;
const TEST_DATE: Date = new Date(TEST_YEAR, TEST_MONTH);
const TEST_TIMESTAMP: number = TEST_DATE.getTime();

describe('mapTimestampToYearsAgo', (): void => {
  beforeEach((): void => {
    mockDateNow(TEST_TIMESTAMP);
  });

  it('should handle 0 years', (): void => {
    const oneMonthAgo: Date = new Date(TEST_YEAR, TEST_MONTH - ONE);
    expect(mapTimestampToYearsAgo(oneMonthAgo.getTime())).toBe(ZERO);
  });

  it('should handle 1 year', (): void => {
    const oneYearAgo: Date = new Date(TEST_YEAR - ONE, TEST_MONTH);
    expect(mapTimestampToYearsAgo(oneYearAgo.getTime())).toBe(ONE);
  });

  it('should handle 2+ years', (): void => {
    const twoYearsAgo: Date = new Date(TEST_YEAR - TWO, TEST_MONTH - ONE);
    expect(mapTimestampToYearsAgo(twoYearsAgo.getTime())).toBe(TWO);

    const tenYearsAgo: Date = new Date(TEST_YEAR - TEN, TEST_MONTH + ONE);
    expect(mapTimestampToYearsAgo(tenYearsAgo.getTime())).toBe(TEN);
  });
});
