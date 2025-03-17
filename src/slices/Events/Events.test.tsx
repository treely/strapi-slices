import { mergeDeep } from '../../utils/mergeDeep';
import { EventsProps } from './Events';
import Events from '.';
import { render, screen, waitFor } from '../../test/testUtils';
import React from 'react';
import { strapiEventMock } from '../../test/strapiMocks/strapiEventMock';
import useEvents from '../../models/hooks/useEvents';
import messagesEn from './messages.en';
import { EventType } from '../../models/strapi/StrapiEvent';
import userEvent from '@testing-library/user-event';
import messagesEnEventCard from '../../components/EventCard/messages.en';

jest.mock('../../models/hooks/useEvents');

const NOW = new Date('2025-01-01T12:00:00.000Z');

const pastEventMock = {
  ...strapiEventMock,
  attributes: {
    ...strapiEventMock.attributes,
    title: 'Past Event',
    startDate: '2024-12-01',
    eventTypes: [{ id: 1, eventType: EventType.MEET_UP }],
    languages: [{ id: 1, language: 'English', countryCode: 'GB' }],
  },
};

const upcomingEventMock = {
  ...strapiEventMock,
  attributes: {
    ...strapiEventMock.attributes,
    title: 'Upcoming Event',
    startDate: '2025-02-01',
    eventTypes: [{ id: 1, eventType: EventType.CONFERENCE }],
    languages: [{ id: 1, language: 'German', countryCode: 'DE' }],
  },
};

const defaultProps: EventsProps = {
  slice: {
    upcomingTitle: 'Upcoming Events',
    upcomingDescription: 'Join us for these amazing events',
    pastTitle: 'Past Events',
    pastDescription: 'Check out our past events',
    filterSearch: true,
  },
};

let getKeyCalls: string[] = [];

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<Events {...combinedProps} />);
};

