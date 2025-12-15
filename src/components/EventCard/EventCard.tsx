import React, { useContext, useState } from 'react';
import {
  Text,
  Box,
  Flex,
  Heading,
  Tooltip,
  useMediaQuery,
  Button,
  BoemlyTag,
} from 'boemly';
import Image from 'next/image';
import StrapiLinkButton from '../StrapiLinkButton';
import {
  BowlFoodIcon,
  CalendarBlankIcon,
  CaretDownIcon,
  CaretRightIcon,
  CaretUpIcon,
  ChalkboardTeacherIcon,
  ConfettiIcon,
  HandshakeIcon,
  HeadsetIcon,
  InfoIcon,
  LaptopIcon,
  MapPinLineIcon,
  PersonSimpleWalkIcon,
  ProjectorScreenChartIcon,
  StarIcon,
  UsersThreeIcon,
  WebcamIcon,
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

const getEventIcon = (eventType: string): React.JSX.Element => {
  switch (eventType) {
    case EventType.WEBINAR:
      return <WebcamIcon size={12} />;
    case EventType.CONFERENCE:
      return <HeadsetIcon size={12} />;
    case EventType.MEET_UP:
      return <UsersThreeIcon size={12} />;
    case EventType.FOREST_WALK:
      return <PersonSimpleWalkIcon size={12} />;
    case EventType.PARTNER_EVENT:
      return <HandshakeIcon size={12} />;
    case EventType.LUNCH_AND_LEARN:
      return <BowlFoodIcon size={12} />;
    case EventType.FAIR:
      return <ChalkboardTeacherIcon size={12} />;
    case EventType.FESTIVAL:
      return <ConfettiIcon size={12} />;
    case EventType.ROADSHOW:
      return <ProjectorScreenChartIcon size={12} />;
    default:
      return <InfoIcon size={12} weight="fill" />;
  }
};

export const EventCard = ({ event }: EventCardProps): React.JSX.Element => {
  const { formatDate, formatNumber, formatMessage } = useContext(IntlContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobile] = useMediaQuery([BREAKPOINT_MD_QUERY]);

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
        css={{
          '& span, div, img': {
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit',
          },
        }}
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
              <BoemlyTag backgroundColor="green.600">
                <Flex alignItems="center" gap="1" whiteSpace="nowrap">
                  <StarIcon size={12} weight="fill" color="white" />
                  <Text size="xsLowBold" color="white">
                    {formatMessage({
                      id: 'sections.eventCard.recommendedEvent',
                    })}
                  </Text>
                </Flex>
              </BoemlyTag>
            </Flex>
          ) : (
            <></>
          )}
          <Flex flexWrap="wrap" gap="2">
            {event.eventTypes.map((e) => (
              <BoemlyTag key={e.id}>
                <Flex alignItems="center" gap="1" whiteSpace="nowrap">
                  {getEventIcon(e.eventType)}
                  <Text size="xsLowBold" color="gray.800">
                    {formatMessage({
                      id: `sections.eventCard.eventType.${e.eventType
                        .toLowerCase()
                        .replace(/\s+/g, '')}`,
                    })}
                  </Text>
                </Flex>
              </BoemlyTag>
            ))}
            {event.languages.map(({ id, language, countryCode }) => (
              <BoemlyTag key={id}>
                <Flex alignItems="center" gap="1" whiteSpace="nowrap">
                  {getCountryFlag(countryCode)}
                  <Text size="xsLowBold" color="gray.800">
                    {language}
                  </Text>
                </Flex>
              </BoemlyTag>
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
              <LaptopIcon
                size={20}
                color={'var(--boemly-colors-primary-700)'}
              />
              <Text size={mobile ? 'xsLowBold' : 'smLowBold'}>Online</Text>
            </Flex>
          )}
          {event.location && (
            <Flex gap="2" alignItems="center">
              <MapPinLineIcon
                size={20}
                color={'var(--boemly-colors-primary-700)'}
                weight="fill"
              />
              <Text size={mobile ? 'xsLowBold' : 'smLowBold'}>
                {event.location}
              </Text>
            </Flex>
          )}
          <Flex alignItems="center" gap="2">
            <CalendarBlankIcon
              size={20}
              color={'var(--boemly-colors-primary-700)'}
            />
            <Text size={mobile ? 'xsLowBold' : 'smLowBold'}>
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
          size={mobile ? 'xsRegularNormal' : 'smRegularNormal'}
        >
          {isExpanded || !mobile
            ? event.description
            : `${event.description.substring(0, MAX_LENGTH)}...`}
        </Text>
        {event.description.length > MAX_LENGTH && mobile && (
          <Flex justifyContent="flex-start">
            <Button mt="2" onClick={toggleText} variant="link">
              {formatMessage(
                isExpanded
                  ? {
                      id: 'sections.eventCard.buttonShowLess',
                    }
                  : { id: 'sections.eventCard.buttonShowMore' }
              )}
              {isExpanded ? (
                <CaretUpIcon size="12" />
              ) : (
                <CaretDownIcon size="12" />
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
                rightIcon={<CaretRightIcon size="10" />}
                width="full"
                component="EventCard"
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
                    <Tooltip content={speaker.name}>
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
