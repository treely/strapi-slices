import React from 'react';
import {
  DefaultSectionContainer,
  DefaultSectionHeader,
  Text,
  Box,
  Flex,
  Spacer,
  Heading,
  Wrapper,
  SimpleGrid,
  Tooltip,
  Tag,
} from 'boemly';
import { css } from '@emotion/react';
import StrapiImage from '../../models/strapi/StrapiImage';
import StrapiLink from '../../models/strapi/StrapiLink';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import Image from 'next/image';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import {
  BowlFood,
  CalendarDots,
  CaretRight,
  ChalkboardTeacher,
  Confetti,
  Handshake,
  Headset,
  Info,
  MapPinArea,
  PersonSimpleWalk,
  ProjectorScreenChart,
  UsersThree,
  VideoConference,
} from '@phosphor-icons/react';
import getCountryFlag from '../../utils/getCountryFlag';

// TODO: fetCountryFlag - change the emogi style - only possible using api
// TODO: add test
// TODO: check the storybook File
// TODO: add logo on the image
// TODO: add comment in github for the npm and node versions compatibility
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
      languageCountryCode: string;
      location: string;
      start: Date;
      end: Date;
      title: string;
      text: string;
      button: StrapiLink;
      speakers: {
        id: number;
        caption: string;
        img: StrapiImage;
      }[];
    }[];
  };
}
const getEventIcon = (eventType: string): JSX.Element => {
  switch (eventType) {
    case 'Webinar':
      return <VideoConference size={12} />;
    case 'Conference':
      return <Headset size={12} />;
    case 'Meet Up':
      return <UsersThree size={12} />;
    case 'Forest Walk':
      return <PersonSimpleWalk size={12} />;
    case 'Partner Event':
      return <Handshake size={12} />;
    case 'Lunch & Learn':
      return <BowlFood size={12} />;
    case 'Fair':
      return <ChalkboardTeacher size={12} />;
    case 'Festival':
      return <Confetti size={12} />;
    case 'Roadshow':
      return <ProjectorScreenChart size={12} />;
    default:
      return <Info size={12} weight="fill" />;
  }
};

export const EventCards = ({ slice }: EventCardsProps): JSX.Element => {
  const getTime = (date: Date, action: () => number): string => {
    const value = action.call(date);
    return value < 10 ? `0${value}` : value.toString();
  };

  return (
    <DefaultSectionContainer>
      <Wrapper>
        {slice.title ? (
          <>
            <DefaultSectionHeader
              titleProps={{
                textAlign: 'center',
              }}
              taglineProps={{ textAlign: 'center' }}
              title={slice.title}
              tagline={slice.tagline}
            />
            <Spacer h="8" />
          </>
        ) : (
          <></>
        )}
        <SimpleGrid
          columns={[1, null, null, null, null, 2]}
          spacingX="8"
          gap="6"
          flexShrink="0"
          placeItems="center"
        >
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
              <Box
                position="relative"
                top="-36"
                borderTopRightRadius="full"
                width="16"
                height="16"
                // TODO: add the right position for the mobile
                right={['-250px', '-580px', '-490px']}
                //  right={['-580px', null, '-800px', null, '24']}
                // right={['-16', null, '24']}
              >
                <Image
                  src={strapiMediaUrl(card.logo.img, 'medium')}
                  alt={card.logo.alt}
                  fill
                  style={{
                    objectFit: card.logo.objectFit || 'contain',
                    //  borderTopRightRadius: 'var(--boemly-radii-full)',
                  }}
                />
              </Box>

              <Flex flexDir="column" p="8">
                <Flex flexDir="row" mb="4" gap="2">
                  <Tag>
                    {getEventIcon(card.eventType)}&nbsp;
                    <Text size="xsLowBold" color="gray.800">
                      {card.eventType}
                    </Text>
                  </Tag>
                  <Tag>
                    {getCountryFlag(card.languageCountryCode)}&nbsp;
                    <Text size="xsLowBold" color="gray.800">
                      {card.language}
                    </Text>
                  </Tag>
                </Flex>
                <Heading>{card.title}</Heading>
                <Flex gap="6" alignItems="center" my="4">
                  <Flex gap="2" alignItems="center">
                    <MapPinArea
                      size={20}
                      color={'var(--boemly-colors-primary-700)'}
                      weight="fill"
                    />
                    <Text size="smLowBold">{card.location}</Text>
                  </Flex>
                  <Flex alignItems="center" gap="2">
                    <CalendarDots
                      size={20}
                      color={'var(--boemly-colors-primary-700)'}
                    />
                    <Text size="smLowBold">
                      {card.start.toLocaleDateString()} |{' '}
                      {getTime(card.start, card.start.getHours)}:
                      {getTime(card.start, card.start.getMinutes)} -
                      {getTime(card.end, card.end.getHours)}:
                      {getTime(card.end, card.end.getMinutes)}
                    </Text>
                  </Flex>
                </Flex>
                <Text>{card.text}</Text>
                <Flex mt="7" justifyContent="space-between">
                  <Box textAlign="center">
                    <StrapiLinkButton
                      key={card.button.id}
                      size="md"
                      variant="outline"
                      link={card.button}
                      rightIcon={<CaretRight size="10" />}
                    />
                  </Box>
                  <Flex flexDir="row" gap="2">
                    {card.speakers.map((speaker) => (
                      <Box key={speaker.id}>
                        <Box
                          width="12"
                          height="12"
                          position="relative"
                          borderRadius="2xl"
                        >
                          <Tooltip label={speaker.caption}>
                            <Image
                              src={strapiMediaUrl(speaker.img.img, 'medium')}
                              alt={speaker.img.alt}
                              fill
                              style={{
                                objectFit: speaker.img.objectFit || 'cover',
                                borderRadius: 'var(--boemly-radii-md)',
                              }}
                            />
                          </Tooltip>
                        </Box>
                      </Box>
                    ))}
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
