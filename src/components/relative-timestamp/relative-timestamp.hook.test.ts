import { act, renderHook } from '@testing-library/react-hooks';
import mockDateNow from '../../test-utils/mock-date-now';
import mockSetInterval from '../../test-utils/mock-set-interval';
import mockSetTimeout from '../../test-utils/mock-set-timeout';
import TestTimeout from '../../test-utils/test-timeout';
import useRelativeTimestamp from './relative-timestamp.hook';

const FIRST_ARGUMENT = 0;
const FIRST_CALL = 0;
const MILLISECONDS_PER_DAY = 86400000;
const MILLISECONDS_PER_HOUR = 3600000;
const MILLISECONDS_PER_MINUTE = 60000;
const MILLISECONDS_PER_SECOND = 1000;
const MILLISECONDS_PER_YEAR = 31536000000;
const ONCE = 1;
const TEST_INTERVAL_NUMBER = 1234;
const TEST_TIMEOUT_NUMBER = 5678;
const TEST_INTERVAL: NodeJS.Timeout = new TestTimeout(TEST_INTERVAL_NUMBER);
const TEST_TIMEOUT: NodeJS.Timeout = new TestTimeout(TEST_TIMEOUT_NUMBER);

describe('useRelativeTimestamp', (): void => {
  let mockClearInterval: jest.SpyInstance<void, [NodeJS.Timeout]> = jest.fn();
  let mockClearTimeout: jest.SpyInstance<void, [NodeJS.Timeout]> = jest.fn();
  beforeEach((): void => {
    mockClearInterval = jest.spyOn(window, 'clearInterval');
    mockClearTimeout = jest.spyOn(window, 'clearTimeout');
    mockSetInterval.current.mockReturnValue(TEST_INTERVAL);
    mockSetTimeout.current.mockReturnValue(TEST_TIMEOUT);
  });

  describe('dateTime', (): void => {
    it('should be a locale string', (): void => {
      const TEST_TIME = 123456789000;
      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: TEST_TIME,
      });
      expect(result.current.dateTime).toBe(
        new Date(TEST_TIME).toLocaleString(),
      );
    });
  });

  describe('unit', (): void => {
    const TEST_NOW = 1234567890;

    it('should support now', (): void => {
      const TEN_SECONDS = 10000;
      mockDateNow(TEST_NOW);

      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: TEST_NOW - TEN_SECONDS,
      });
      expect(result.current.unit).toBe('now');
    });

    it('should support minutes', (): void => {
      const TEN_MINUTES = 600000;
      mockDateNow(TEST_NOW);

      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: TEST_NOW - TEN_MINUTES,
      });
      expect(result.current.unit).toBe('minutes');
    });

    it('should support hours', (): void => {
      const TEN_HOURS = 36000000;
      mockDateNow(TEST_NOW);

      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: TEST_NOW - TEN_HOURS,
      });
      expect(result.current.unit).toBe('hours');
    });

    it('should support days', (): void => {
      const FIVE_DAYS = 432000000;
      mockDateNow(TEST_NOW);

      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: TEST_NOW - FIVE_DAYS,
      });
      expect(result.current.unit).toBe('days');
    });

    it('should support months', (): void => {
      const TEN_MONTHS = 25920000000;
      mockDateNow(TEST_NOW);

      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: TEST_NOW - TEN_MONTHS,
      });
      expect(result.current.unit).toBe('months');
    });

    it('should support years', (): void => {
      const TEN_YEARS = 315360000000;
      mockDateNow(TEST_NOW);

      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: TEST_NOW - TEN_YEARS,
      });
      expect(result.current.unit).toBe('years');
    });
  });

  describe('effects', (): void => {
    it('should set, given a value less than 1 minute', (): void => {
      const FIFTY_SECONDS = 50000;
      const TEN_SECONDS = 10000;
      mockDateNow(FIFTY_SECONDS);
      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: 0,
      });

      expect(mockSetTimeout.current).toHaveBeenCalledTimes(ONCE);
      expect(mockSetTimeout.current).toHaveBeenLastCalledWith(
        expect.any(Function),
        TEN_SECONDS,
      );
      expect(result.current.asyncIntervalEffect.current).toBeUndefined();
      expect(result.current.asyncTimeoutEffect.current).toBe(TEST_TIMEOUT);

      act((): void => {
        mockSetTimeout.current.mock.calls[FIRST_CALL][FIRST_ARGUMENT]();
      });

      expect(result.current.asyncIntervalEffect.current).toBe(TEST_INTERVAL);
    });

    it('should set, given a value of multiple minutes ago', (): void => {
      const FIVE_MILLISECONDS = 5;
      const ONE_MINUTE = 60000;
      const THIRTY_MINUTES = 1800000;
      const TWENTY_FIVE_SECONDS = 25000;
      mockDateNow(THIRTY_MINUTES + TWENTY_FIVE_SECONDS + FIVE_MILLISECONDS);

      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: 0,
      });

      expect(mockSetTimeout.current).toHaveBeenCalledTimes(ONCE);
      expect(mockSetTimeout.current).toHaveBeenLastCalledWith(
        expect.any(Function),
        ONE_MINUTE - TWENTY_FIVE_SECONDS - FIVE_MILLISECONDS,
      );
      expect(result.current.asyncIntervalEffect.current).toBeUndefined();
      expect(result.current.asyncTimeoutEffect.current).toBe(TEST_TIMEOUT);

      act((): void => {
        mockSetTimeout.current.mock.calls[FIRST_CALL][FIRST_ARGUMENT]();
      });

      expect(result.current.asyncIntervalEffect.current).toBe(TEST_INTERVAL);
    });

    it('should set, given a value of 59 minutes ago', (): void => {
      const FIFTY_NINE_MINUTES = 3540000;
      mockDateNow(FIFTY_NINE_MINUTES + MILLISECONDS_PER_SECOND);

      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: 0,
      });

      expect(mockSetTimeout.current).toHaveBeenCalledTimes(ONCE);
      expect(mockSetTimeout.current).toHaveBeenLastCalledWith(
        expect.any(Function),
        MILLISECONDS_PER_MINUTE - MILLISECONDS_PER_SECOND,
      );
      expect(result.current.asyncIntervalEffect.current).toBeUndefined();
      expect(result.current.asyncTimeoutEffect.current).toBe(TEST_TIMEOUT);

      act((): void => {
        mockSetTimeout.current.mock.calls[FIRST_CALL][FIRST_ARGUMENT]();
      });

      expect(result.current.asyncIntervalEffect.current).toBe(TEST_INTERVAL);
    });

    it('should set, given a value of 1 hour ago', (): void => {
      mockDateNow(MILLISECONDS_PER_HOUR);

      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: 0,
      });

      expect(mockSetTimeout.current).toHaveBeenCalledTimes(ONCE);
      expect(mockSetTimeout.current).toHaveBeenLastCalledWith(
        expect.any(Function),
        MILLISECONDS_PER_HOUR,
      );
      expect(result.current.asyncIntervalEffect.current).toBeUndefined();
      expect(result.current.asyncTimeoutEffect.current).toBe(TEST_TIMEOUT);

      act((): void => {
        mockSetTimeout.current.mock.calls[FIRST_CALL][FIRST_ARGUMENT]();
      });

      expect(result.current.asyncIntervalEffect.current).toBe(TEST_INTERVAL);
    });

    it('should set, given a value of multiple hours ago', (): void => {
      const FIVE_MILLISECONDS = 5;
      const THIRTY_MINUTES = 1800000;
      const TWELVE_HOURS = 43200000;
      const TWENTY_FIVE_SECONDS = 25000;
      mockDateNow(
        TWELVE_HOURS + THIRTY_MINUTES + TWENTY_FIVE_SECONDS + FIVE_MILLISECONDS,
      );

      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: 0,
      });

      expect(mockSetTimeout.current).toHaveBeenCalledTimes(ONCE);
      expect(mockSetTimeout.current).toHaveBeenLastCalledWith(
        expect.any(Function),
        MILLISECONDS_PER_HOUR -
          THIRTY_MINUTES -
          TWENTY_FIVE_SECONDS -
          FIVE_MILLISECONDS,
      );
      expect(result.current.asyncIntervalEffect.current).toBeUndefined();
      expect(result.current.asyncTimeoutEffect.current).toBe(TEST_TIMEOUT);

      act((): void => {
        mockSetTimeout.current.mock.calls[FIRST_CALL][FIRST_ARGUMENT]();
      });

      expect(result.current.asyncIntervalEffect.current).toBe(TEST_INTERVAL);
    });

    it('should set, given a value of days ago', (): void => {
      mockDateNow(MILLISECONDS_PER_DAY);

      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: 0,
      });

      expect(mockSetTimeout.current).toHaveBeenCalledTimes(ONCE);
      expect(mockSetTimeout.current).toHaveBeenLastCalledWith(
        expect.any(Function),
        MILLISECONDS_PER_DAY,
      );
      expect(result.current.asyncIntervalEffect.current).toBeUndefined();
      expect(result.current.asyncTimeoutEffect.current).toBe(TEST_TIMEOUT);

      act((): void => {
        mockSetTimeout.current.mock.calls[FIRST_CALL][FIRST_ARGUMENT]();
      });

      expect(result.current.asyncIntervalEffect.current).toBe(TEST_INTERVAL);
    });

    it('should cancel the timeout on unmount', (): void => {
      const TEST_NOW = 1234567890;
      mockDateNow(TEST_NOW);

      const { unmount } = renderHook(useRelativeTimestamp, {
        initialProps: TEST_NOW,
      });

      expect(mockClearInterval).not.toHaveBeenCalled();
      expect(mockClearTimeout).not.toHaveBeenCalled();
      expect(mockSetTimeout.current).toHaveBeenCalledTimes(ONCE);

      unmount();

      expect(mockClearInterval).not.toHaveBeenCalled();
      expect(mockClearTimeout).toHaveBeenCalledTimes(ONCE);
      expect(mockClearTimeout).toHaveBeenLastCalledWith(TEST_TIMEOUT);
    });

    it('should cancel the interval on unmount', (): void => {
      const TEST_NOW = 1234567890;
      mockDateNow(TEST_NOW);

      const { unmount } = renderHook(useRelativeTimestamp, {
        initialProps: TEST_NOW,
      });

      expect(mockClearInterval).not.toHaveBeenCalled();
      expect(mockClearTimeout).not.toHaveBeenCalled();
      expect(mockSetTimeout.current).toHaveBeenCalledTimes(ONCE);

      act((): void => {
        mockSetTimeout.current.mock.calls[FIRST_CALL][FIRST_ARGUMENT]();
      });

      expect(mockClearInterval).not.toHaveBeenCalled();
      expect(mockClearTimeout).not.toHaveBeenCalled();

      unmount();

      expect(mockClearInterval).toHaveBeenCalledTimes(ONCE);
      expect(mockClearInterval).toHaveBeenLastCalledWith(TEST_INTERVAL);
      expect(mockClearTimeout).toHaveBeenCalledTimes(ONCE);
      expect(mockClearTimeout).toHaveBeenLastCalledWith(TEST_TIMEOUT);
    });

    it('should not set, given a value of 1+ months', (): void => {
      const THIRTY_ONE_DAYS = 2678400000;
      mockDateNow(THIRTY_ONE_DAYS);

      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: 0,
      });

      expect(mockSetInterval.current).not.toHaveBeenCalled();
      expect(mockSetTimeout.current).not.toHaveBeenCalled();
      expect(result.current.asyncIntervalEffect.current).toBeUndefined();
      expect(result.current.asyncTimeoutEffect.current).toBeUndefined();
    });

    it('should not set, given a value of 1+ years', (): void => {
      mockDateNow(MILLISECONDS_PER_YEAR);

      const { result } = renderHook(useRelativeTimestamp, {
        initialProps: 0,
      });

      expect(mockSetInterval.current).not.toHaveBeenCalled();
      expect(mockSetTimeout.current).not.toHaveBeenCalled();
      expect(result.current.asyncIntervalEffect.current).toBeUndefined();
      expect(result.current.asyncTimeoutEffect.current).toBeUndefined();
    });
  });
});
