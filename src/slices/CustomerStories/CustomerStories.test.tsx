import React from 'react';
import { render, screen } from '../../test/testUtils';
import { mergeDeep } from '../../utils/mergeDeep';
import { strapiCustomerStoryMock } from '../../test/strapiMocks/strapiCustomerStory';
import { CustomerStoriesProps } from './CustomerStories';
import CustomerStories from '.';

const defaultProps: CustomerStoriesProps = {
  slice: {
    customer_stories: [
      {
        ...strapiCustomerStoryMock,
        attributes: {
          ...strapiCustomerStoryMock.attributes,
          createdAt: '2022-01-10T15:04:32.897Z',
        },
      },
    ],
  },
  customerStories: [strapiCustomerStoryMock],
};

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<CustomerStories {...combinedProps} />);
};

describe('The CustomerStories component', () => {
  it('displays all the customer story titles', () => {
    setup();

    expect(
      screen.getByText(strapiCustomerStoryMock.attributes.title)
    ).toBeInTheDocument();
  });

  it('displays nothing if the customer story that should be displayed does not exists in the delivered customer stories', () => {
    setup({ customerStories: [] });

    expect(
      screen.queryByText(strapiCustomerStoryMock.attributes.title)
    ).not.toBeInTheDocument();
  });
});
