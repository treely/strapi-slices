import {
  DefaultSectionContainer,
  Wrapper,
  Spacer,
  DefaultSectionHeader,
  SimpleGrid,
  Box,
} from 'boemly';
import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiEvent from '../../models/strapi/StrapiEvent';
import React from 'react';
import EventCard from '../../components/EventCard';
import EventsFilter from '../../components/EventsFilter';
// import EventsFilter from '../../components/EventsFilter';

export interface EventsProps {
  slice: {
    filterSearch?: boolean;
    title?: string;
    tagline?: string;
    events: IStrapiData<StrapiEvent>[];
  };
  events: IStrapiData<StrapiEvent>[];
}

// const sortByTime = (
//   a: IStrapiData<StrapiEvent>,
//   b: IStrapiData<StrapiEvent>
// ): number =>
//   new Date(b.attributes.start).getTime() - new Date(a.attributes.end).getTime();

export const Events = ({ slice, events }: EventsProps): JSX.Element => {
  // const sortedEvents = useMemo(() => events.sort(sortByTime), [events]);

  // const eventsToDisplay = useMemo(
  //   (i) =>
  //     slice.events[i].attributes.title
  //       ? sortedEvents
  //           .filter(
  //             (event) =>
  //               event.attributes.data?.attributes.title ===
  //               slice.events.attributes.title
  //           )
  //           .slice(0, 3)
  //       : sortedEvents.slice(0, 3),
  //   [sortedEvents, slice]
  // );

  return (
    <DefaultSectionContainer>
      <Wrapper>
        {slice.filterSearch ? (
          <Box marginX="8">
            <EventsFilter eventCards={slice.events} />
            <Spacer h="6" />
          </Box>
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
          {slice.events.map(({ attributes }) => {
            const event: IStrapiData<StrapiEvent> | undefined =
              slice.events.find((e) => e.attributes.slug === attributes.slug);
            if (!event) {
              return null;
            }
            return (
              <Box key={event.id} height="full">
                <EventCard event={event.attributes} />
              </Box>
            );
          })}
        </SimpleGrid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
