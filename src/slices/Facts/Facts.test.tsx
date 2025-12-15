import React from 'react';
import { render, screen } from '../../test/testUtils';
import Facts from '.';
import { FactsProps } from './Facts';

const defaultProps: FactsProps = {
  slice: {
    variant: 'gray',
    facts: [
      { key: 'Fact 1', value: 'Value 1' },
      { key: 'Fact 2', value: 'Value 2' },
      { key: 'Fact 3', value: 'Value 3' },
    ],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<Facts {...combinedProps} />);
};

describe('The Facts component', () => {
  it('displays a link if there is a button in the slice', () => {
    setup({
      slice: { ...defaultProps.slice, button: { url: 'url', text: 'Link' } },
    });

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
  });

  it('displays the chakra-button with css-uurmsh class if the slice.variant is gray', () => {
    setup({
      slice: { ...defaultProps.slice, button: { url: 'url', text: 'Link' } },
    });

    expect(screen.getByRole('link')).toHaveClass('chakra-button css-uurmsh');
  });

  it('displays the chakra-button with css-em81ir class if the slice.variant is green', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        variant: 'green',
        button: { url: 'url', text: 'Link' },
      },
    });

    expect(screen.getByRole('link')).toHaveClass('chakra-button css-em81ir');
  });

  it('displays the title header when slice.title is defined', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        title: 'Test Title',
        tagline: 'Test Tagline',
        subTitle: 'Test Subtitle',
      },
    });

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Tagline')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('does not display the title header when slice.title is undefined', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        tagline: 'Test Tagline',
        subTitle: 'Test Subtitle',
      },
    });

    expect(screen.queryByText('Test Tagline')).toBeNull();
  });

  it('displays the facts', () => {
    setup({
      slice: {
        ...defaultProps.slice,
      },
    });

    expect(screen.getByText('Fact 1')).toBeInTheDocument();
    expect(screen.getByText('Fact 2')).toBeInTheDocument();
    expect(screen.getByText('Fact 3')).toBeInTheDocument();
  });

  it('does not display a link if the button in the slice is undefined', () => {
    setup({
      slice: {
        ...defaultProps.slice,
      },
    });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
