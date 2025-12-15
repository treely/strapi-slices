import React from 'react';
import {
  DefaultSectionContainer,
  Wrapper,
  AvatarWithName,
  Text,
  Box,
} from 'boemly';
import StrapiAvatarWithName from '../../models/strapi/StrapiAvatarWithName';
import strapiMediaUrl from '../../utils/strapiMediaUrl';

export interface FullWidthHighlightQuoteProps {
  slice: {
    tagline?: string;
    quote: string;
    avatarWithName: StrapiAvatarWithName;
  };
}

export const FullWidthHighlightQuote: React.FC<
  FullWidthHighlightQuoteProps
> = ({ slice }: FullWidthHighlightQuoteProps) => (
  <DefaultSectionContainer>
    <Wrapper>
      <Box maxWidth="5xl" marginX="auto" mb="8">
        {slice.tagline && (
          <Text
            color="primary.700"
            size="mdMonoUppercase"
            textAlign="center"
            mb="3"
          >
            {slice.tagline}
          </Text>
        )}
        <Text color="black" size="xlRegularNormalBold" textAlign="center">
          {slice.quote}
        </Text>
      </Box>
      <AvatarWithName
        name={slice.avatarWithName.name}
        description={slice.avatarWithName.description}
        imageSrc={strapiMediaUrl(slice.avatarWithName.image.img, 'small')}
        imageAlt={slice.avatarWithName.image.alt}
        imageObjectFit={slice.avatarWithName.image.objectFit || 'cover'}
        orientation="vertical"
      />
    </Wrapper>
  </DefaultSectionContainer>
);
