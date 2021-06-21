import type { ReactElement, ReactNode } from 'react';
import defaultChildren from '../../utils/default-children';
import useRelativeTimestamp from './relative-timestamp.hook';

interface Props {
  readonly children?: (
    unit: 'days' | 'hours' | 'minutes' | 'months' | 'now' | 'years',
    count: number,
  ) => ReactNode;
  readonly value: number;
}

export default function RelativeTimestamp({
  children = defaultChildren,
  value,
}: Props): ReactElement {
  const { count, dateTime, unit } = useRelativeTimestamp(value);

  return (
    <time dateTime={dateTime} title={dateTime}>
      {children(unit, count)}
    </time>
  );
}
