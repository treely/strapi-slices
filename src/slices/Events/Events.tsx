import {
  DefaultSectionContainer,
  Wrapper,
  Spacer,
  DefaultSectionHeader,
  SimpleGrid,
  Box,
  Button,
  Flex,
  Center,
  Text,
  BoemlyTag,
  Select,
} from 'boemly';

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import EventCard from '../../components/EventCard';
import { SWRInfiniteKeyLoader } from 'swr/infinite';
import useEvents from '../../models/hooks/useEvents';
import { STRAPI_URI } from '../../constants/strapi';
import { IntlContext } from '../../components/ContextProvider';
import { mutate } from 'swr/_internal';
import { EventType } from '@testing-library/react';
import StrapiEvent from '../../models/strapi/StrapiEvent';
import IStrapiData from '../../models/strapi/IStrapiData';

const UPCOMING_BATCH_SIZE = 6;
const PAST_BATCH_SIZE = 2;

interface FiltersProps {
  eventTypes: EventType[];
  languages: {
    id: number;
    language: string;
    countryCode: string;
  }[];
}

export interface EventsProps {
  slice: {
    upcomingTitle?: string;
    upcomingDescription?: string;
    pastTitle: string;
    pastDescription?: string;
    filterSearch?: boolean;
  };
}

const enum Sort {
  NEWEST_FIRST = 'newest',
  OLDEST_FIRST = 'oldest',
}

