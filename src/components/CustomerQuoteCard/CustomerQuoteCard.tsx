import { Container, Heading, Button, Box, Text } from 'boemly';
import React, { useContext } from 'react';
import { StrapiCustomerStory, strapiMediaUrl } from '../..';
import Image from 'next/image';
import { IntlContext } from '../../components/ContextProvider';
import Link from 'next/link';

export interface CustomerQuoteCardProps {
  customerStory: StrapiCustomerStory;
}

export const CustomerQuoteCard = ({
  customerStory,
}: CustomerQuoteCardProps): JSX.Element => {
  const { formatMessage } = useContext(IntlContext);

  return (
    <Container p="1" backgroundColor="primary.100" height="full">
      {customerStory.cardImage ? (
        <Box
          position="relative"
          height="12"
          width="12"
          borderRadius="full"
          overflow="hidden"
        >
          <Image
            src={strapiMediaUrl(customerStory.cardImage.img, 'medium')}
            alt={customerStory.cardImage.alt}
            fill
            style={{
              objectFit: customerStory.cardImage.objectFit,
            }}
          />
        </Box>
      ) : (
        <></>
      )}
      <Box>
        <Box my="8">
          <Heading size="md" fontWeight="500">
            {customerStory.customerName}
          </Heading>
          <Text size="xs">{customerStory.quoteCardCustomerTitle}</Text>
        </Box>
        <Text size="xs" color="black">
          {customerStory.quoteCardQuote}
        </Text>
        <Button
          href={`/customer-stories/${customerStory.slug}`}
          as={Link}
          variant="outline"
          size="sm"
          mt="8"
        >
          {formatMessage({ id: 'sections.customerQuoteCard.more' })}
        </Button>
      </Box>
    </Container>
  );
};
