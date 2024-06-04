import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { PreviewAlert } from '.';

export default {
  title: 'dev/PreviewAlert',
  component: PreviewAlert,
} as Meta<typeof PreviewAlert>;

const Template: StoryFn<typeof PreviewAlert> = () => <PreviewAlert />;

export const Default = Template.bind({});
