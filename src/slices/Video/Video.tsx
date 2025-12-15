import React, { useRef } from 'react';
import { Box, DefaultSectionContainer, Wrapper } from 'boemly';
import { useMeasure } from '@reactuses/core';

interface VideoSlice {
  youTubeID: string;
  title: string;
}

export interface VideoProps {
  slice: VideoSlice;
}

export const Video: React.FC<VideoProps> = ({ slice }: VideoProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rect] = useMeasure(ref);
  const width = rect.width;

  return (
    <DefaultSectionContainer>
      <Wrapper>
        <Box ref={ref} borderRadius="xl">
          <iframe
            data-testid="video-iframe"
            width={width}
            height={(width / 16) * 9}
            src={`https://www.youtube.com/embed/${slice.youTubeID}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={slice.title}
            style={{ borderRadius: 'var(--boemly-radii-xl)' }}
          />
        </Box>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
