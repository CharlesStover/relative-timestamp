import { render } from '@testing-library/react';
import mockDateNow from '../../test-utils/mock-date-now';
import RelativeTimestamp from '../..';

describe('RelativeTimestamp', (): void => {
  it('should support now', (): void => {
    const THIRTY_SECONDS = 30000;
    mockDateNow(THIRTY_SECONDS);
    const { getByText } = render(<RelativeTimestamp value={0} />);
    getByText('Now');
  });

  it('should support minutes', (): void => {
    const TWO_MINUTES = 120000;
    mockDateNow(TWO_MINUTES);
    const { getByText } = render(<RelativeTimestamp value={0} />);
    getByText('2 minutes ago');
  });

  it('should support hours', (): void => {
    const FOUR_HOURS = 14400000;
    mockDateNow(FOUR_HOURS);
    const { getByText } = render(<RelativeTimestamp value={0} />);
    getByText('4 hours ago');
  });

  it('should support days', (): void => {
    const FIFTEEN_DAYS = 1296000000;
    mockDateNow(FIFTEEN_DAYS);
    const { getByText } = render(<RelativeTimestamp value={0} />);
    getByText('15 days ago');
  });

  it('should support months', (): void => {
    const THREE_MONTHS = 7776000000;
    mockDateNow(THREE_MONTHS);
    const { getByText } = render(<RelativeTimestamp value={0} />);
    getByText('3 months ago');
  });

  it('should support years', (): void => {
    const TWO_YEARS = 63072000000;
    mockDateNow(TWO_YEARS);
    const { getByText } = render(<RelativeTimestamp value={0} />);
    getByText('2 years ago');
  });

  it('should support custom text', (): void => {
    const TEST_TRANSLATION = 'test translation';
    const { getByText } = render(
      <RelativeTimestamp value={0}>
        {(): string => TEST_TRANSLATION}
      </RelativeTimestamp>,
    );
    getByText(TEST_TRANSLATION);
  });
});
