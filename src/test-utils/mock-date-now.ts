const DATE_NOW: () => number = Date.now;

afterEach((): void => {
  Date.now = DATE_NOW;
});

export default function mockDateNow(value: number): void {
  Date.now = (): number => value;
}
