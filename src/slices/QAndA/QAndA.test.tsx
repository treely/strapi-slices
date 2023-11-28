import React from 'react';
import { render, screen } from '../../test/testUtils';
import { strapiHeroCardMock } from '../../test/strapiMocks/strapiHeroCard';
import QAndA from '.';
import { QAndAProps } from './QAndA';

const defaultProps: QAndAProps = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    otherQuestions: 'Other question?',
    button: {
      id: 1,
      text: 'Text',
      url: 'url',
    },
    questionsAndAnswers: [
      { id: 1, key: 'Key 1', value: 'Value 1' },
      { id: 2, key: 'Key 2', value: 'Value 2' },
    ],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<QAndA {...combinedProps} />);
};

describe('The QAndA component', () => {
  it('displays the tagline', () => {
    setup();

    expect(screen.getByText(defaultProps.slice.tagline)).toBeInTheDocument();
  });

  it('displays the title', () => {
    setup();

    expect(screen.getByText(defaultProps.slice.title)).toBeInTheDocument();
  });

  it('displays the questions and answers', () => {
    setup();

    expect(screen.getByText('Key 1')).toBeInTheDocument();
    expect(screen.getByText('Value 1')).toBeInTheDocument();
    expect(screen.getByText('Key 2')).toBeInTheDocument();
    expect(screen.getByText('Value 2')).toBeInTheDocument();
  });

  it('displays a hero card if there is a hero in the slice', () => {
    setup({ slice: { ...defaultProps.slice, hero: strapiHeroCardMock } });

    expect(screen.getByText(strapiHeroCardMock.title)).toBeInTheDocument();
  });

  it('renders correctly in the white variant', () => {
    setup({ slice: { ...defaultProps.slice, variant: 'white' } });

    expect(screen.getByText(defaultProps.slice.tagline)).toBeInTheDocument();
  });

  it('renders correctly in the gray variant', () => {
    setup({ slice: { ...defaultProps.slice, variant: 'gray' } });

    expect(screen.getByText(defaultProps.slice.tagline)).toBeInTheDocument();
  });
});
