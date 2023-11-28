import React from 'react';
import { render, screen } from '../../test/testUtils';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import FullScreenImage from '.';
import { FullScreenImageProps } from './FullScreenImage';

const onCloseSpy = jest.fn();
const changeImageSpy = jest.fn();

const defaultProps: FullScreenImageProps = {
  images: [
    {
      id: 1,
      alt: 'alt-text',
      img: { data: strapiMediaMock },
    },
  ],
  isOpen: false,
  onClose: onCloseSpy,
};

const setup = (props?: Partial<FullScreenImageProps>) => {
  const combinedProps = { ...defaultProps, ...props };
  return render(<FullScreenImage {...combinedProps} />);
};

describe('The FullScreenImage component', () => {
  afterEach(() => {
    onCloseSpy.mockClear();
    changeImageSpy.mockClear();
  });

  it('does not display anything by default', () => {
    setup();

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('shows the image and the close button', () => {
    setup({ isOpen: true });

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
