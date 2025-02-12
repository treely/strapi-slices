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
} from 'boemly';

import React, { useCallback, useContext, useMemo } from 'react';
import EventCard from '../../components/EventCard';
import { SWRInfiniteKeyLoader } from 'swr/infinite';
import useEvents from '../../models/hooks/useEvents';
import { STRAPI_URI } from '../../constants/strapi';
import { IntlContext } from '../../components/ContextProvider';

const UPCOMING_BATCH_SIZE = 6;
const PAST_BATCH_SIZE = 2;

export interface EventsProps {
  slice: {
    upcomingTitle?: string;
    upcomingDescription?: string;
    pastTitle: string;
    pastDescription?: string;
    filterSearch?: boolean;
  };
}

export const Events: React.FC<EventsProps> = ({ slice }: EventsProps) => {
  const { formatMessage } = useContext(IntlContext);
  const now = new Date().toISOString();

  // Separate key generators for upcoming and past events
  const getUpcomingKey: SWRInfiniteKeyLoader = useCallback((index) => {
    const url = new URL(`/treely-events`, STRAPI_URI);
    url.searchParams.append(
      'pagination[start]',
      (index * UPCOMING_BATCH_SIZE).toString()
    );
    url.searchParams.append(
      'pagination[limit]',
      UPCOMING_BATCH_SIZE.toString()
    );
    url.searchParams.append('filters[start][$gte]', now);
    url.searchParams.append('sort', 'start:asc');
    url.searchParams.append('locale', 'all');
    url.searchParams.append('populate', 'deep,6');
    // The url includes the leading slash, we need to remove in for SWR
    return url.pathname.slice(1) + url.search;
  }, []);

  const getPastKey: SWRInfiniteKeyLoader = useCallback((index) => {
    const url = new URL(`/treely-events`, STRAPI_URI);
    url.searchParams.append(
      'pagination[start]',
      (index * PAST_BATCH_SIZE).toString()
    );
    url.searchParams.append('pagination[limit]', PAST_BATCH_SIZE.toString());
    url.searchParams.append('filters[start][$lt]', now);
    url.searchParams.append('sort', 'start:desc');
    url.searchParams.append('locale', 'all');
    url.searchParams.append('populate', 'deep,6');
    // The url includes the leading slash, we need to remove in for SWR
    return url.pathname.slice(1) + url.search;
  }, []);

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

  // Process upcoming events
  const upcomingEvents = useMemo(() => {
    return (
      upcomingData?.flatMap((d: any) => d?.body?.data)?.filter((t) => !!t) || []
    );
  }, [upcomingData]);

  // Process past events
  const pastEvents = useMemo(() => {
    return (
      pastData?.flatMap((d: any) => d?.body?.data)?.filter((t) => !!t) || []
    );
  }, [pastData]);

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

        {(!upcomingEvents || upcomingEvents.length === 0) &&
        !isLoadingUpcoming ? (
          <Center>
            {formatMessage({ id: 'sections.events.noUpcomingEvents' })}
          </Center>
        ) : (
          <SimpleGrid
            columns={[1, null, null, null, null, 2]}
            spacingX="6"
            gap="6"
            flexShrink="0"
            mb={['10', null, null, '20']}
            placeItems="center"
          >
            {upcomingEvents.map((event) => (
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
            <SimpleGrid
              //     mt="8"
              columns={[1, null, null, null, null, 2]}
              spacingX="6"
              gap="6"
              flexShrink="0"
              placeItems="center"
              mb={['10', null, null, '20']}
            >
              {pastEvents.map((event) => (
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
