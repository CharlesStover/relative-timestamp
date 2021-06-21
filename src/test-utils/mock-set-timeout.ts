import type { MutableRefObject } from 'react';

const mockSetTimeout: MutableRefObject<
  jest.SpyInstance<
    NodeJS.Timeout,
    [
      callback: (...args: readonly unknown[]) => void,
      ms?: number,
      ...args: readonly unknown[]
    ]
  >
> = {
  current: jest.fn(),
};

beforeEach((): void => {
  mockSetTimeout.current = jest.spyOn(window, 'setTimeout');
});

export default mockSetTimeout;
