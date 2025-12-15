import React from 'react';
import Link from 'next/link';
import {
  Box,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Heading,
  SimpleGrid,
  Text,
  Wrapper,
} from 'boemly';
import { CaretRightIcon } from '@phosphor-icons/react';
import { MEDIUM_TRANSITION_DURATION } from '../../constants/animations';
import strapiLinkUrl from '../../utils/strapiLinkUrl';
import StrapiLink from '../../models/strapi/StrapiLink';

interface LinkCardsGridSlice {
  tagline?: string;
  title: string;
  text?: string;
  cards: {
    id: number;
    title: string;
    text?: string;
    link: StrapiLink;
  }[];
}
export interface LinkCardsGridProps {
  slice: LinkCardsGridSlice;
}

export const LinkCardsGrid: React.FC<LinkCardsGridProps> = ({
  slice,
}: LinkCardsGridProps) => (
  <DefaultSectionContainer title={slice.title}>
    <Wrapper>
      <DefaultSectionHeader
        tagline={slice.tagline}
        title={slice.title}
        text={slice.text}
      />

      <SimpleGrid mt="16" columns={[1, null, null, null, 2]} gap="4">
        {slice.cards.map(({ id, title, text, link }) => (
          <Link key={id} href={strapiLinkUrl(link)}>
            <Box
              data-testid="link"
              px="10"
              py="8"
              borderStyle="solid"
              borderWidth="thin"
              borderColor="gray.200"
              borderRadius="2xl"
              display="flex"
              flexDir="row"
              alignItems="center"
              justifyContent="space-between"
              cursor="pointer"
              transitionDuration={`${MEDIUM_TRANSITION_DURATION}s`}
              _hover={{ backgroundColor: 'gray.50' }}
            >
              <div>
                <Heading as="h4" size="lg">
                  {title}
                </Heading>
                {text && (
                  <Text mt="2" size="smRegularNormal">
                    {text}
                  </Text>
                )}
              </div>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderStyle="solid"
                borderWidth="thin"
                borderColor="gray.200"
                borderRadius="2xl"
                height="12"
                width="12"
                minWidth="12"
                minHeight="12"
                ml="6"
                backgroundColor="white"
              >
                <CaretRightIcon />
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Wrapper>
  </DefaultSectionContainer>
);
