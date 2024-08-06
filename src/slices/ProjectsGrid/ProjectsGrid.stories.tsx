import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import ProjectsGrid from '.';
import { strapiProjectMock } from '../../test/strapiMocks/strapiProject';
import portfolioProjectMock from '../../test/integrationMocks/portfolioProjectMock';

export default {
  title: 'slices/ProjectsGrid',
  component: ProjectsGrid,
} as Meta<typeof ProjectsGrid>;

const Template: StoryFn<typeof ProjectsGrid> = (args) => (
  <ProjectsGrid {...args} />
);

export const Minimal = Template.bind({});
Minimal.args = {
  projects: [portfolioProjectMock],
  slice: {
    projects: { data: [strapiProjectMock] },
  },
};
