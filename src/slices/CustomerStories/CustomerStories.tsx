import React from 'react';
import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiCustomerStory from '../../models/strapi/StrapiCustomerStory';
import { Box, DefaultSectionContainer, SimpleGrid, Wrapper } from 'boemly';
import CustomerCard from '../../components/CustomerCard';
import CustomerQuoteCard from '../../components/CustomerQuoteCard';
import LogoCard from '../../components/LogoCard';

export interface CustomerStoriesProps {
  slice: {
    customer_stories: IStrapiData<StrapiCustomerStory>[];
  };
  customerStories: IStrapiData<StrapiCustomerStory>[];
}

export const CustomerStories = ({
  slice,
  customerStories,
}: CustomerStoriesProps): React.JSX.Element => {
  return (
    <DefaultSectionContainer>
      <Wrapper>
        <SimpleGrid columns={[1, null, null, 2, 3]} gap="6">
          {slice.customer_stories.map((customerStoryRef, index) => {
            const customerStory: IStrapiData<StrapiCustomerStory> | undefined =
              customerStories.find(
                (cs) => cs.attributes.slug === customerStoryRef.attributes.slug
              );
            if (!customerStory) {
              return null;
            }
            return (
              <Box key={`${customerStoryRef.id}-${index}`}>
                {customerStoryRef.attributes.variant === 'customerCard' && (
                  <CustomerCard customerStory={customerStory.attributes} />
                )}
                {customerStoryRef.attributes.variant === 'quoteCard' && (
                  <CustomerQuoteCard customerStory={customerStory.attributes} />
                )}
                {customerStoryRef.attributes.variant === 'logoCard' && (
                  <LogoCard customerStory={customerStory.attributes} />
                )}
              </Box>
            );
          })}
        </SimpleGrid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
