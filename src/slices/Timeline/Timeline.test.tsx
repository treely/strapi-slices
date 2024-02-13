import React from 'react';
import Timeline from '.';
import { mergeDeep } from '../../utils/mergeDeep';
import { TimelineProps } from './Timeline';
import { render, screen, userEvent, waitFor } from '../../test/testUtils';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import messagesEn from './messages.en';

const defaultProps: TimelineProps = {
  slice: {
    title: 'Title',
    timelineItems: [
      {
        id: 1,
        title: 'Item 1',
      },
    ],
  },
};

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<Timeline {...combinedProps} />);
};

describe('The Timeline component', () => {
  it('displays the correct tagline and text, if they are defined in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        tagline: 'Timeline tagline',
        text: 'Timeline text',
      },
    });
    expect(screen.getByText('Timeline tagline')).toBeInTheDocument();
    expect(screen.getByText('Timeline text')).toBeInTheDocument();
  });

  it('displays the timeline items', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        timelineItems: [
          defaultProps.slice.timelineItems[0],
          { id: 2, title: 'Item 2' },
        ],
      },
    });

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('displays the tagline and text in the timeline items, if they are defined in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        timelineItems: [
          {
            ...defaultProps.slice.timelineItems[0],
            tagline: 'Item 1 tagline',
            text: 'Item 1 text',
          },
        ],
      },
    });

    expect(screen.getByText('Item 1 tagline')).toBeInTheDocument();
    expect(screen.getByText('Item 1 text')).toBeInTheDocument();
  });

  it('displays the button in the timeline items, if it is defined in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        timelineItems: [
          {
            ...defaultProps.slice.timelineItems[0],
            button: {
              id: '1',
              url: 'https://tree.ly',
              text: 'Optional Button',
            },
          },
        ],
      },
    });

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Optional Button')).toBeInTheDocument();
  });

  it('displays the badge if it is defined in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        timelineItems: [
          {
            ...defaultProps.slice.timelineItems[0],
            badge: { text: 'Badge', variant: 'green' },
          },
        ],
      },
    });

    expect(screen.getAllByText('Badge')[0]).toBeInTheDocument();
  });

  it('displays the logo, icon and image if they are defined in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        timelineItems: [
          {
            ...defaultProps.slice.timelineItems[0],
            logo: {
              id: 1,
              alt: 'Logo alt text',
              img: { data: strapiMediaMock },
            },
            image: {
              id: 1,
              alt: 'Image alt text',
              img: { data: strapiMediaMock },
            },
            icon: {
              id: 1,
              alt: 'Icon alt text',
              img: { data: strapiMediaMock },
            },
          },
        ],
      },
    });

    expect(screen.getAllByRole('img')[2]).toHaveAttribute(
      'alt',
      'Image alt text'
    );
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'alt',
      'Logo alt text'
    );
    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'alt',
      'Icon alt text'
    );
  });

  it('displays the background shapes if  if it is defined in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        timelineItems: [
          { ...defaultProps.slice.timelineItems[0], backgroundShapes: true },
        ],
      },
    });

    expect(
      screen.getByAltText(messagesEn['sections.timeline.backgroundShapes'])
    ).toBeInTheDocument();
  });

  it('displays the "Show three more milestones" button if more than three timeline items are defined in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        timelineItems: [
          {
            ...defaultProps.slice.timelineItems[0],
          },
          {
            id: 2,
            title: 'Item 2',
          },
          {
            id: 3,
            title: 'Item 3',
          },
          {
            id: 4,
            title: 'Item 4',
          },
        ],
      },
    });

    expect(screen.queryByText('Item 4')).not.toBeInTheDocument();
    expect(
      screen.getByText(messagesEn['sections.timeline.showMoreButton'])
    ).toBeInTheDocument();
  });

  it('renders three more timeline items if the "Show three more milestones" button is clicked, when all timeline items are rendered, the  "Show three more milestones" button is not displayed', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        timelineItems: [
          {
            ...defaultProps.slice.timelineItems[0],
          },
          {
            id: 2,
            title: 'Item 2',
          },
          {
            id: 3,
            title: 'Item 3',
          },
          {
            id: 4,
            title: 'Item 4',
          },
        ],
      },
    });

    waitFor(() => {
      userEvent.click(
        screen.getByText(messagesEn['sections.timeline.showMoreButton'])
      );
      expect(screen.findByText('Item 4')).toBeInTheDocument();
      expect(screen.findByRole('button')).not.toBeInTheDocument();
    });
  });
});
