import React from 'react';
import { mergeDeep } from '../../utils/mergeDeep';
import { render, screen } from '../../test/testUtils';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import { ComparisonProps } from './Comparison';
import { pushSpy, useRouter } from '../../../__mocks__/next/router';
import Comparison from '.';
import messagesEn from './messages.en';

const defaultProps: ComparisonProps = {
  slice: {
    comparisonCards: [
      {
        id: 1,
        title: 'Card 1',
        subTitle: 'Subtitle 1',
        variant: 'white',
        lists: [
          {
            id: '1',
            title: 'List',
            items: [
              { id: '1', text: 'Item', icon: 'check' },
              { id: '2', text: 'Item', icon: 'bullet' },
              { id: '3', text: 'Item', icon: 'bullet' },
            ],
          },
        ],
      },
      {
        id: 2,
        title: 'Card 2',
        subTitle: 'Subtitle 2',
        variant: 'white',
        lists: [
          {
            id: '2',
            title: 'List',
            items: [
              { id: '4', text: 'Item', icon: 'check' },
              { id: '5', text: 'Item', icon: 'bullet' },
              { id: '6', text: 'Item', icon: 'bullet' },
            ],
          },
        ],
      },
    ],
  },
};

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<Comparison {...combinedProps} />);
};

describe('The Comparison component', () => {
  afterEach(() => {
    pushSpy.mockRestore();
  });

  afterAll(() => {
    useRouter.mockRestore();
  });

  it('displays the correct title and susbtitle, if they are defined in slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        title: 'Comparison title',
        subTitle: 'Comparison subtitle',
        tagline: 'Comparison tagline',
      },
    });
    expect(screen.getByText('Comparison title')).toBeInTheDocument();
    expect(screen.getByText('Comparison subtitle')).toBeInTheDocument();
    expect(screen.getByText('Comparison tagline')).toBeInTheDocument();
  });

  it('displays the comparison cards', () => {
    setup();

    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
  });

  it('displays the list with items', () => {
    setup();

    expect(screen.getAllByText('List')).toHaveLength(2);
    expect(screen.getAllByText('Item')).toHaveLength(6);
  });

  it('displays the fact title and subtitle if they are defined in slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        comparisonCards: [
          {
            ...defaultProps.slice.comparisonCards[0],
            factTitle: 'Fact Title',
            factSubtitle: 'Fact Subtitle',
          },
        ],
      },
    });

    expect(screen.getByText('Fact Title')).toBeInTheDocument();
    expect(screen.getByText('Fact Subtitle')).toBeInTheDocument();
  });

  it('displays the badge if it is defined in slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        comparisonCards: [
          {
            ...defaultProps.slice.comparisonCards[0],
            badge: 'Badge',
          },
        ],
      },
    });

    expect(screen.getByText('Badge')).toBeInTheDocument();
  });

  it('displays the button if the button is defined in slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        comparisonCards: [
          {
            ...defaultProps.slice.comparisonCards[0],
            button: { id: '1', url: 'https://tree.ly', text: 'Button' },
          },
        ],
      },
    });

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('displays the background shapes if variant is green in slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        comparisonCards: [
          { ...defaultProps.slice.comparisonCards[0], variant: 'green' },
        ],
      },
    });

    expect(
      screen.getByAltText(messagesEn['sections.comparison.backgroundShapes'])
    ).toBeInTheDocument();
  });

  it('displays the image if it is defined in slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        comparisonCards: [
          {
            ...defaultProps.slice.comparisonCards[0],
            image: { id: 1, alt: 'Alt text', img: { data: strapiMediaMock } },
          },
        ],
      },
    });

    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'Alt text');
  });
});
