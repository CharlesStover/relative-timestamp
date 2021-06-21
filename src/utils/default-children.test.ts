import defaultChildren from './default-children';

const ONE = 1;
const TWELVE = 12;

describe('defaultChildren', (): void => {
  it('should support now', (): void => {
    expect(defaultChildren('now', ONE)).toBe('Now');
  });

  it('should support minutes', (): void => {
    expect(defaultChildren('minutes', ONE)).toBe('1 minute ago');
    expect(defaultChildren('minutes', TWELVE)).toBe('12 minutes ago');
  });

  it('should support hours', (): void => {
    expect(defaultChildren('hours', ONE)).toBe('1 hour ago');
    expect(defaultChildren('hours', TWELVE)).toBe('12 hours ago');
  });

  it('should support days', (): void => {
    expect(defaultChildren('days', ONE)).toBe('1 day ago');
    expect(defaultChildren('days', TWELVE)).toBe('12 days ago');
  });

  it('should support months', (): void => {
    expect(defaultChildren('months', ONE)).toBe('1 month ago');
    expect(defaultChildren('months', TWELVE)).toBe('12 months ago');
  });

  it('should support years', (): void => {
    expect(defaultChildren('years', ONE)).toBe('1 year ago');
    expect(defaultChildren('years', TWELVE)).toBe('12 years ago');
  });
});
