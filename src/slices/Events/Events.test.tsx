import { mergeDeep } from '../../utils/mergeDeep';
import { EventsProps } from './Events';
import Events from '.';
import { render, screen, waitFor } from '../../test/testUtils';
import React from 'react';
import { strapiEventMock } from '../../test/strapiMocks/strapiEventMock';
import useEvents from '../../models/hooks/useEvents';
import messagesEn from './messages.en';
import { EventType } from '../../models/strapi/StrapiEvent';

jest.mock('../../models/hooks/useEvents');

const NOW = new Date('2025-01-01T12:00:00.000Z');

const pastEventMock = {
  ...strapiEventMock,
  attributes: {
    ...strapiEventMock.attributes,
    title: 'Past Event',
    start: '2024-12-01T10:00:00.000Z',
  },
};

const upcomingEventMock = {
  ...strapiEventMock,
  attributes: {
    ...strapiEventMock.attributes,
    title: 'Upcoming Event',
    start: '2025-02-01T10:00:00.000Z',
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
  },
};

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<Events {...combinedProps} />);
};

describe('The Events slice', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(NOW);

    (useEvents as jest.Mock).mockImplementation(({ getKey }) => {
      if (getKey.toString().includes('filters[start][$gte]')) {
        return {
          data: [{ body: { data: [upcomingEventMock] } }],
          isLoading: false,
          isLoadingMore: false,
          canLoadMore: false,
          loadMore: jest.fn(),
        };
      }
      if (getKey.toString().includes('filters[start][$lt]')) {
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
      expect(screen.getByText('Meet Up')).toBeInTheDocument();
      expect(screen.getByText('Conference')).toBeInTheDocument();
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
    // Use past events for the testing, because they batch for past events is defined as 2 and
    // the "Load button" will be shown when there are more then 2 past events
    (useEvents as jest.Mock).mockImplementation(({ getKey }) => {
      if (getKey.toString().includes('filters[start][$lt]')) {
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
                      title: 'Paste Event 3',
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
});
