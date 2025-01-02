import { Flex, Box, BoemlyFormControl } from 'boemly';
import React from 'react';
import { useContext, useState } from 'react';
import { IntlContext } from 'react-intl';
import { EventCardsProps } from '../EventCard/EventCard';

interface EventsFilterProps {
  eventCards: EventCardsProps['slice']['eventCards'];
}

export const EventsFilter = ({ eventCards }: EventsFilterProps) => {
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');

  const { formatMessage } = useContext(IntlContext);

  const eventTypeOptions = [
    // TODO: translate in this format:projectConservation: formatMessage({ id: 'transactions.transactionList.projectConservationAccount', }),
    { value: 'Webinar', label: 'Webinar' },
    { value: 'Conference', label: 'Conference' },
    { value: 'Meet Up', label: 'Meet Up' },
    { value: 'Forest Walk', label: 'Forest Walk' },
    { value: 'Partner Event', label: 'Partner Event' },
    { value: 'Lunch & Learn', label: 'Lunch & Learn' },
    { value: 'Fair', label: 'Fair' },
    { value: 'Festival', label: 'Festival' },
    { value: 'Roadshow', label: 'Roadshow' },
  ];

  const languageOptions = eventCards.reduce<{ value: string; label: string }[]>(
    (acc, card) => {
      if (
        card.language &&
        !acc.some((option) => option.value === card.language)
      ) {
        acc.push({ value: card.languages, label: card.languages });
      }
      return acc;
    },
    []
  );

  return (
    <Flex
      direction={['column', null, null, null, 'row']}
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
              id: 'components.eventsFilter.eventTypePlaceholder',
            })}`,
            value: eventTypeFilter ? [eventTypeFilter] : undefined,
            textColor: eventTypeFilter ? 'unset' : 'gray.500',
            onChange: (selected) => setEventTypeFilter(selected[0]),
            placeholder: eventTypeFilter
              ? formatMessage({
                  id: 'components.eventsFilter.clearPlaceholder',
                })
              : formatMessage({
                  id: 'components.eventsFilter.from',
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
              id: 'transactions.transactionList.searchPlaceholder',
            })}`,
            value: languageFilter ? [languageFilter] : undefined,
            textColor: languageFilter ? 'unset' : 'gray.500',
            onChange: (selected) => setLanguageFilter(selected[0]),
            placeholder: languageFilter
              ? formatMessage({
                  id: 'transactions.transactionList.clearPlaceholder',
                })
              : formatMessage({
                  id: 'transactions.transactionList.to',
                }),
            options: languageOptions || [],
          }}
        />
      </Box>
    </Flex>
  );
};
