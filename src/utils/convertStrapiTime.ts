import { FormatNumberOptions } from 'react-intl';

const convertStrapiTime = (
  date: string,
  formatNumber: (value: number | bigint, opts?: FormatNumberOptions) => string
): string => {
  let tempTime = date.split(':');
  let dt = new Date();
  dt.setHours(parseInt(tempTime[0], 10), parseInt(tempTime[1], 10), 0, 0);
  const time = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000);

  return `${formatNumber(time.getUTCHours(), {
    minimumIntegerDigits: 2,
  })}:${formatNumber(time.getUTCMinutes(), {
    minimumIntegerDigits: 2,
  })}`;
};

export default convertStrapiTime;
