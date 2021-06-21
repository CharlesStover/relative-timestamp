const MONTHS_PER_YEAR = 12;

export default function mapTimestampToMonthsAgo(value: number): number {
  const now: Date = new Date(Date.now());
  const then: Date = new Date(value);

  const yearNow: number = now.getFullYear();
  const yearThen: number = then.getFullYear();

  const monthNow: number = now.getMonth();
  const monthThen: number = then.getMonth();

  return (yearNow - yearThen) * MONTHS_PER_YEAR + monthNow - monthThen;
}
