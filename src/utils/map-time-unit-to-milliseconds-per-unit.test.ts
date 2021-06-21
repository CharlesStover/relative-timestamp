import mapTimeUnitToMillisecondsPerUnit from './map-time-unit-to-milliseconds-per-unit';

const MILLISECONDS_PER_DAY = 86400000;
const MILLISECONDS_PER_HOUR = 3600000;
const MILLISECONDS_PER_MINUTE = 60000;

describe('mapTimeUnitToMillisecondsPerUnit', (): void => {
  it('should support days', (): void => {
    expect(mapTimeUnitToMillisecondsPerUnit('days')).toBe(MILLISECONDS_PER_DAY);
  });

  it('should support hours', (): void => {
    expect(mapTimeUnitToMillisecondsPerUnit('hours')).toBe(
      MILLISECONDS_PER_HOUR,
    );
  });

  it('should support minutes', (): void => {
    expect(mapTimeUnitToMillisecondsPerUnit('minutes')).toBe(
      MILLISECONDS_PER_MINUTE,
    );
  });

  it('should support now', (): void => {
    expect(mapTimeUnitToMillisecondsPerUnit('now')).toBe(
      MILLISECONDS_PER_MINUTE,
    );
  });
});