describe('The Events slice', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(NOW);
    getKeyCalls = [];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: [upcomingEventMock, pastEventMock],
      }),
    });

    (useEvents as jest.Mock).mockImplementation(({ getKey }) => {
      const key = getKey(0, null);
      getKeyCalls.push(key.toString());

      if (getKey.toString().includes('filters[startDate][$gte]')) {
        return {
          data: [{ body: { data: [upcomingEventMock] } }],
          isLoading: false,
          isLoadingMore: false,
          canLoadMore: false,
          loadMore: jest.fn(),
        };
      }
      if (getKey.toString().includes('filters[startDate][$lt]')) {
        return {
          data: [{ body: { data: [pastEventMock] } }],
          isLoading: false,
          isLoadingMore: false,
          canLoadMore: false,
          loadMore: jest.fn(),
        };
      }
      return {
        data: [],
        isLoading: false,
        isLoadingMore: false,
        canLoadMore: false,
        loadMore: jest.fn(),
      };
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('displays the title and tagline if it is defined', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
      expect(screen.getByText('Past Events')).toBeInTheDocument();
      expect(
        screen.getByText('Join us for these amazing events')
      ).toBeInTheDocument();
      expect(screen.getByText('Check out our past events')).toBeInTheDocument();
    });
  });

  it('displays upcoming and past events correctly', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText('Past Event')).toBeInTheDocument();
      expect(screen.getByText('Upcoming Event')).toBeInTheDocument();
      expect(screen.queryAllByText('Event Description')).toHaveLength(2);
      expect(
        screen.getByText(
          messagesEnEventCard['sections.eventCard.eventType.meetup']
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          messagesEnEventCard['sections.eventCard.eventType.conference']
        )
      ).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('German')).toBeInTheDocument();
    });
  });

  it('does not display the load more button when there are no more events to load', async () => {
    setup();

    await waitFor(() => {
      expect(
        screen.queryByText(messagesEn['sections.events.loadMore'])
      ).not.toBeInTheDocument();
    });
  });

  it('displays the load more button when there are more events to load', async () => {
    // Use past events for the testing, because the batch for past events is defined as 2 and
    // the "Load button" will be shown when there are more then 2 past events
    (useEvents as jest.Mock).mockImplementation(({ getKey }) => {
      if (getKey.toString().includes('filters[startDate][$lt]')) {
        return {
          data: [
            {
              body: {
                data: [
                  pastEventMock,
                  {
                    ...pastEventMock,
                    id: 2,
                    attributes: {
                      ...pastEventMock.attributes,
                      title: 'Past Event 2',
                    },
                  },
                  {
                    ...pastEventMock,
                    id: 3,
                    attributes: {
                      ...pastEventMock.attributes,
                      title: 'Past Event 3',
                    },
                  },
                ],
              },
            },
          ],
          isLoading: false,
          isLoadingMore: false,
          canLoadMore: true,
          loadMore: jest.fn(),
        };
      }
      setup();

      expect(
        screen.getByText(messagesEn['sections.events.loadMore'])
      ).toBeInTheDocument();
    });
  });

  it('display "no events" message if there are no events to display', async () => {
    (useEvents as jest.Mock).mockImplementation(() => {
      return {
        data: [],
        isLoading: false,
        isLoadingMore: false,
        canLoadMore: false,
        loadMore: jest.fn(),
      };
    });
    setup();

    await waitFor(() => {
      expect(
        screen.getByText(messagesEn['sections.events.noUpcomingEvents'])
      ).toBeInTheDocument();
      expect(
        screen.getByText(messagesEn['sections.events.noPastEvents'])
      ).toBeInTheDocument();
    });
  });

  describe('filters the events', () => {
    it('by event type', async () => {
      setup();

      const selectButtons = await screen.findAllByRole('combobox');
      expect(selectButtons).toHaveLength(3);
      expect(selectButtons[0]).toHaveTextContent(
        messagesEn['sections.events.eventsFilter.eventType']
      );
      const selectButton = selectButtons[0];

      userEvent.click(selectButton);

      await waitFor(async () => {
        const options = await screen.getAllByRole('menuitemradio', {
          hidden: true,
        });
        expect(options).toHaveLength(2);
        expect(options[0]).toHaveTextContent(
          messagesEnEventCard['sections.eventCard.eventType.conference']
        );
        expect(options[1]).toHaveTextContent(
          messagesEnEventCard['sections.eventCard.eventType.meetup']
        );

        userEvent.click(options[0]);
      });

      await waitFor(() => {
        expect(getKeyCalls.map(decodeURIComponent)).toEqual(
          expect.arrayContaining([
            expect.stringContaining('filters[startDate][$gte]'),
            expect.stringContaining(
              'filters[$or][0][eventTypes][eventType]=Conference'
            ),
          ])
        );
      });
    });

    it('by language', async () => {
      setup();

      const selectButtons = await screen.findAllByRole('combobox');
      expect(selectButtons).toHaveLength(3);
      expect(selectButtons[1]).toHaveTextContent(
        messagesEn['sections.events.eventsFilter.language']
      );
      const selectButton = selectButtons[1];

      userEvent.click(selectButton);

      await waitFor(async () => {
        const options = await screen.getAllByRole('menuitemradio', {
          hidden: true,
        });
        expect(options).toHaveLength(2);
        expect(options[0]).toHaveTextContent('German');
        expect(options[1]).toHaveTextContent('English');

        userEvent.click(options[0]);
      });

      await waitFor(() => {
        expect(getKeyCalls.map(decodeURIComponent)).toEqual(
          expect.arrayContaining([
            expect.stringContaining('filters[startDate][$gte]'),
            expect.stringContaining(
              'filters[$or][0][languages][language]=German'
            ),
          ])
        );
      });
    });
  });

  describe('sorts the events', () => {
    it('by newest first', async () => {
      setup();

      const selectButtons = await screen.findAllByRole('combobox');
      expect(selectButtons).toHaveLength(3);
      // Default value of "Sort by" select is "Newest first"
      expect(selectButtons[2]).toHaveTextContent(
        messagesEn['sections.events.eventsFilter.sortBy.newest']
      );

      await waitFor(() => {
        expect(getKeyCalls.map(decodeURIComponent)).toEqual(
          expect.arrayContaining([
            expect.stringContaining(
              `filters[startDate][$gte]=${NOW.toISOString()}`
            ),
          ])
        );
      });
    });

    it('by oldest first', async () => {
      setup();

      const selectButtons = await screen.findAllByRole('combobox');
      expect(selectButtons).toHaveLength(3);
      // Default value of "Sort by" select is "Newest first"
      expect(selectButtons[2]).toHaveTextContent(
        messagesEn['sections.events.eventsFilter.sortBy.newest']
      );
      const selectButton = selectButtons[2];

      userEvent.click(selectButton);

      await waitFor(async () => {
        const options = await screen.getAllByRole('menuitemradio', {
          hidden: true,
        });
        expect(options).toHaveLength(2);
        expect(options[0]).toHaveTextContent(
          messagesEn['sections.events.eventsFilter.sortBy.newest']
        );
        expect(options[1]).toHaveTextContent(
          messagesEn['sections.events.eventsFilter.sortBy.oldest']
        );

        userEvent.click(options[1]);
      });

      await waitFor(() => {
        expect(getKeyCalls.map(decodeURIComponent)).toEqual(
          expect.arrayContaining([
            expect.stringContaining(
              `filters[startDate][$lt]=${NOW.toISOString()}`
            ),
          ])
        );
      });
    });
  });
});
