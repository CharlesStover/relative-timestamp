import type { MutableRefObject } from 'react';

const mockSetInterval: MutableRefObject<
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
  mockSetInterval.current = jest.spyOn(window, 'setInterval');
});

export default mockSetInterval;
