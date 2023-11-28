import React, { useContext } from 'react';
import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiCustomerStory from '../../models/strapi/StrapiCustomerStory';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import {
  Box,
  Button,
  Center,
  Container,
  DefaultSectionContainer,
  Heading,
  SimpleGrid,
  Text,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import Link from 'next/link';
import { IntlContext } from '../../components/ContextProvider';

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
  const { formatMessage } = useContext(IntlContext);

  return (
    <DefaultSectionContainer>
      <Wrapper>
        <SimpleGrid columns={[1, null, null, 2]} spacingX={56} spacingY={24}>
          {slice.customer_stories.map(({ attributes }) => {
            const customerStory: IStrapiData<StrapiCustomerStory> | undefined =
              customerStories.find(
                (cs) => cs.attributes.slug === attributes.slug
              );
            if (!customerStory) {
              return null;
            }
            return (
              <Container padding="none" key={customerStory.id}>
                <Center
                  height="24"
                  backgroundColor="primary.50"
                  borderTopRadius="xl"
                >
                  <Box position="relative" height="12" width="12">
                    <Image
                      src={strapiMediaUrl(
                        customerStory.attributes.customerLogo.img,
                        'medium'
                      )}
                      alt={customerStory.attributes.customerLogo.alt}
                      fill
                      style={{
                        objectFit:
                          customerStory.attributes.customerLogo.objectFit,
                      }}
                    />
                  </Box>
                </Center>
                <Box px="6" pt="12" pb="6">
                  <Text size="xsMonoUppercase" color="gray.500" mb="2">
                    {customerStory.attributes.customerIndustry}
                  </Text>
                  <Heading size="xl">{customerStory.attributes.title}</Heading>
                  <Button
                    as={Link}
                    href={`/customer-stories/${customerStory.attributes.slug}`}
                    variant="outline"
                    size="sm"
                    mt="12"
                  >
                    {formatMessage({ id: 'sections.customerStories.more' })}
                  </Button>
                </Box>
              </Container>
            );
          })}
        </SimpleGrid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
