import React from 'react';
import { StoryFn, Meta } from '@storybook/nextjs';

import RichTextSection from '.';

export default {
  title: 'slices/RichTextSection',
  component: RichTextSection,
} as Meta<typeof RichTextSection>;

const Template: StoryFn<typeof RichTextSection> = (args) => (
  <RichTextSection {...args} />
);

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    content: `
# Heading 1

## Heading 2

### Heading 3

Text
`,
  },
};
