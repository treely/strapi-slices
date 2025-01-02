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

export const Events = ({ slice, events }: EventsProps): JSX.Element => {
  return (
    <DefaultSectionContainer>
      <Wrapper>
        {slice.filterSearch ? (
          <>
            {/* <EventsFilter eventCards={slice.events} /> */}
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
          {slice.events.map(({ attributes }) => {
            const event: IStrapiData<StrapiEvent> | undefined = events.find(
              (e) => e.attributes.slug === attributes.slug
            );
            if (!event) {
              return null;
            }
            return (
              <Box key={event.id}>
                <EventCard event={event.attributes} />
              </Box>
            );
          })}
        </SimpleGrid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
