import { Flex, Box, BoemlyFormControl } from 'boemly';
import React from 'react';
import { useContext, useState } from 'react';
import { IntlContext } from 'react-intl';
import StrapiEvent from '../../models/strapi/StrapiEvent';
import IStrapiData from '../../models/strapi/IStrapiData';

interface EventsFilterProps {
  eventCards: IStrapiData<StrapiEvent>[];
}
// TODO: add test
export const EventsFilter = ({ eventCards }: EventsFilterProps) => {
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');

  const { formatMessage } = useContext(IntlContext);

  // const sortedEventsAfterDate = eventCards.sort(
  //   (a, b) =>
  //     new Date(b.attributes.start).getTime() -
  //     new Date(a.attributes.end).getTime()
  // );

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

  // const eventTypeOptions = [
  //   // TODO: fetch from the events
  //   // TODO: translate in this format:projectConservation: formatMessage({ id: 'transactions.transactionList.projectConservationAccount', }),
  //   { value: 'Webinar', label: 'Webinar' },
  //   { value: 'Conference', label: 'Conference' },
  //   { value: 'Meet Up', label: 'Meet Up' },
  //   { value: 'Forest Walk', label: 'Forest Walk' },
  //   { value: 'Partner Event', label: 'Partner Event' },
  //   { value: 'Lunch & Learn', label: 'Lunch & Learn' },
  //   { value: 'Fair', label: 'Fair' },
  //   { value: 'Festival', label: 'Festival' },
  //   { value: 'Roadshow', label: 'Roadshow' },
  // ];

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
      direction={['column', null, null, 'row']}
      gap="2"
      justifyContent="start"
      marginBottom="8"
    >
      <Box maxWidth={['unset', null, null, null, '44']}>
        <BoemlyFormControl
          id="eventTypeFilter"
          inputType="Select"
          size="md"
          selectOptions={eventTypeOptions}
          selectProps={{
            isSearchable: true,
            searchPlaceholder: `${formatMessage({
              id: 'sections.eventsFilter.searchPlaceholder',
            })}`,
            value: eventTypeFilter ? [eventTypeFilter] : undefined,
            textColor: eventTypeFilter ? 'unset' : 'gray.500',
            onChange: (selected) => setEventTypeFilter(selected[0]),
            placeholder: eventTypeFilter
              ? formatMessage({
                  id: 'sections.eventsFilter.clearPlaceholder',
                })
              : formatMessage({
                  id: 'sections.eventsFilter.eventType',
                }),
            options: eventTypeOptions || [],
          }}
        />
      </Box>

      <Box maxWidth={['unset', null, null, null, '44']}>
        <BoemlyFormControl
          id="toFilter"
          inputType="Select"
          size="md"
          selectOptions={languageOptions}
          selectProps={{
            isSearchable: true,
            searchPlaceholder: `${formatMessage({
              id: 'sections.eventsFilter.searchPlaceholder',
            })}`,
            value: languageFilter ? [languageFilter] : undefined,
            textColor: languageFilter ? 'unset' : 'gray.500',
            onChange: (selected) => setLanguageFilter(selected[0]),
            placeholder: languageFilter
              ? formatMessage({
                  id: 'sections.eventsFilter.clearPlaceholder',
                })
              : formatMessage({
                  id: 'sections.eventsFilter.language',
                }),
            options: languageOptions || [],
          }}
        />
      </Box>
    </Flex>
  );
};
