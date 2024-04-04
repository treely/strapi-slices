import {
  Container,
  Center,
  Heading,
  Button,
  Link,
  Box,
  Text,
  Flex,
} from 'boemly';
import React, { useContext } from 'react';
import { StrapiCustomerStory, strapiMediaUrl } from '../..';
import Image from 'next/image';
import { IntlContext } from '../../components/ContextProvider';

export interface CustomerCardProps {
  customerStory: StrapiCustomerStory;
}
export const CustomerCard = ({
  customerStory,
}: CustomerCardProps): JSX.Element => {
  const { formatMessage } = useContext(IntlContext);

  return (
    <Container padding="none" height="full">
      <Flex flexDir="column" height="full">
        <Center height="24" backgroundColor="primary.50" borderTopRadius="xl">
          {customerStory.cardImage && (
            <Box position="relative" height="12" width="12">
              <Image
                src={strapiMediaUrl(customerStory.cardImage.img, 'medium')}
                alt={customerStory.cardImage.alt}
                fill
                style={{
                  objectFit: customerStory.cardImage.objectFit,
                }}
              />
            </Box>
          )}
        </Center>
        <Box px="6" pt="8" pb="6" mb="auto">
          {customerStory.customerCardCustomerIndustry && (
            <Text size="xsMonoUppercase" color="gray.500" mb="2">
              {customerStory.customerCardCustomerIndustry}
            </Text>
          )}
          {customerStory.title && (
            <Heading size="xl" fontWeight="500">
              {customerStory.title}
            </Heading>
          )}
        </Box>
        <Box px="6" pt="8" pb="6">
          <Link href={`/customer-stories/${customerStory.slug}`}>
            <Button variant="outline" size="sm">
              {formatMessage({ id: 'sections.customerCard.more' })}
            </Button>
          </Link>
        </Box>
      </Flex>
    </Container>
  );
};
