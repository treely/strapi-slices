import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { storybookStrapiCoverMock } from '../../test/storybookMocks/storybookStrapiMedia';
import QAndA from '.';

export default {
  title: 'slices/QAndA',
  component: QAndA,
} as Meta<typeof QAndA>;

const Template: StoryFn<typeof QAndA> = (args) => <QAndA {...args} />;

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    questionsAndAnswers: [
      { id: 1, key: 'Question 1', value: 'Answer 1' },
      { id: 2, key: 'Question 2', value: 'Answer 2' },
      { id: 3, key: 'Question 3', value: 'Answer 3' },
    ],
    otherQuestions: 'Other questions?',
    button: { id: 1, text: 'Button', url: 'https://tree.ly' },
    defaultIndex: [],
  },
};

export const WithHero = Template.bind({});
WithHero.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    questionsAndAnswers: [
      { id: 1, key: 'Question 1', value: 'Answer 1' },
      { id: 2, key: 'Question 2', value: 'Answer 2' },
      { id: 3, key: 'Question 3', value: 'Answer 3' },
    ],
    otherQuestions: 'Other questions?',
    button: { id: 1, text: 'Button', url: 'https://tree.ly' },
    hero: {
      id: 1,
      title: 'Title',
      subTitle: 'Sub title',
      button: { id: 1, text: 'Button', url: 'https://tree.ly' },
      image: {
        id: 1,
        alt: 'Hero image alt text',
        img: { data: storybookStrapiCoverMock },
      },
    },
    defaultIndex: [],
  },
};

export const WithScroll = Template.bind({});
WithScroll.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    questionsAndAnswers: [
      { id: 1, key: 'Question 1', value: 'Answer 1' },
      { id: 2, key: 'Question 2', value: 'Answer 2' },
      { id: 3, key: 'Question 3', value: 'Answer 3' },
      { id: 4, key: 'Question 3', value: 'Answer 4' },
      { id: 5, key: 'Question 3', value: 'Answer 5' },
      { id: 6, key: 'Question 3', value: 'Answer 6' },
      { id: 7, key: 'Question 3', value: 'Answer 7' },
    ],
    otherQuestions: 'Other questions?',
    button: { id: 1, text: 'Button', url: 'https://tree.ly' },
    defaultIndex: [],
  },
};

export const Gray = Template.bind({});
Gray.args = {
  slice: {
    variant: 'gray',
    tagline: 'Tagline',
    title: 'Title',
    questionsAndAnswers: [
      { id: 1, key: 'Question 1', value: 'Answer 1' },
      { id: 2, key: 'Question 2', value: 'Answer 2' },
      { id: 3, key: 'Question 3', value: 'Answer 3' },
    ],
    otherQuestions: 'Other questions?',
    button: { id: 1, text: 'Button', url: 'https://tree.ly' },
    defaultIndex: [],
  },
};

export const White = Template.bind({});
White.args = {
  slice: {
    variant: 'white',
    tagline: 'Tagline',
    title: 'Title',
    questionsAndAnswers: [
      { id: 1, key: 'Question 1', value: 'Answer 1' },
      { id: 2, key: 'Question 2', value: 'Answer 2' },
      { id: 3, key: 'Question 3', value: 'Answer 3' },
    ],
    otherQuestions: 'Other questions?',
    button: { id: 1, text: 'Button', url: 'https://tree.ly' },
    defaultIndex: [],
  },
};
