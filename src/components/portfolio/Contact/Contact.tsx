import React from 'react';
import StrapiImage from '../../../models/strapi/StrapiImage';
import StrapiLink from '../../../models/strapi/StrapiLink';
import strapiMediaUrl from '../../../utils/strapiMediaUrl';
import { Text, Heading, Flex, Box, Container } from 'boemly';
import Image from 'next/image';
import StrapiLinkButton from '../../../components/StrapiLinkButton';

export interface ContactProps {
  avatar?: StrapiImage;
  title?: string;
  text?: string;
  button?: StrapiLink;
}

export const Contact: React.FC<ContactProps> = ({
  avatar,
  title,
  text,
  button,
}: ContactProps) => (
  <Container backgroundColor="primary.100" border="none" p="8" height="full">
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      height="full"
    >
      {avatar ? (
        <Box
          position="relative"
          width="20"
          height="20"
          borderRadius="full"
          overflow="hidden"
        >
          <Image
            src={strapiMediaUrl(avatar.img, 'small')}
            alt={avatar.alt}
            fill
            objectFit={avatar.objectFit}
          />
        </Box>
      ) : (
        <></>
      )}
      {title ? (
        <Heading
          mt="6"
          size="md"
          fontWeight="500"
          textAlign="center"
          color="black"
        >
          {title}
        </Heading>
      ) : (
        <></>
      )}
      {text ? (
        <Text mt="2" size="smRegularNormal" textAlign="center">
          {text}
        </Text>
      ) : (
        <></>
      )}
      {button ? (
        <StrapiLinkButton
          mt="6"
          link={button}
          size="md"
          variant="outline"
          component="Contact"
        />
      ) : (
        <></>
      )}
    </Flex>
  </Container>
);
