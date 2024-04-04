import React from 'react';
import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiCustomerStory from '../../models/strapi/StrapiCustomerStory';
import { Box, DefaultSectionContainer, SimpleGrid, Wrapper } from 'boemly';
import CustomerCard from '../../components/CustomerCard';
import CustomerQuoteCard from '../../components/CustomerQuoteCard';

export interface CustomerStoriesProps {
  slice: {
    customer_stories: IStrapiData<StrapiCustomerStory>[];
  };
  customerStories: IStrapiData<StrapiCustomerStory>[];
}

export const CustomerStories = ({
  slice,
  customerStories,
}: CustomerStoriesProps): JSX.Element => {
  return (
    <DefaultSectionContainer>
      <Wrapper>
        <SimpleGrid columns={[1, null, null, 2, 3]} spacingX={6} spacingY={6}>
          {slice.customer_stories.map(({ attributes }) => {
            const customerStory: IStrapiData<StrapiCustomerStory> | undefined =
              customerStories.find(
                (cs) => cs.attributes.slug === attributes.slug
              );
            if (!customerStory) {
              return null;
            }
            return (
              <Box key={customerStory.id}>
                {attributes.variant === 'customerCard' && (
                  <CustomerCard customerStory={customerStory.attributes} />
                )}
                {attributes.variant === 'quoteCard' && (
                  <CustomerQuoteCard customerStory={customerStory.attributes} />
                )}
              </Box>
            );
          })}
        </SimpleGrid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
