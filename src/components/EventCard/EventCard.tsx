import React, { useContext, useState } from 'react';
import {
  Text,
  Box,
  Flex,
  Heading,
  Tooltip,
  Tag,
  useMediaQuery,
  Button,
} from 'boemly';
import { css } from '@emotion/react';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import Image from 'next/image';
import StrapiLinkButton from '../StrapiLinkButton';
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
import StrapiEvent from '../../models/strapi/StrapiEvent';

export interface EventCardProps {
  event: StrapiEvent;
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
export const EventCard = ({ event }: EventCardProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { formatMessage } = useContext(IntlContext);
  const [mobile] = useMediaQuery(BREAKPOINT_MD_QUERY);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const getTime = (date: Date, action: () => number): string => {
    const value = action.call(date);
    return value < 10 ? `0${value}` : value.toString();
  };

  return (
    <Box
      borderRadius="2xl"
      h="full"
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
          src={strapiMediaUrl(event.image?.img, 'medium')}
          alt={event.image?.alt}
          fill
          style={{
            objectFit: event.image?.objectFit || 'cover',
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
            src={strapiMediaUrl(event.logo.img, 'medium')}
            alt={event.logo.alt}
            fill
            style={{
              objectFit: event.logo.objectFit || 'contain',
              borderRadius: '6px',
            }}
          />
        </Box>
      </Box>
      <Flex
        flexDir="column"
        p="8"
        h="calc(var(--boemly-sizes-full) - var(--boemly-sizes-44))"
      >
        <Flex flexDir="row" mb="4" gap="2" flexWrap="wrap">
          {event.recommended ? (
            <Flex>
              <Tag backgroundColor="green.600">
                <Star size={12} weight="fill" color="white" />
                &nbsp;
                <Text size="xsLowBold" color="white">
                  {formatMessage({
                    id: 'sections.eventCard.recommendedEvent',
                  })}
                </Text>
              </Tag>
            </Flex>
          ) : (
            <></>
          )}
          <Flex flexWrap="wrap" gap="2">
            {event.eventTypes.map((e) => (
              <Tag key={e.id}>
                {getEventIcon(e.eventType)}&nbsp;
                <Text size="xsLowBold" color="gray.800">
                  {e.eventType}
                </Text>
              </Tag>
            ))}
            {event.languages.map(({ id, language, countryCode }) => (
              <Tag key={id}>
                {getCountryFlag(countryCode)}&nbsp;
                <Text size="xsLowBold" color="gray.800">
                  {language}
                </Text>
              </Tag>
            ))}
          </Flex>
        </Flex>
        <Heading>{event.title}</Heading>
        <Flex
          gap="6"
          alignItems={mobile ? 'flex-start' : 'center'}
          my="4"
          flexDir={mobile ? 'column' : 'row'}
        >
          {event.online && (
            <Flex gap="2" alignItems="center">
              <Laptop size={20} color={'var(--boemly-colors-primary-700)'} />
              <Text size="smLowBold">Online</Text>
            </Flex>
          )}
          {!event.online && event.location && (
            <Flex gap="2" alignItems="center">
              <MapPinArea
                size={20}
                color={'var(--boemly-colors-primary-700)'}
                weight="fill"
              />
              <Text size="smLowBold">{event.location}</Text>
            </Flex>
          )}
          <Flex alignItems="center" gap="2">
            <CalendarDots
              size={20}
              color={'var(--boemly-colors-primary-700)'}
            />
            <Text size="smLowBold">
              {/* TODO: solve this: how to enter strat and end in strapi */}
              {event.start.toLocaleDateString()} |{' '}
              {getTime(event.start, event.start.getHours)}:
              {getTime(event.start, event.start.getMinutes)} -&nbsp;
              {getTime(event.end, event.end.getHours)}:
              {getTime(event.end, event.end.getMinutes)}
            </Text>
          </Flex>
        </Flex>
        <Text mb={mobile ? '0' : '7'}>
          {isExpanded || !mobile
            ? event.description
            : `${event.description.substring(0, MAX_LENGTH)}...`}
        </Text>
        {event.description.length > MAX_LENGTH && mobile && (
          <Flex justifyContent="flex-start">
            <Button
              mt="2"
              onClick={toggleText}
              variant="link"
              rightIcon={
                isExpanded ? <CaretUp size="12" /> : <CaretDown size="12" />
              }
            >
              {formatMessage(
                isExpanded
                  ? {
                      id: 'sections.eventCard.buttonShowLess',
                    }
                  : { id: 'sections.eventCard.buttonShowMore' }
              )}
            </Button>
          </Flex>
        )}
        <Flex
          mt={mobile ? '7' : 'auto'}
          justifyContent={mobile ? 'undefined' : 'space-between'}
          flexDir={mobile ? 'column-reverse' : 'row'}
          gap={mobile ? '4' : '0'}
        >
          <Flex width={mobile ? 'full' : 'auto'}>
            <StrapiLinkButton
              key={event.button.id}
              size="md"
              variant={event.buttonVariant}
              link={event.button}
              rightIcon={<CaretRight size="10" />}
              width="full"
            />
          </Flex>
          <Flex flexDir="row" gap="2">
            {event.speakers.map((speaker) => (
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
  );
};
