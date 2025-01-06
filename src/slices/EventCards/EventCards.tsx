import React, { useContext, useState } from 'react';
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
  useMediaQuery,
  Button,
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
  CaretDown,
  CaretRight,
  CaretUp,
  ChalkboardTeacher,
  Confetti,
  Handshake,
  Headset,
  Info,
  Laptop,
  MapPinArea,
  PersonSimpleWalk,
  ProjectorScreenChart,
  Star,
  UsersThree,
  VideoConference,
} from '@phosphor-icons/react';
import getCountryFlag from '../../utils/getCountryFlag';
import { BREAKPOINT_MD_QUERY } from '../../constants/breakpoints';
import { IntlContext } from 'react-intl';

// TODO: fetCountryFlag - change the emogi style - only possible using api
// TODO: add test
// TODO: check the storybook File
// TODO: add comment in github for the npm and node versions compatibility
interface EventCardsProps {
  slice: {
    title?: string;
    tagline?: string;
    filterSearch?: boolean;
    eventCards: {
      id: number;
      image: StrapiImage;
      logo: StrapiImage;
      eventType: string;
      language: string;
      languageCountryCode: string;
      location?: string;
      online?: boolean;
      start: Date;
      end: Date;
      title: string;
      description: string;
      button: StrapiLink;
      buttonVariant?: 'outline' | 'ghost' | 'link' | 'solid' | 'outlineWhite';
      recommended?: boolean;
      speakers: {
        id: number;
        caption: string;
        img: StrapiImage;
      }[];
    }[];
  };
}

const MAX_LENGTH = 160;

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
  const [mobile] = useMediaQuery(BREAKPOINT_MD_QUERY);
  const [isExpanded, setIsExpanded] = useState(false);
  const { formatMessage } = useContext(IntlContext);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const getTime = (date: Date, action: () => number): string => {
    const value = action.call(date);
    return value < 10 ? `0${value}` : value.toString();
  };

  // TODO: fix card height
  // TODO: zum Hoehe: ich habe in der linken Kachel testweise einen Titel mit 90 Zeichen und eine Beschreibung mit 450 Zeichen eingegeben – das würde ich auch als character-limit festlegen. Diese Höhe könnte dann theoretisch als feste Höhe festgelegt werden. Es könnte allerdings vorkommen, dass die tags (wenn die maximale Anzahl ausgewählt wurde) auf 2 Zeilen verteilt werden. In diesem Fall müsste die Kachel eigentlich noch höher sein. Das sollte aber wahrscheinlich nicht so häufig vorkommen, was denkst du ?

  return (
    <DefaultSectionContainer>
      <Wrapper>
        {mobile && slice.filterSearch ? (
          <>
            TODO: Filter search modal here
            <Spacer h="6" />
          </>
        ) : (
          <></>
        )}
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

                <Box
                  position="absolute"
                  top="8"
                  right="8"
                  zIndex="1"
                  width="16"
                  height="16"
                >
                  <Image
                    src={strapiMediaUrl(card.logo.img, 'medium')}
                    alt={card.logo.alt}
                    fill
                    style={{
                      objectFit: card.logo.objectFit || 'contain',
                      borderRadius: '6px',
                    }}
                  />
                </Box>
              </Box>
              <Flex flexDir="column" p="8">
                <Flex flexDir="row" mb="4" gap="2" flexWrap="wrap">
                  {card.recommended ? (
                    <Flex>
                      <Tag backgroundColor="green.600">
                        <Star size={12} weight="fill" color="white" />
                        &nbsp;
                        <Text size="xsLowBold" color="white">
                          {formatMessage({
                            id: 'sections.eventCards.recommendedEvent',
                          })}
                        </Text>
                      </Tag>
                    </Flex>
                  ) : (
                    <></>
                  )}
                  <Flex flexWrap="wrap" gap="2">
                    {/* TODO: allow multiple: max 2 */}
                    <Tag>
                      {getEventIcon(card.eventType)}&nbsp;
                      <Text size="xsLowBold" color="gray.800">
                        {card.eventType}
                      </Text>
                    </Tag>
                    <Tag>
                      {/* TODO: allow multiple max 2 */}
                      {/* TODO: change flag graphic */}
                      {getCountryFlag(card.languageCountryCode)}&nbsp;
                      <Text size="xsLowBold" color="gray.800">
                        {card.language}
                      </Text>
                    </Tag>
                  </Flex>
                </Flex>
                <Heading>{card.title}</Heading>
                <Flex
                  gap="6"
                  alignItems={mobile ? 'flex-start' : 'center'}
                  my="4"
                  flexDir={mobile ? 'column' : 'row'}
                >
                  {card.online && (
                    <Flex gap="2" alignItems="center">
                      <Laptop
                        size={20}
                        color={'var(--boemly-colors-primary-700)'}
                      />
                      {/* TODO: translate */}
                      <Text size="smLowBold">Online</Text>
                    </Flex>
                  )}
                  {!card.online && card.location && (
                    <Flex gap="2" alignItems="center">
                      <MapPinArea
                        size={20}
                        color={'var(--boemly-colors-primary-700)'}
                        weight="fill"
                      />
                      <Text size="smLowBold">{card.location}</Text>
                    </Flex>
                  )}
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
                <Text>
                  {isExpanded || !mobile
                    ? card.description
                    : `${card.description.substring(0, MAX_LENGTH)}...`}
                </Text>
                {card.description.length > MAX_LENGTH && mobile && (
                  <Flex justifyContent="flex-start">
                    <Button
                      mt="2"
                      onClick={toggleText}
                      variant="link"
                      rightIcon={
                        isExpanded ? (
                          <CaretUp size="12" />
                        ) : (
                          <CaretDown size="12" />
                        )
                      }
                    >
                      {formatMessage(
                        isExpanded
                          ? {
                              id: 'sections.eventCards.buttonShowLess',
                            }
                          : { id: 'sections.eventCards.buttonShowMore' }
                      )}
                    </Button>
                  </Flex>
                )}
                <Flex
                  mt="7"
                  justifyContent={mobile ? 'undefined' : 'space-between'}
                  flexDir={mobile ? 'column-reverse' : 'row'}
                  gap={mobile ? '4' : '0'}
                >
                  <Flex width={mobile ? 'full' : 'auto'}>
                    <StrapiLinkButton
                      key={card.button.id}
                      size="md"
                      variant={card.buttonVariant}
                      link={card.button}
                      rightIcon={<CaretRight size="10" />}
                      width="full"
                    />
                  </Flex>
                  <Flex flexDir="row" gap="2">
                    {card.speakers.map((speaker) => (
                      // TODO: talk to Tobi about predefined images for internal speakers -
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
