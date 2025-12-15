import React from 'react';
import { StoryFn, Meta } from '@storybook/nextjs';

import ProjectsGrid from '.';
import { strapiProjectMock } from '../../test/strapiMocks/strapiProject';
import portfolioProjectMock from '../../test/integrationMocks/portfolioProjectMock';
import { CreditAvailability } from '../../models/fpm/FPMProject';

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

export const WithoutCertificationDate = Template.bind({});
WithoutCertificationDate.args = {
  projects: [{ ...portfolioProjectMock, certificationDate: undefined }],
  slice: {
    projects: { data: [strapiProjectMock] },
  },
};

export const WithCreditsAvailabilityVariants = Template.bind({});
WithCreditsAvailabilityVariants.args = {
  projects: [
    portfolioProjectMock,
    {
      ...portfolioProjectMock,
      title: 'Project 2',
      creditAvailability: CreditAvailability.SOME_CREDITS_AVAILABLE,
    },
    {
      ...portfolioProjectMock,
      title: 'Project 3',
      creditAvailability: CreditAvailability.SOON_CREDITS_AVAILABLE,
    },
    {
      ...portfolioProjectMock,
      title: 'Project 4',
      creditAvailability: CreditAvailability.NO_CREDITS_AVAILABLE,
    },
  ],
  slice: {
    projects: { data: [strapiProjectMock] },
  },
};
