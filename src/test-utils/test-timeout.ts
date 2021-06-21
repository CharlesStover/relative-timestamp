export default class TestTimeout implements NodeJS.Timeout {
  private readonly _n: number;

  public constructor(n: number) {
    this._n = n;
  }

  public hasRef(): boolean {
    return false;
  }

  public ref(): this {
    return this;
  }

  public refresh(): this {
    return this;
  }

  public unref(): this {
    return this;
  }

  public [Symbol.toPrimitive](): number {
    return this._n;
  }
}
