import React from 'react';
import { render, screen, userEvent, waitFor } from '../../test/testUtils';
import EventCard from '.';
import { EventCardProps } from './EventCard';
import { strapiEventMock } from '../../test/strapiMocks/strapiEventMock';
import { mergeDeep } from '../../utils/mergeDeep';

const defaultProps: EventCardProps = {
  event: strapiEventMock.attributes,
};

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<EventCard {...combinedProps} />);
};

describe('The EventCard component', () => {
  it('displays the event cards', () => {
    setup();

    expect(screen.getByText(defaultProps.event.title)).toBeInTheDocument();

    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'alt',
      defaultProps.event.image.alt
    );
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'alt',
      defaultProps.event.logo.alt
    );

    expect(screen.getByText('Event Description')).toBeInTheDocument();
    expect(screen.getByText('Event Title')).toBeInTheDocument();
    expect(screen.getByText('Meet Up')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      defaultProps.event.button?.url
    );

    expect(screen.queryByText('Recommended')).not.toBeInTheDocument();
    expect(screen.queryByText('Online')).not.toBeInTheDocument();
  });

  it('displays start and end date and time correctly', () => {
    setup();

    const textContent = screen.getByText(
      /02\/12\/2024\s*\|\s*08:30\s*-\s*03\/12\/2024\s*\|\s*09:30/i
    ).textContent;

    const normalizedText = textContent?.replace(/\s+/g, ' ').trim();

    expect(normalizedText).toBe('02/12/2024 | 08:30 - 03/12/2024 | 09:30');
  });

  it('does not display start and end time if allDay property set "true"', () => {
    setup({
      event: {
        ...defaultProps.event,
        allDay: true,
      },
    });

    const textContent = screen.getByText(
      /02\/12\/2024\s*-\s*03\/12\/2024/i
    ).textContent;

    const normalizedText = textContent?.replace(/\s+/g, ' ').trim();

    expect(normalizedText).toBe('02/12/2024 - 03/12/2024');
  });

  it('displays the speakers', async () => {
    setup();

    const firstSpeakerImage = screen.getAllByRole('img')[2];
    expect(firstSpeakerImage).toHaveAttribute(
      'alt',
      defaultProps.event.speakers?.[0]?.image.alt
    );

    await userEvent.hover(firstSpeakerImage);
    await waitFor(() => expect(screen.getByText('John Doe')).toBeVisible());

    const secondSpeakerImage = screen.getAllByRole('img')[3];
    expect(secondSpeakerImage).toHaveAttribute(
      'alt',
      defaultProps.event.speakers?.[1]?.image.alt
    );

    await userEvent.hover(secondSpeakerImage);
    await waitFor(() => expect(screen.getByText('Jane Doe')).toBeVisible());
  });

  it('displays optional props if they are defined in the slice', () => {
    setup({
      event: {
        ...defaultProps.event,
        recommended: true,
        online: true,
        location: 'Vienna',
      },
    });

    expect(
      screen.getByText((content) => content.includes('Recommended'))
    ).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByText('Vienna')).toBeInTheDocument();
  });

  it('displays the right country flag', () => {
    setup();
    expect(screen.getByText('🇬🇧')).toBeInTheDocument();
  });

  it('displays multiple event types if they are defined in the slice', () => {
    setup({
      event: {
        ...defaultProps.event,
        eventTypes: [
          { id: 1, eventType: 'Conference' },
          { id: 2, eventType: 'Meet Up' },
        ],
      },
    });

    expect(screen.getByText('Conference')).toBeInTheDocument();
    expect(screen.getByText('Meet Up')).toBeInTheDocument();
  });

  it('displays multiple languages if they are defined in the slice', () => {
    setup({
      event: {
        ...defaultProps.event,
        languages: [
          { id: 1, language: 'German', countryCode: 'de' },
          { id: 2, language: 'English', countryCode: 'en' },
        ],
      },
    });

    expect(screen.getByText('German')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });
});
