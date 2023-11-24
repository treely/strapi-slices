import { render, screen } from '@/test/testUtils';
import { storybookStrapiCoverMock } from '@/test/storybookMocks/storybookStrapiMedia';
import { mergeDeep } from '@/utils/mergeDeep';
import { pushSpy, useRouter } from '../../../__mocks__/next/router';
import { CtaProps } from './Cta';
import Cta from '.';
import messagesEn from './messages.en';

const defaultProps: CtaProps = {
  slice: {
    title: 'Main Title',
    variant: 'white',
    ctaCards: [
      {
        id: 1,
        title: 'Title',
        variant: 'gray',
        backgroundShape: false,
        textAlign: 'left',
      },
    ],
  },
};

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<Cta {...combinedProps} />);
};

describe('The Cta component', () => {
  afterEach(() => {
    pushSpy.mockRestore();
  });

  afterAll(() => {
    useRouter.mockRestore();
  });

  it('displays the title', () => {
    setup();

    expect(screen.getByText('Main Title')).toBeInTheDocument();
  });

  it('displays the title in cta card', () => {
    setup();

    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('displays the image if the image is in slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        ctaCards: [
          {
            ...defaultProps.slice.ctaCards[0],
            image: {
              id: 71,
              alt: 'Alt',
              img: { data: storybookStrapiCoverMock },
            },
          },
        ],
      },
    });

    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Alt');
  });

  it('does not display the image if there is no image in slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        ctaCards: [
          {
            ...defaultProps.slice.ctaCards[0],
            image: undefined,
          },
        ],
      },
    });

    expect(screen.queryByAltText('Alt')).not.toBeInTheDocument();
  });

  it('does not display the tagline and sub title in cta card if it is not in slice', () => {
    setup();

    expect(screen.queryByText('Tagline')).not.toBeInTheDocument();
    expect(screen.queryByText('Subtitle')).not.toBeInTheDocument();
  });

  it('displays the dark shapes image if cta card textAlign is center with image in slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        ctaCards: [
          {
            ...defaultProps.slice.ctaCards[0],
            image: {
              id: 71,
              alt: 'Alt',
              img: { data: storybookStrapiCoverMock },
            },
            backgroundShape: true,
            textAlign: 'center',
          },
        ],
      },
    });

    expect(
      screen.getByAltText(messagesEn['sections.cta.backgroundShapesDark'])
    ).toBeInTheDocument();
  });

  it('displays the dark background shapes image if cta card variant is "green" in slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        ctaCards: [
          {
            ...defaultProps.slice.ctaCards[0],
            variant: 'green',
            backgroundShape: true,
          },
        ],
      },
    });

    expect(
      screen.getByAltText(messagesEn['sections.cta.backgroundShapesDark'])
    ).toBeInTheDocument();
  });

  it('displays the light shapes image if cta card variant is not "green" and textAlign is not center with image in slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        ctaCards: [
          {
            ...defaultProps.slice.ctaCards[0],
            variant: 'gray',
            textAlign: 'left',
            backgroundShape: true,
            image: {
              id: 71,
              alt: 'Alt',
              img: { data: storybookStrapiCoverMock },
            },
          },
        ],
      },
    });

    expect(
      screen.getByAltText(messagesEn['sections.cta.backgroundShapesLight'])
    ).toBeInTheDocument();
  });
});

it('displays a link in cta card if the button is in slice', () => {
  setup({
    slice: {
      ...defaultProps.slice,
      ctaCards: [
        {
          ...defaultProps.slice.ctaCards[0],
          buttons: [
            {
              id: '1',
              button: { id: '1', text: 'Button', url: 'https://tree.ly' },
              variant: 'solid',
            },
          ],
        },
      ],
    },
  });

  expect(screen.getByRole('link')).toBeInTheDocument();
  expect(screen.getByText('Button')).toBeInTheDocument();
});

it('displays two buttons in cta card if the buttons are in slice', () => {
  setup({
    slice: {
      ...defaultProps.slice,
      ctaCards: [
        {
          ...defaultProps.slice.ctaCards[0],
          buttons: [
            {
              id: '1',
              button: { id: '1', text: 'Button', url: 'https://tree.ly' },
              variant: 'solid',
            },
            {
              id: '2',
              button: { id: '2', text: 'Button', url: 'https://tree.ly' },
              variant: 'outline',
            },
          ],
        },
      ],
    },
  });

  expect(screen.getAllByRole('link')).toHaveLength(2);
});

it('displays the card in Right layout', () => {
  setup({
    slice: {
      ...defaultProps.slice,
      ctaCards: [
        {
          ...defaultProps.slice.ctaCards[0],
          textAlign: 'right',
          image: {
            alt: 'Alt',
            img: { data: storybookStrapiCoverMock },
          },
        },
      ],
    },
  });

  expect(screen.getByText('Title')).toBeInTheDocument();
  expect(screen.getByAltText('Alt')).toBeInTheDocument();
});

it('displays the card in CenterWithoutImage layout', () => {
  setup({
    slice: {
      ...defaultProps.slice,
      ctaCards: [
        {
          ...defaultProps.slice.ctaCards[0],
          textAlign: 'center',
          image: undefined,
        },
      ],
    },
  });

  expect(screen.queryByAltText('Alt')).not.toBeInTheDocument();
});
