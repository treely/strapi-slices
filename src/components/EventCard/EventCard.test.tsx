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
      defaultProps.event.button.url
    );

    expect(screen.queryByText('Recommended')).not.toBeInTheDocument();
    expect(screen.queryByText('Online')).not.toBeInTheDocument();
  });

  it('displays the speakers', async () => {
    setup();

    const firstSpeakerImage = screen.getAllByRole('img')[2];
    expect(firstSpeakerImage).toHaveAttribute(
      'alt',
      defaultProps.event.speakers[0].img.alt
    );

    await waitFor(() => userEvent.hover(firstSpeakerImage));
    await waitFor(() => expect(screen.getByText('John Doe')).toBeVisible());

    const secondSpeakerImage = screen.getAllByRole('img')[3];
    expect(secondSpeakerImage).toHaveAttribute(
      'alt',
      defaultProps.event.speakers[1].img.alt
    );

    await waitFor(() => userEvent.hover(secondSpeakerImage));
    await waitFor(() => expect(screen.getByText('Jane Doe')).toBeVisible());
  });
  // TODO: fix the following tests
  // it('displays optional props if they are defined in thes', () => {
  //   setup({

  //         {
  //           ...defaultProps.event,
  //           recommended: true,
  //           online: true,

  //     },
  //   });

  //   expect(
  //     screen.getByText((content) => content.includes('Recommended'))
  //   ).toBeInTheDocument();
  //   expect(screen.getByText('Online')).toBeInTheDocument();
  // });

  // it('displays the title header when it is defined in', () => {
  //   setup({
  //   : {
  //       ...defaultProps,
  //       title: 'Test Title',
  //       tagline: 'Test Tagline',
  //     },
  //   });

  //   expect(screen.getByText('Test Title')).toBeInTheDocument();
  //   expect(screen.getByText('Test Tagline')).toBeInTheDocument();
  // });
});
