import React from 'react';
import { render, screen } from '../../test/testUtils';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import LogoGridWithText from '.';
import { LogoGridWithTextProps } from './LogoGridWithText';

const defaultProps: LogoGridWithTextProps = {
  slice: {
    title: 'Title',
    text: 'Text',
    logos: [{ id: 1, alt: 'Alt text 1', img: { data: strapiMediaMock } }],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<LogoGridWithText {...combinedProps} />);
};

describe('The LogoGridWithText component', () => {
  it('displays the title', () => {
    setup();

    expect(screen.getByText(defaultProps.slice.title)).toBeInTheDocument();
  });

  it('displays the text', () => {
    setup();

    expect(screen.getByText(defaultProps.slice.text)).toBeInTheDocument();
  });

  it('displays the button if one is defined', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        button: {
          id: 1,
          text: 'Button text',
          url: 'url',
        },
      },
    });

    expect(screen.getByText('Button text')).toBeInTheDocument();
  });

  it('displays the logo', () => {
    setup();

    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      defaultProps.slice.logos[0].alt
    );
  });
});
