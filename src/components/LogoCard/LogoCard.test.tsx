import React from 'react';
import { render, screen } from '../../test/testUtils';
import { mergeDeep } from '../../utils/mergeDeep';
import { strapiCustomerStoryMock } from '../../test/strapiMocks/strapiCustomerStory';
import { LogoCardProps } from './LogoCard';
import LogoCard from '.';

const defaultProps: LogoCardProps = {
  customerStory: strapiCustomerStoryMock.attributes,
};

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<LogoCard {...combinedProps} />);
};

describe('The LogoCard component', () => {
  it('displays the customer card image with the link', () => {
    setup();

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('displays the link', () => {
    setup();

    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
