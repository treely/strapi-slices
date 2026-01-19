import React from 'react';
import { StoryFn, Meta } from '@storybook/nextjs';

import HeroWithHighlights from '.';

export default {
  title: 'slices/HeroWithHighlights',
  component: HeroWithHighlights,
  argTypes: {
    title: { control: { type: 'text' } },
    subTitle: { control: { type: 'text' } },
    headingLevel: {
      options: ['h1', 'h2', 'h3'],
      control: { type: 'radio' },
    },
    headingSize: {
      options: [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
      ],
      control: { type: 'radio' },
    },
    variant: {
      options: ['white', 'gray'],
      control: { type: 'radio' },
    },
    textAlign: {
      options: ['left', 'center', 'right'],
      control: { type: 'radio' },
    },
  },
  args: {
    title: 'Forest project [Portfolio]',
    headingLevel: 'h1',
    headingSize: '3xl',
    variant: 'white',
    textAlign: 'left',
  },
} as Meta;

const Template: StoryFn = (args) => (
  <HeroWithHighlights
    slice={{
      title: args.title,
      subTitle: args.subTitle,
      headingLevel: args.headingLevel,
      headingSize: args.headingSize,
      variant: args.variant,
      textAlign: args.textAlign,
    }}
  />
);

export const Minimal = Template.bind({});
Minimal.args = {};

export const WithSubtitle = Template.bind({});
WithSubtitle.args = {
  subTitle: 'Discover our sustainable forest projects all over Europe',
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  title:
    '[Climate protection] through sustainable forest management: Our contribution to [CO₂-reduction]',
  subTitle: 'Learn more about our methods and goals for a sustainable future',
};

export const GrayVariant = Template.bind({});
GrayVariant.args = {
  subTitle: 'On a gray background',
  variant: 'gray',
};

export const Centered = Template.bind({});
Centered.args = {
  textAlign: 'center',
  subTitle: 'Centered text',
};
