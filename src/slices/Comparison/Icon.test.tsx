import React from 'react';
import { render, screen } from '../../test/testUtils';
import { mergeDeep } from '../../utils/mergeDeep';
import { IconProps, Icon } from './Icon';

const defaultProps: IconProps = {
  variant: 'white',
  icon: 'bullet',
};

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<Icon {...combinedProps} />);
};

describe('The Icon component', () => {
  it('renders the correct icon if the "check" is defined', () => {
    const { container } = render(<Icon variant="gray" icon="check" />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveAttribute(
      'fill',
      'var(--boemly-colors-primary-500)'
    );
    expect(svgElement).toHaveAttribute('height', '20');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 256 256');
    expect(svgElement).toHaveAttribute('width', '20');
  });

  it('renders the correct icon if the "cross" icon is defined', () => {
    const { container } = render(<Icon variant="gray" icon="cross" />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveAttribute('height', '20');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 256 256');
    expect(svgElement).toHaveAttribute('width', '20');
  });

  it('renders the bullet point box if no icon is defined', () => {
    setup();

    expect(screen.getByTestId('bullet-point-box')).toBeInTheDocument();
  });
});
