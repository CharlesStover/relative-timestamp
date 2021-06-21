const SINGLE = 1;

export default function defaultChildren(
  unit: 'days' | 'hours' | 'minutes' | 'months' | 'now' | 'years',
  count: number,
): string {
  switch (unit) {
    case 'days': {
      if (count === SINGLE) {
        return '1 day ago';
      }
      return `${count} days ago`;
    }

    case 'hours': {
      if (count === SINGLE) {
        return '1 hour ago';
      }
      return `${count} hours ago`;
    }

    case 'minutes': {
      if (count === SINGLE) {
        return '1 minute ago';
      }
      return `${count} minutes ago`;
    }

    case 'months': {
      if (count === SINGLE) {
        return '1 month ago';
      }
      return `${count} months ago`;
    }

    case 'now':
      return 'Now';

    case 'years': {
      if (count === SINGLE) {
        return '1 year ago';
      }
      return `${count} years ago`;
    }
  }
}
