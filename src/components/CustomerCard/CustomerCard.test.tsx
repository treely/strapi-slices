import React from 'react';
import { render, screen } from '../../test/testUtils';
import { mergeDeep } from '../../utils/mergeDeep';
import { strapiCustomerStoryMock } from '../../test/strapiMocks/strapiCustomerStory';
import { CustomerCardProps } from './CustomerCard';
import CustomerCard from '../CustomerCard';
import messagesEn from './messages.en';

const defaultProps: CustomerCardProps = {
  customerStory: strapiCustomerStoryMock.attributes,
};

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<CustomerCard {...combinedProps} />);
};

describe('The CustomerCard component', () => {
  it('displays the customer card title', () => {
    setup();

    expect(
      screen.getByText(strapiCustomerStoryMock.attributes.title || '')
    ).toBeInTheDocument();
  });

  it('displays the customer card image', () => {
    setup();

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('displays the customer card industry', () => {
    setup();

    expect(
      screen.getByText(
        strapiCustomerStoryMock.attributes.customerCardCustomerIndustry || ''
      )
    ).toBeInTheDocument();
  });

  it('displays the button', () => {
    setup();

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(messagesEn['sections.customerCard.more']));
  });
});
