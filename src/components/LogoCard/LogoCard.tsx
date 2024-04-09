import { Box, Container, Flex } from 'boemly';
import { StrapiCustomerStory, strapiMediaUrl } from '../..';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export interface LogoCardProps {
  customerStory: StrapiCustomerStory;
}
export const LogoCard = ({ customerStory }: LogoCardProps) => {
  if (customerStory.cardImage) {
    return (
      <Container height="full" backgroundColor="primary.50">
        <Flex justifyContent="center" height="full" padding="4">
          <Box position="relative" height="12" width="36" marginY="auto">
            <Link href={`/customer-stories/${customerStory.slug}`}>
              <Image
                src={strapiMediaUrl(customerStory.cardImage.img, 'medium')}
                alt={customerStory.cardImage.alt}
                fill
                style={{
                  objectFit: customerStory.cardImage.objectFit,
                }}
              />
            </Link>
          </Box>
        </Flex>
      </Container>
    );
  }
  return <></>;
};
