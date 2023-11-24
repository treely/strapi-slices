import { render, screen } from '@/test/testUtils';
import Video from '.';
import { VideoProps } from './Video';

const defaultProps: VideoProps = {
  slice: {
    title: 'Title',
    youTubeID: 'youTubeID',
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<Video {...combinedProps} />);
};

describe('The Video component', () => {
  it('displays an iframe with a video', () => {
    setup();

    expect(screen.getByTestId('video-iframe')).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/youTubeID'
    );
  });
});
