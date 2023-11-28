import React from 'react';
import { render, screen } from '../../test/testUtils';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import Steps from '.';
import { StepsProps } from './Steps';

const defaultProps: StepsProps = {
  slice: {
    title: 'Title',
    steps: [
      {
        id: 1,
        step: 1,
        title: 'Step Title',
      },
    ],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<Steps {...combinedProps} />);
};

describe('The Steps component', () => {
  it('displays the section header', () => {
    setup();

    expect(screen.getByTestId('default-section-header')).toBeInTheDocument();
  });

  it('displays the number of the steps', () => {
    setup();

    expect(
      screen.getByText(defaultProps.slice.steps[0].step)
    ).toBeInTheDocument();
  });

  it('displays the titles of the steps', () => {
    setup();

    expect(
      screen.getByText(defaultProps.slice.steps[0].title)
    ).toBeInTheDocument();
  });

  it('displays the texts of the steps if there is one in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        steps: [{ id: 1, step: 1, title: 'Step title', text: 'Step text' }],
      },
    });

    expect(screen.getByText('Step text')).toBeInTheDocument();
  });

  it('displays the background image if there is one in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        image: { id: 1, alt: 'Alt text', img: { data: strapiMediaMock } },
      },
    });

    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Alt text');
  });
});
