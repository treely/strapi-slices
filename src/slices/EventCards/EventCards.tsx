import React from 'react';
import {
  DefaultSectionContainer,
  DefaultSectionHeader,
  Text,
  Box,
  Flex,
  Badge,
  Spacer,
  Heading,
} from 'boemly';
import { css } from '@emotion/react';
import StrapiImage from '../../models/strapi/StrapiImage';
import StrapiLink from '../../models/strapi/StrapiLink';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import Image from 'next/image';
import StrapiLinkButton from '../../components/StrapiLinkButton';

// TODO: add test
// TODO: check the stprubook File
interface EventCardsProps {
  slice: {
    title?: string;
    tagline?: string;
    eventCards: {
      id: number;
      image: StrapiImage;
      logo: StrapiImage;
      eventType: string;
      language: string;
      location: string;
      date: Date;
      time: string;
      title: string;
      text: string;
      button: StrapiLink;
      speakers: {
        id: number;
        name: string;
        image: StrapiImage;
      }[];
    }[];
  };
}

export const EventCards = ({ slice }: EventCardsProps): JSX.Element => {
  return (
    <DefaultSectionContainer>
      {slice.title ? (
        <>
          <DefaultSectionHeader
            titleProps={{
              textAlign: 'center',
              maxWidth: '3xl',
            }}
            taglineProps={{ textAlign: 'center', maxWidth: '3xl' }}
            title={slice.title}
            tagline={slice.tagline}
          />
          <Spacer h="8" />
        </>
      ) : (
        <></>
      )}
      <Flex
        flexDir={['column', null, null, null, 'row']}
        gap="6"
        my="auto"
        justifyContent="center"
      >
        {/* TODO: the cards should be centered, when there is only one card in a row */}
        {slice.eventCards.map((card) => (
          <Box
            key={card.id}
            borderRadius="2xl"
            maxWidth="2xl"
            border="1px solid var(--boemly-colors-gray-200)"
          >
            <Box
              position="relative"
              width="full"
              height="44"
              borderTopRadius="3xl"
              css={css`
                & span,
                div,
                img {
                  border-top-left-radius: var(--boemly-radii-3xl);
                  border-top-right-radius: var(--boemly-radii-3xl);
                }
              `}
            >
              <Image
                src={strapiMediaUrl(card.image?.img, 'medium')}
                alt={card.image?.alt}
                fill
                style={{
                  objectFit: card.image?.objectFit || 'cover',
                }}
              />
            </Box>

            <Flex flexDir="column" p="8">
              <Flex flexDir="row" mb="4">
                {/* TODO: add icons for enetType */}
                {/* TODO: add flag to the language */}
                <Badge>{card.eventType}</Badge>
                <Badge>{card.language}</Badge>
              </Flex>
              <Heading>{card.title}</Heading>
              <Flex gap="4">
                {/* TODO: check the spaces from her down */}
                {/* TODO: add icon to loaction and date */}
                {/* TODO: fix the data format */}
                <Text>{card.location}</Text>
                <Text>
                  {card.date.toDateString()} | {card.time}
                </Text>
              </Flex>
              <Text>{card.text}</Text>
              <Flex>
                <Box textAlign="center">
                  <StrapiLinkButton
                    key={card.button.id}
                    size="md"
                    variant="outline"
                    link={card.button}
                  />
                </Box>
                <Box>
                  {card.speakers.map((speaker) => (
                    <Box key={speaker.id}>
                      {/* TODO: add image to the speaker */}
                      {/* TODO: add arrow to the button */}
                      {/* <Image
                        src={strapiMediaUrl(speaker.image?.img, 'medium')}
                        alt={speaker.image?.alt}
                        fill
                        style={{
                          objectFit: speaker.image?.objectFit || 'cover',
                          borderRadius: 'var(--boemly-radii-xl)',
                        }}
                      /> */}
                      <Text>{speaker.name}</Text>
                    </Box>
                  ))}
                </Box>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Flex>
    </DefaultSectionContainer>
  );
};

// {slice.eventCards.map((eventCard: any) => (
//     <Box key={eventCard.id}>
//       <Image
//         src={strapiMediaUrl(eventCard.image?.img, 'medium')}
//         alt={eventCard.image?.alt}
//         fill
//         style={{
//           objectFit: eventCard.image?.objectFit || 'cover',
//           borderRadius: 'var(--boemly-radii-xl)',
//         }}
//       />
//       {eventCard.logo}
//     </Box>
//   ))}
