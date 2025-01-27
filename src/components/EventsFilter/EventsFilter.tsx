import { Flex, Box, Select, Text } from 'boemly';
import React from 'react';
import { useContext, useState } from 'react';
import { IntlContext } from 'react-intl';
import StrapiEvent from '../../models/strapi/StrapiEvent';
import IStrapiData from '../../models/strapi/IStrapiData';
import { EventType } from '@testing-library/react';
import { atom } from 'recoil';

export interface FiltersProps {
  eventTypes: EventType[];
  languages: {
    id: number;
    language: string;
    countryCode: string;
  }[];
}

const eventsFilterState = atom<FiltersProps>({
  key: 'evaluationFiltersPerOrganizationState',
  default: {
    eventTypes: [],
    languages: [],
  },
});
interface EventsFilterProps {
  eventCards: IStrapiData<StrapiEvent>[];
}
// TODO: add test
export const EventsFilter = ({ eventCards }: EventsFilterProps) => {
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [sort, setSort] = useState('Newest first');

  const { formatMessage } = useContext(IntlContext);

  const sortedEventsAfterDate = eventCards.sort(
    (a, b) =>
      new Date(b.attributes.start).getTime() -
      new Date(a.attributes.end).getTime()
  );
  // EventTypes should be translated
  const seenEventTypes = new Set<string>();
  const eventTypeOptions = eventCards
    .flatMap((card) => {
      const eventTypes = card.attributes.eventTypes;
      return eventTypes.reduce(
        (
          acc: { value: string; label: string }[],
          eventTypeObj: { eventType: string }
        ) => {
          if (
            eventTypeObj.eventType &&
            !seenEventTypes.has(eventTypeObj.eventType)
          ) {
            seenEventTypes.add(eventTypeObj.eventType);
            acc.push({
              value: eventTypeObj.eventType,
              label: eventTypeObj.eventType,
            });
          }
          return acc;
        },
        [] as { value: string; label: string }[]
      );
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  const seenLanguages = new Set<string>();
  const languageOptions = eventCards
    .flatMap((card) => {
      const languages = card.attributes.languages;
      return languages.reduce(
        (
          acc: { value: string; label: string }[],
          languageObj: { language: string }
        ): { value: string; label: string }[] => {
          if (
            languageObj.language &&
            !seenLanguages.has(languageObj.language)
          ) {
            seenLanguages.add(languageObj.language);
            acc.push({
              value: languageObj.language,
              label: languageObj.language,
            });
          }
          return acc;
        },
        [] as { value: string; label: string }[]
      );
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Flex
      justifyContent="space-between"
      direction={['column', null, null, 'row']}
    >
      <Flex
        direction={['column', null, null, 'row']}
        gap="4"
        justifyContent="start"
        marginBottom="8"
      >
        <Box position="relative" width="3xs">
          <Select
            isMultiple={true}
            id="eventTypeFilter"
            size="md"
            placeholder={formatMessage({
              id: 'sections.eventsFilter.searchPlaceholder',
            })}
            options={eventTypeOptions || []}
            value={eventTypeFilter ? [eventTypeFilter] : undefined}
            onChange={(selected) => setEventTypeFilter(selected[0])}
          />
        </Box>
        <Box position="relative" width="3xs">
          <Select
            isMultiple={true}
            id="toFilter"
            size="md"
            searchPlaceholder={formatMessage({
              id: 'sections.eventsFilter.searchPlaceholder',
            })}
            value={languageFilter ? [languageFilter] : undefined}
            onChange={(selected) => setLanguageFilter(selected[0])}
            placeholder={
              languageFilter
                ? formatMessage({
                    id: 'sections.eventsFilter.clearPlaceholder',
                  })
                : formatMessage({
                    id: 'sections.eventsFilter.language',
                  })
            }
            options={languageOptions || []}
          />
        </Box>
      </Flex>
      <Text>Sort by: </Text>
      <Select
        maxWidth="3xs"
        value={sort ? [sort] : undefined}
        onChange={(selected) => setSort(selected[0])}
        options={[
          { label: 'Newest first', value: 'Newest first' },
          { label: 'Oldest first', value: 'Oldest first' },
        ]}
      />
    </Flex>
  );
};
