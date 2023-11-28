import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Facts from '.';

export default {
  title: 'slices/Facts',
  component: Facts,
} as Meta<typeof Facts>;

const Template: StoryFn<typeof Facts> = (args) => <Facts {...args} />;

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    variant: 'gray',
    facts: [
      { key: 'Key 1', value: 'Value 1' },
      { key: 'Key 2', value: 'Value 2' },
      { key: 'Key 3', value: 'Value 3' },
    ],
  },
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
    variant: 'gray',
    facts: [
      { key: 'Key 1', value: 'Value 1' },
      { key: 'Key 2', value: 'Value 2' },
      { key: 'Key 3', value: 'Value 3' },
    ],
  },
};

export const WithButton = Template.bind({});
WithButton.args = {
  slice: {
    button: {
      id: 1,
      text: 'Button',
      url: 'https://tree.ly',
    },
    variant: 'gray',
    facts: [
      { key: 'Key 1', value: 'Value 1' },
      { key: 'Key 2', value: 'Value 2' },
      { key: 'Key 3', value: 'Value 3' },
      { key: 'Key 4', value: 'Value 4' },
    ],
  },
};

export const Green = Template.bind({});
Green.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
    button: {
      id: 1,
      text: 'Button',
      url: 'https://tree.ly',
    },
    variant: 'green',
    facts: [
      { key: 'Key 1', value: 'Value 1' },
      { key: 'Key 2', value: 'Value 2' },
      { key: 'Key 3', value: 'Value 3' },
      { key: 'Key 4', value: 'Value 4' },
    ],
  },
};

export const White = Template.bind({});
White.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
    variant: 'white',
    button: {
      id: 1,
      text: 'Button',
      url: 'https://tree.ly',
    },
    facts: [
      { key: 'Key 1', value: 'Value 1' },
      { key: 'Key 2', value: 'Value 2' },
      { key: 'Key 3', value: 'Value 3' },
      { key: 'Key 4', value: 'Value 4' },
      { key: 'Key 5', value: 'Value 5' },
    ],
  },
};
