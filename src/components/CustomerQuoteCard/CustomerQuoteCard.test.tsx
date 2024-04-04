import React from 'react';
import { render, screen } from '../../test/testUtils';
import { mergeDeep } from '../../utils/mergeDeep';
import { strapiCustomerStoryMock } from '../../test/strapiMocks/strapiCustomerStory';
import { CustomerQuoteCardProps } from './CustomerQuoteCard';
import CustomerQuoteCard from '.';
import messagesEn from './messages.en';

const defaultProps: CustomerQuoteCardProps = {
  customerStory: strapiCustomerStoryMock.attributes,
};

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<CustomerQuoteCard {...combinedProps} />);
};

describe('The QuoteCustomerCard component', () => {
  it('displays the customer name', () => {
    setup();

    expect(
      screen.getByText(strapiCustomerStoryMock.attributes.customerName || '')
    ).toBeInTheDocument();
  });

  it('displays the customer title', () => {
    setup();

    expect(
      screen.getByText(
        strapiCustomerStoryMock.attributes.quoteCardCustomerTitle || ''
      )
    ).toBeInTheDocument();
  });

  it('displays the customer quote text', () => {
    setup();

    expect(
      screen.getByText(strapiCustomerStoryMock.attributes.quoteCardQuote || '')
    ).toBeInTheDocument();
  });

  it('displays the customer card image', () => {
    setup();

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('displays the button', () => {
    setup();

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(messagesEn['sections.customerQuoteCard.more']));
  });
});
