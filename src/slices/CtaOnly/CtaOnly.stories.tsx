import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CtaOnly from '.';
import RichTextSection from '../RichTextSection';
import { RichTextSectionProps } from '../RichTextSection/RichTextSection';

export default {
  title: 'slices/CTAOnly',
  component: CtaOnly,
  subcomponents: { RichTextSection },
} as Meta<typeof CtaOnly>;

const richTextWithTitleArgs: RichTextSectionProps = {
  slice: {
    content: `
# Heading 1
This is some rich text that is not part of the CtaOnly section.
The actual CtaOnly section is only the button below.
`,
  },
};

const richTextArgs: RichTextSectionProps = {
  slice: {
    content: `
This is some rich text that is also not part of the CtaOnly section.
`,
  },
};

const Template: StoryFn<typeof CtaOnly> = (args) => (
  <>
    <RichTextSection {...richTextWithTitleArgs} />
    <CtaOnly {...args} />
    <RichTextSection {...richTextArgs} />
  </>
);

export const WithRichText = Template.bind({});
WithRichText.args = {
  slice: {
    button: {
      id: 1,
      text: 'Button',
      url: 'https://tree.ly',
    },
  },
};