export const Events: React.FC<EventsProps> = ({ slice }: EventsProps) => {
  const { formatMessage, locale } = useContext(IntlContext);
  const [eventTypeFilter, setEventTypeFilter] = useState([] as string[]);
  const [languageFilter, setLanguageFilter] = useState([] as string[]);
  const [sort, setSort] = useState([Sort.NEWEST_FIRST] as string[]);

  const now = new Date().toISOString();

  const buildEventsUrl = (
    index: any,
    batchSize: number,
    startFilter: string
  ) => {
    const url = new URL(`/treely-events`, STRAPI_URI);
    url.searchParams.append(
      'pagination[start]',
      (index * batchSize).toString()
    );
    url.searchParams.append('pagination[limit]', batchSize.toString());
    url.searchParams.append(startFilter, now);
    url.searchParams.append('locale', locale);
    url.searchParams.append('populate', 'deep,6');

    if (sort[0] === Sort.OLDEST_FIRST) {
      url.searchParams.append('sort', 'start:asc');
    } else {
      url.searchParams.append('sort', 'start:desc');
    }

    if (languageFilter.length || eventTypeFilter.length) {
      [...languageFilter, ...eventTypeFilter].forEach((filter, i) => {
        const filterKey =
          i < languageFilter.length ? 'languages' : 'eventTypes';
        url.searchParams.append(
          `filters[$and][${i}][${filterKey}][${filterKey.slice(0, -1)}]`,
          filter
        );
      });
    }
    return `/treely-events` + url.search;
  };

  const getUpcomingKey: SWRInfiniteKeyLoader = useCallback(
    (index) =>
      buildEventsUrl(index, UPCOMING_BATCH_SIZE, 'filters[start][$gte]'),
    [eventTypeFilter, languageFilter, sort]
  );

  const getPastKey: SWRInfiniteKeyLoader = useCallback(
    (index) => buildEventsUrl(index, PAST_BATCH_SIZE, 'filters[start][$lt]'),
    [eventTypeFilter, languageFilter, sort]
  );

  const {
    data: upcomingData,
    isLoading: isLoadingUpcoming,
    isLoadingMore: isLoadingMoreUpcoming,
    canLoadMore: canLoadMoreUpcoming,
    loadMore: loadMoreUpcoming,
  } = useEvents({ getKey: getUpcomingKey, batchSize: UPCOMING_BATCH_SIZE });

  const {
    data: pastData,
    isLoading: isLoadingPast,
    isLoadingMore: isLoadingMorePast,
    canLoadMore: canLoadMorePast,
    loadMore: loadMorePast,
  } = useEvents({ getKey: getPastKey, batchSize: PAST_BATCH_SIZE });

  const processEvents = (data: any) => {
    return (
      data?.flatMap((d: any) => d?.body?.data)?.filter((t: any) => !!t) || []
    );
  };
  // Process upcoming events
  const upcomingEvents = useMemo(() => {
    return processEvents(upcomingData);
  }, [upcomingData]);

  // Process past events
  const pastEvents = useMemo(() => {
    return processEvents(pastData);
  }, [pastData]);

  const combinedEvents = useMemo(() => {
    return upcomingEvents.concat(pastEvents);
  }, [upcomingEvents, pastEvents]);

  const getOptions = (items: any[], key: string, selectedFilters: string[]) => {
    const uniqueValues = new Set<string>();

    const options = items
      .flatMap((card) =>
        card.attributes[key].map((item: any) => ({
          value: item[key.slice(0, -1)],
          label: item[key.slice(0, -1)],
        }))
      )
      .filter((option) => {
        if (uniqueValues.has(option.value)) return false;
        uniqueValues.add(option.value);
        return true;
      });

    return options.concat(
      selectedFilters
        .filter((selected) => !uniqueValues.has(selected))
        .map((selected) => ({ value: selected, label: selected }))
    );
  };

  const eventTypeOptions = useMemo(() => {
    return getOptions(combinedEvents, 'eventTypes', eventTypeFilter);
  }, [combinedEvents]);

  const languageOptions = useMemo(() => {
    return getOptions(combinedEvents, 'languages', languageFilter);
  }, [combinedEvents]);

  const removeFilter = (
    filterType: keyof FiltersProps,
    valueToRemove: string
  ) => {
    if (filterType === 'eventTypes') {
      setEventTypeFilter((prev) =>
        prev.filter((item) => item !== valueToRemove)
      );
    } else if (filterType === 'languages') {
      setLanguageFilter((prev) =>
        prev.filter((item) => item !== valueToRemove)
      );
    }
  };

  useEffect(() => {
    mutate(getUpcomingKey);
  }, [eventTypeFilter, languageFilter, sort]);

  return (
    <DefaultSectionContainer>
      <Wrapper>
        {slice.upcomingTitle ? (
          <>
            <DefaultSectionHeader
              title={slice.upcomingTitle}
              text={slice.upcomingDescription}
            />
            <Spacer h="10" />
          </>
        ) : (
          <></>
        )}
        {slice.filterSearch && (upcomingEvents || pastEvents) ? (
          <>
            <Flex
              justifyContent="space-between"
              direction={['column-reverse', null, null, 'row']}
              alignItems="baseline"
              gap="4"
            >
              <Flex
                direction="column"
                width="full"
                justifyContent="start"
                gap="4"
              >
                {/* Filter section */}
                <Flex
                  direction={['column', null, null, 'row']}
                  gap="4"
                  justifyContent="start"
                >
                  <Box position="relative" width={['full', null, null, '56']}>
                    <Select
                      isMultiple={true}
                      isSearchable={true}
                      id="eventTypeFilter"
                      size="md"
                      placeholder={formatMessage({
                        id: 'sections.events.eventsFilter.eventType',
                      })}
                      searchPlaceholder={formatMessage({
                        id: 'sections.events.eventsFilter.searchPlaceholder',
                      })}
                      options={eventTypeOptions}
                      value={eventTypeFilter ?? []}
                      onChange={(selected: string[]) => {
                        setEventTypeFilter(selected);
                      }}
                    />
                  </Box>
                  <Box position="relative" width={['full', null, null, '56']}>
                    <Select
                      isMultiple={true}
                      isSearchable={true}
                      id="languageFilter"
                      size="md"
                      placeholder={formatMessage({
                        id: 'sections.events.eventsFilter.language',
                      })}
                      searchPlaceholder={formatMessage({
                        id: 'sections.events.eventsFilter.searchPlaceholder',
                      })}
                      options={languageOptions}
                      value={languageFilter ?? []}
                      onChange={(selected: string[]) => {
                        setLanguageFilter(selected);
                      }}
                    />
                  </Box>
                </Flex>

                {/* Filter Tags */}
                <Box display="flex" flexWrap="wrap" minHeight="6" gap="2">
                  {eventTypeFilter.map((eventType) => {
                    const event = eventTypeOptions.find(
                      (option) => option.value === eventType
                    );
                    return (
                      <BoemlyTag
                        key={eventType}
                        isClosable={true}
                        onClose={() => removeFilter('eventTypes', eventType)}
                      >
                        {event?.label}
                      </BoemlyTag>
                    );
                  })}

                  {languageFilter.map((singleLanguage) => {
                    const language = languageOptions.find(
                      (option) => option.value === singleLanguage
                    );
                    return (
                      <BoemlyTag
                        key={singleLanguage}
                        isClosable={true}
                        onClose={() =>
                          removeFilter('languages', singleLanguage)
                        }
                      >
                        {language?.label}
                      </BoemlyTag>
                    );
                  })}
                </Box>
              </Flex>
              {/* Sort Section */}
              <Box display="flex" gap="1px" width="52" alignItems="center">
                <Text size="smLowNormal" color="black" width="20">
                  Sort by:
                </Text>
                <Select
                  isMultiple={false}
                  borderColor="white"
                  value={[sort[0]]}
                  placeholder={sort[0]}
                  onChange={(selected: string[]) => setSort(selected)}
                  options={[
                    {
                      label: formatMessage({
                        id: `sections.events.eventsFilter.sortBy.${Sort.NEWEST_FIRST}`,
                      }),
                      value: Sort.NEWEST_FIRST,
                    },
                    {
                      label: formatMessage({
                        id: `sections.events.eventsFilter.sortBy.${Sort.OLDEST_FIRST}`,
                      }),
                      value: Sort.OLDEST_FIRST,
                    },
                  ]}
                />
              </Box>
            </Flex>

            <Spacer h={['8', null, null, '16']} />
          </>
        ) : (
          <></>
        )}

        {(!upcomingEvents || upcomingEvents.length === 0) &&
        !isLoadingUpcoming ? (
          <Center>
            {formatMessage({ id: 'sections.events.noUpcomingEvents' })}
          </Center>
        ) : (
          // List of upcoming events
          <SimpleGrid
            columns={[1, null, null, null, null, 2]}
            spacingX="6"
            gap="6"
            flexShrink="0"
            mb={['10', null, null, '20']}
            placeItems="center"
          >
            {upcomingEvents.map((event: IStrapiData<StrapiEvent>) => (
              <Box
                key={event.id}
                width="full"
                height={['full', null, null, 'xl']}
              >
                <EventCard event={event.attributes} />
              </Box>
            ))}
          </SimpleGrid>
        )}
        <Flex justifyContent="center">
          {!isLoadingUpcoming && canLoadMoreUpcoming && (
            <Button
              onClick={() => {
                loadMoreUpcoming();
              }}
              variant="solid"
              isLoading={isLoadingMoreUpcoming}
            >
              {formatMessage({ id: 'sections.events.loadMore' })}
            </Button>
          )}
        </Flex>
      </Wrapper>

      <Spacer h={['10', null, null, '28']} />

      <Box background="primary.50" pt={['8', null, null, '24']}>
        <Wrapper>
          <DefaultSectionHeader
            title={slice.pastTitle}
            text={slice.pastDescription}
          />

          <Spacer h="10" />

          {(!pastEvents || pastEvents.length === 0) && !isLoadingPast ? (
            <>
              <Center>
                {formatMessage({ id: 'sections.events.noPastEvents' })}
              </Center>
              <Spacer h="24" />
            </>
          ) : (
            // List of past events
            <SimpleGrid
              columns={[1, null, null, null, null, 2]}
              spacingX="6"
              gap="6"
              flexShrink="0"
              placeItems="center"
              mb={['10', null, null, '20']}
            >
              {pastEvents.map((event: IStrapiData<StrapiEvent>) => (
                <Box
                  key={event.id}
                  height={['full', null, null, 'xl']}
                  width="full"
                >
                  <EventCard event={event.attributes} />
                </Box>
              ))}
            </SimpleGrid>
          )}
          <Flex justifyContent="center">
            {!isLoadingPast && canLoadMorePast && (
              <Button
                mb="20"
                onClick={() => {
                  loadMorePast();
                }}
                variant="solid"
                isLoading={isLoadingMorePast}
              >
                {formatMessage({ id: 'sections.events.loadMore' })}
              </Button>
            )}
          </Flex>
        </Wrapper>
      </Box>
    </DefaultSectionContainer>
  );
};
