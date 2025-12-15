import React from 'react';
import { render, screen } from '../../test/testUtils';
import LinkCardsGrid from '.';
import { LinkCardsGridProps } from './LinkCardsGrid';

const defaultProps: LinkCardsGridProps = {
  slice: {
    title: 'Title',
    cards: [
      {
        id: 1,
        title: 'Title',
        text: 'Text',
        link: { id: 1, text: 'Text', url: '/' },
      },
    ],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<LinkCardsGrid {...combinedProps} />);
};

describe('The LinkCardsGrid component', () => {
  it('displays the section header', () => {
    setup();

    expect(screen.getByTestId('default-section-header')).toBeInTheDocument();
  });

  it('displays the link', () => {
    setup();

    const linkBox = screen.getByTestId('link');
    const linkElement = linkBox.closest('a');
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
