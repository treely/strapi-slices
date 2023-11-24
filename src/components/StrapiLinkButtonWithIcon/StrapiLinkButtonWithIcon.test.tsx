import { render, screen } from '@/test/testUtils';
import StrapiLinkButtonWithIcon from '.';
import { StrapiLinkButtonWithIconProps } from './StrapiLinkButtonWithIcon';

const defaultProps: StrapiLinkButtonWithIconProps = {
  link: {
    id: 1,
    link: { id: 1, text: 'Text', url: '/url' },
    destination: 'linkedin',
  },
};

const setup = (props: Partial<StrapiLinkButtonWithIconProps> = {}) => {
  const combinedProps: StrapiLinkButtonWithIconProps = {
    ...defaultProps,
    ...props,
  };
  render(<StrapiLinkButtonWithIcon {...combinedProps} />);
};

describe('The StrapiLinkButtonWithIcon component', () => {
  it('displays a link if the destination is `linkedin`', () => {
    setup({
      link: {
        id: 1,
        link: { id: 1, text: 'Text', url: '/url' },
        destination: 'linkedin',
      },
    });

    expect(screen.getByRole('link')).toHaveAttribute('href', '/url');
  });

  it('displays a link if the destination is `web`', () => {
    setup({
      link: {
        id: 1,
        link: { id: 1, text: 'Text', url: '/url' },
        destination: 'web',
      },
    });

    expect(screen.getByRole('link')).toHaveAttribute('href', '/url');
  });

  it('displays a link if the destination is `other`', () => {
    setup({
      link: {
        id: 1,
        link: { id: 1, text: 'Text', url: '/url' },
        destination: 'other',
      },
    });

    expect(screen.getByRole('link')).toHaveAttribute('href', '/url');
  });
});
