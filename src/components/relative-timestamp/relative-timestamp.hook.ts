import type { MutableRefObject } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import useForceUpdate from 'use-force-update';
import Count from '../../utils/count';
import mapTimeUnitToMillisecondsPerUnit from '../../utils/map-time-unit-to-milliseconds-per-unit';
import mapTimestampToTimeUnit from '../../utils/map-timestamp-to-time-unit';

interface State {
  asyncIntervalEffect: MutableRefObject<number | undefined>;
  asyncTimeoutEffect: MutableRefObject<number | undefined>;
  count: number;
  dateTime: string;
  unit: 'days' | 'hours' | 'minutes' | 'months' | 'now' | 'years';
}

export default function useRelativeTimestamp(value: number): State {
  const unit: 'days' | 'hours' | 'minutes' | 'months' | 'now' | 'years' =
    mapTimestampToTimeUnit(value);

  // States
  const forceUpdate: VoidFunction = useForceUpdate();

  const asyncIntervalEffect: MutableRefObject<number | undefined> =
    useRef<number>();
  const asyncTimeoutEffect: MutableRefObject<number | undefined> =
    useRef<number>();

  // Effects
  useEffect((): VoidFunction | undefined => {
    // Do not re-render for units longer than a typical browser session.
    if (unit === 'months' || unit === 'years') {
      return;
    }

    // We call Date.now() within the effect instead of using `now` as part of
    //   the dependency array, because we do not want to clear the interval when
    //   `now` changes (which would be every render).
    const millisecondsAgo: number = Date.now() - value;
    const millisecondsPerUnit: number = mapTimeUnitToMillisecondsPerUnit(unit);

    asyncTimeoutEffect.current = window.setTimeout((): void => {
      asyncIntervalEffect.current = window.setInterval(
        forceUpdate,
        millisecondsPerUnit,
      );
      forceUpdate();
    }, millisecondsPerUnit - (millisecondsAgo % millisecondsPerUnit));

    return (): void => {
      window.clearTimeout(asyncTimeoutEffect.current);
      if (typeof asyncIntervalEffect.current !== 'undefined') {
        window.clearInterval(asyncIntervalEffect.current);
      }
    };
  }, [forceUpdate, unit, value]);

  return {
    asyncIntervalEffect,
    asyncTimeoutEffect,
    dateTime: useMemo((): string => new Date(value).toLocaleString(), [value]),
    unit,

    // Since Count relies on the current timestamp, it needs to be recalculated
    //   every render instead of memoized.
    count: new Count(value).count(unit),
  };
}
