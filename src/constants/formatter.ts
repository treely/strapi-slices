import { FormatNumberOptions } from 'react-intl';

export const FORMAT_AS_EUR_CONFIG: FormatNumberOptions = {
  style: 'currency',
  currency: 'EUR',
};

export const FORMAT_AS_METER_CONFIG: FormatNumberOptions = {
  unit: 'meter',
  unitDisplay: 'short',
  style: 'unit',
  maximumFractionDigits: 0,
};

export const FORMAT_AS_HECTARE_CONFIG: FormatNumberOptions = {
  unit: 'hectare',
  unitDisplay: 'short',
  style: 'unit',
  maximumFractionDigits: 2,
};

export const FORMAT_AS_CUBIC_METERS_PER_HECTARE_CONFIG: FormatNumberOptions = {
  maximumFractionDigits: 0,
};

export const FORMAT_AS_PERCENT_CONFIG: FormatNumberOptions = {
  style: 'percent',
  maximumFractionDigits: 2,
};
