import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Glossary from '.';

export default {
  title: 'sections/Glossary',
  component: Glossary,
} as Meta<typeof Glossary>;

const Template: StoryFn<typeof Glossary> = (args) => <Glossary {...args} />;

export const Default = Template.bind({});
Default.args = {
  slice: {
    glossary_items: [
      {
        id: 1,
        attributes: {
          title: 'Chocolate',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
          slug: 'chocolate-slug',
        },
      },
      {
        id: 2,
        attributes: {
          title: 'Ananas',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
          slug: 'ananas-slug',
        },
      },
      {
        id: 3,
        attributes: {
          title: 'Another',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
          slug: 'another-slug',
        },
      },
    ],
  },
};
