import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';
import { storybookStrapiAvatarMock } from '../../test/storybookMocks/storybookStrapiMedia';
import ProjectFacts from '.';

export default {
  title: 'slices/ProjectFacts',
  component: ProjectFacts,
} as Meta<typeof ProjectFacts>;

const Template: StoryFn<typeof ProjectFacts> = (args) => (
  <ProjectFacts {...args} />
);

export const Minimal = Template.bind({});
Minimal.args = {
  project: fpmProjectMock,
  slice: {
    projectId: fpmProjectMock.id,
  },
};

export const WithDocuments = Template.bind({});
WithDocuments.args = {
  project: fpmProjectMock,
  slice: {
    projectId: fpmProjectMock.id,

    documentUrls: [
      { id: 1, text: 'Document 1', url: 'https://example.org' },
      { id: 2, text: 'Document 2', url: 'https://example.org' },
      { id: 3, text: 'Document 3', url: 'https://example.org' },
    ],
  },
};

export const WithCheckout = Template.bind({});
WithCheckout.args = {
  project: fpmProjectMock,
  slice: {
    projectId: fpmProjectMock.id,
    batchId: 'mock-id',
    currency: 'EUR',
    pricePerKg: 0.08,
    checkoutText:
      'With your support you help Example Project with sustainable forestry.',
    initialContributionValue: 80,
  },
};

export const FullProps = Template.bind({});
FullProps.args = {
  project: fpmProjectMock,
  slice: {
    projectId: fpmProjectMock.id,

    batchId: 'mock-id',
    currency: 'EUR',
    pricePerKg: 0.08,
    checkoutText:
      'With your support you help Example Project with sustainable forestry.',
    initialContributionValue: 80,

    documentUrls: [
      { id: 1, text: 'Document 1', url: 'https://example.org' },
      { id: 2, text: 'Document 2', url: 'https://example.org' },
      { id: 3, text: 'Document 3', url: 'https://example.org' },
    ],

    buyCreditsSubtitle: 'Buy Credits Subtitle',
    areaSubtitle: 'Area Subtitle',
    locationSubtitle: 'Location Subtitle',
    startSubtitle: 'Start Subtitle',
    timeSpanSubtitle: 'Time Span Subtitle',
    projectTypeSubtitle: 'Project Type Subtitle',
    projectDeveloperSubtitle: 'Project Developer Subtitle',
    verificationStandardSubtitle: 'Verification Standard Subtitle',
    forecastedAmountSubtitle: 'Forecasted Amount Subtitle',
    riskBufferSubtitle: 'Risk Buffer Subtitle',

    customTitle: 'Looking to buy more than 10.000 tCO₂?',
    customSubtitle:
      'For enterprise-customers we offer custom solutions. Feel free to contact us.',
    customButton: {
      id: 1,
      text: 'Contact our Sales Team',
      url: 'https://example.org',
    },
    taxInPercent: 20,
  },
};

export const WithContact = Template.bind({});
WithContact.args = {
  project: fpmProjectMock,
  slice: {
    projectId: fpmProjectMock.id,

    contactTitle: 'Contact Title',
    contactText: 'Contact Text',
    contactButton: {
      id: 1,
      text: 'Contact our Sales Team',
      url: 'https://example.org',
    },
    contactAvatar: {
      id: 1,
      alt: 'Avatar image alt text',
      img: {
        data: storybookStrapiAvatarMock,
      },
    },
  },
};

export const WithDocumentsAndContact = Template.bind({});
WithDocumentsAndContact.args = {
  project: fpmProjectMock,
  slice: {
    projectId: fpmProjectMock.id,

    documentUrls: [
      { id: 1, text: 'Document 1', url: 'https://example.org' },
      { id: 2, text: 'Document 2', url: 'https://example.org' },
      { id: 3, text: 'Document 3', url: 'https://example.org' },
    ],

    contactTitle: 'Contact Title',
    contactText: 'Contact Text',
    contactButton: {
      id: 1,
      text: 'Contact our Sales Team',
      url: 'https://example.org',
    },
    contactAvatar: {
      id: 1,
      alt: 'Avatar image alt text',
      img: {
        data: storybookStrapiAvatarMock,
      },
    },
  },
};
