import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import ShopCheckout from '.';

export default {
  title: 'shop/ShopCheckout',
  component: ShopCheckout,
} as Meta<typeof ShopCheckout>;

const Template: StoryFn<typeof ShopCheckout> = (args) => (
  <ShopCheckout {...args} />
);

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    batchId: 'batchId',
    pricePerKg: 0.06,
    initialContributionValue: 60,
    checkoutText: 'Checkout Text',
    currency: 'EUR',
  },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    title: 'Title',
    batchId: 'batchId',
    pricePerKg: 0.06,
    initialContributionValue: 60,
    checkoutText: 'Checkout Text',
    tagline: 'Tagline',
    currency: 'EUR',
  },
};

export const WithText = Template.bind({});
WithText.args = {
  slice: {
    title: 'Title',
    batchId: 'batchId',
    pricePerKg: 0.06,
    initialContributionValue: 60,
    checkoutText: 'Checkout Text',
    text: 'Text',
    currency: 'EUR',
  },
};

export const WithBadge = Template.bind({});
WithBadge.args = {
  slice: {
    title: 'Title',
    batchId: 'batchId',
    pricePerKg: 0.06,
    initialContributionValue: 60,
    checkoutText: 'Checkout Text',
    badge: 'Badge Text',
    currency: 'EUR',
  },
};

export const WithCHF = Template.bind({});
WithCHF.args = {
  slice: {
    title: 'Title',
    batchId: 'batchId',
    pricePerKg: 0.06,
    initialContributionValue: 60,
    checkoutText: 'Checkout Text',
    badge: 'Badge Text',
    currency: 'CHF',
  },
};
