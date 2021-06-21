# `RelativeTimestamp`

[![version](https://img.shields.io/npm/v/relative-timestamp.svg)](https://www.npmjs.com/package/relative-timestamp)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/relative-timestamp.svg)](https://www.npmjs.com/package/relative-timestamp)
[![downloads](https://img.shields.io/npm/dt/relative-timestamp.svg)](https://www.npmjs.com/package/relative-timestamp)

`RelativeTimestamp` is a React component for formatting Unix timestamps in
relative time, e.g. `Now`, `12 days ago`, or `1 year ago`.

## Install

- `npm install relative-timestamp` or
- `yarn add relative-timestamp`

## Use

```javascript
import RelativeTimestamp from 'relative-timestamp';

const MY_DATE = new Date(2000, 4, 20);
const MY_TIMESTAMP = MY_DATE.getTime();

// In the year 2021, this will output "21 years ago."
function MyRelativeTimestamp() {
  return <RelativeTimestamp value={MY_TIMESTAMP} />;
}
```

## Supported time units

The `RelativeTimestamp` component supports _now_, minutes, hours, days, months,
and years.

_Seconds_ are not supported and are instead represented as _Now_. Rendering
timestamps from seconds ago would be too noisy to animate and have too poor of
performance to re-render every second. Instead of "X seconds ago" ticking up
every second, the component instead renders "Now" and re-renders on the _minute_
mark.

## API

### `children`

Type: `(unit, count) => ReactNode` (optional)

If you want to provide custom internationalization, logic, or styling on your
display, you can optionally pass a `children` prop that accepts the unit and
count.

For example,

```javascript
const MY_DATE = new Date(2000, 4, 20);
const MY_TIMESTAMP = MY_DATE.getTime();

function MyRelativeTimestamp() {
  return (
    <RelativeTimestamp value={MY_TIMESTAMP}>
      {(unit, count) => {
        switch (unit) {
          case 'now':
            return <I18n>now</I18n>;
          case 'days':
          case 'hours':
          case 'minutes':
          case 'months':
          case 'years':
            return <I18n count={count}>{unit}_ago</I18n>;
        }
      }}
    </RelativeTimestamp>
  );
}
```

### `value`

Type: `number` (required)

The `value` prop should be the Unix timestamp that you want to display
relatively.

## Contributing

- `yarn set version latest`
- `yarn up * @*/*`
- `yarn add --dev @yarnpkg/pnpify`
- `yarn pnpify --sdk vscode`
