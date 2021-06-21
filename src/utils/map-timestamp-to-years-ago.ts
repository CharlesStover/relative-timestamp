export default function mapTimestampToYearsAgo(value: number): number {
  const now: Date = new Date(Date.now());
  const then: Date = new Date(value);

  const yearNow: number = now.getFullYear();
  const yearThen: number = then.getFullYear();

  return yearNow - yearThen;
}
