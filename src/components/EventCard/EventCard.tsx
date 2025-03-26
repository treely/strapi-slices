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
import Image from 'next/image';
import StrapiLinkButton from '../StrapiLinkButton';
import {
  BowlFood,
  CalendarBlank,
  CaretDown,
  CaretRight,
  CaretUp,
  ChalkboardTeacher,
  Confetti,
  Handshake,
  Headset,
  Info,
  Laptop,
  MapPinLine,
  PersonSimpleWalk,
  ProjectorScreenChart,
  Star,
  UsersThree,
  Webcam,
} from '@phosphor-icons/react';
import getCountryFlag from '../../utils/getCountryFlag';
import { BREAKPOINT_MD_QUERY } from '../../constants/breakpoints';
import StrapiEvent, { EventType } from '../../models/strapi/StrapiEvent';
import { IntlContext } from '../ContextProvider';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import isSameDate from '../../utils/isSameDate';

export interface EventCardProps {
  event: StrapiEvent;
}

const MAX_LENGTH = 120;
const LOCATION_MAX_LENGTH = 28;

const getEventIcon = (eventType: string): JSX.Element => {
  switch (eventType) {
    case EventType.WEBINAR:
      return <Webcam size={12} />;
    case EventType.CONFERENCE:
      return <Headset size={12} />;
    case EventType.MEET_UP:
      return <UsersThree size={12} />;
    case EventType.FOREST_WALK:
      return <PersonSimpleWalk size={12} />;
    case EventType.PARTNER_EVENT:
      return <Handshake size={12} />;
    case EventType.LUNCH_AND_LEARN:
      return <BowlFood size={12} />;
    case EventType.FAIR:
      return <ChalkboardTeacher size={12} />;
    case EventType.FESTIVAL:
      return <Confetti size={12} />;
    case EventType.ROADSHOW:
      return <ProjectorScreenChart size={12} />;
    default:
      return <Info size={12} weight="fill" />;
  }
};

export const EventCard = ({ event }: EventCardProps): JSX.Element => {
  const { formatDate, formatNumber, formatMessage } = useContext(IntlContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobile] = useMediaQuery(BREAKPOINT_MD_QUERY);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const isLocationTooLong =
    (event.location?.length ?? 0) >= LOCATION_MAX_LENGTH;

  return (
    <Box
      borderRadius={['xl', null, null, '2xl']}
      height="full"
      width="full"
      border="1px solid var(--boemly-colors-gray-200)"
      background="white"
    >
      <Box
        position="relative"
        width="full"
        height={['32', null, null, '44']}
        borderTopRadius={['xl', null, null, '2xl']}
        css={css`
          & span,
          div,
          img {
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
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
          top={['6', null, null, '8']}
          right={['6', null, null, '8']}
          zIndex="1"
          width={['12', null, null, '16']}
          height={['12', null, null, '16']}
        >
          <Image
            src={strapiMediaUrl(event.logo.img, 'medium')}
            alt={event.logo.alt}
            fill
            style={{
              objectFit: event.logo.objectFit || 'contain',
              borderRadius: 'var(--boemly-radii-md)',
              border:
                '1px solid, var(--whiteAlpha-700, rgba(255, 255, 255, 0.64))',
            }}
          />
        </Box>
      </Box>
      <Flex
        flexDir="column"
        p={['6', null, null, '8']}
        h="calc(var(--boemly-sizes-full) - var(--boemly-sizes-44))"
      >
        <Flex flexDir="row" mb="4" gap="2" flexWrap="wrap">
          {event.recommended ? (
            <Flex mb={['2', null, null, '0']}>
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
                  {formatMessage({
                    id: `sections.eventCard.eventType.${e.eventType
                      .toLowerCase()
                      .replace(/\s+/g, '')}`,
                  })}
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
          gap={isLocationTooLong ? '2' : ['2', null, null, '6']}
          alignItems={mobile || isLocationTooLong ? 'flex-start' : 'center'}
          my="4"
          flexDir={mobile || isLocationTooLong ? 'column' : 'row'}
        >
          {event.online && (
            <Flex gap="2" alignItems="center">
              <Laptop size={20} color={'var(--boemly-colors-primary-700)'} />
              <Text size={['xsLowBold', null, null, 'smLowBold']}>Online</Text>
            </Flex>
          )}
          {event.location && (
            <Flex gap="2" alignItems="center">
              <MapPinLine
                size={20}
                color={'var(--boemly-colors-primary-700)'}
                weight="fill"
              />
              <Text size={['xsLowBold', null, null, 'smLowBold']}>
                {event.location}
              </Text>
            </Flex>
          )}
          <Flex alignItems="center" gap="2">
            <CalendarBlank
              size={20}
              color={'var(--boemly-colors-primary-700)'}
            />
            <Text size={['xsLowBold', null, null, 'smLowBold']}>
              {formatDate(event.start, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}

              {!event.allDay &&
                ` | ${formatNumber(new Date(event.start).getUTCHours(), {
                  minimumIntegerDigits: 2,
                })}:${formatNumber(new Date(event.start).getUTCMinutes(), {
                  minimumIntegerDigits: 2,
                })}`}

              {event.end &&
                !isSameDate(new Date(event.start), new Date(event.end)) && (
                  <>
                    {' - '}
                    {formatDate(event.end, {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}

                    {!event.allDay &&
                      ` | ${formatNumber(new Date(event.end).getUTCHours(), {
                        minimumIntegerDigits: 2,
                      })}:${formatNumber(new Date(event.end).getUTCMinutes(), {
                        minimumIntegerDigits: 2,
                      })}`}
                  </>
                )}

              {event.end &&
                !event.allDay &&
                isSameDate(new Date(event.start), new Date(event.end)) &&
                ` - ${formatNumber(new Date(event.end).getUTCHours(), {
                  minimumIntegerDigits: 2,
                })}:${formatNumber(new Date(event.end).getUTCMinutes(), {
                  minimumIntegerDigits: 2,
                })}`}
            </Text>
          </Flex>
        </Flex>
        <Text
          mb={mobile ? '0' : '7'}
          size={['xsRegularNormal', null, null, 'smRegularNormal']}
        >
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
          justifyContent={mobile ? undefined : 'space-between'}
          flexDir={mobile ? 'column-reverse' : 'row'}
          gap={mobile ? '4' : '0'}
        >
          {event.button && (
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
          )}
          {event.speakers && event.speakers.length > 0 && (
            <Flex flexDir="row" gap="2">
              {event.speakers.map((speaker) => (
                <Box key={speaker.id}>
                  <Box
                    width={['10', null, null, '12']}
                    height={['10', null, null, '12']}
                    position="relative"
                    borderRadius="2xl"
                  >
                    <Tooltip label={speaker.name}>
                      <Image
                        src={strapiMediaUrl(speaker.image.img, 'medium')}
                        alt={speaker.image.alt}
                        fill
                        style={{
                          objectFit: speaker.image.objectFit || 'cover',
                          borderRadius: 'var(--boemly-radii-md)',
                          border:
                            '1px solid, var(--whiteAlpha-700, rgba(255, 255, 255, 0.64))',
                        }}
                      />
                    </Tooltip>
                  </Box>
                </Box>
              ))}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
