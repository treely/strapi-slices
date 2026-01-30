import React from 'react';
import { Box, Heading, Text, Wrapper } from 'boemly';

export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

export interface HeroWithHighlightsProps {
  slice: {
    /**
     * Title with optional highlights. Use [text] to mark highlighted parts.
     * Example: "Forest project [Portfolio]" or "[Participation requirements] for forest conversion"
     */
    title: string;
    subTitle?: string;
    headingLevel?: 'h1' | 'h2' | 'h3';
    headingSize?: HeadingSize;
    variant?: 'white' | 'gray';
    textAlign?: 'left' | 'center' | 'right';
  };
}

interface TitlePart {
  text: string;
  highlighted: boolean;
}

const parseTitle = (title: string): TitlePart[] => {
  const parts: TitlePart[] = [];
  const regex = /\[([^\]]+)\]|([^[\]]+)/g;

  for (const match of title.matchAll(regex)) {
    if (match[1]) parts.push({ text: match[1], highlighted: true });
    if (match[2]) parts.push({ text: match[2], highlighted: false });
  }

  return parts;
};

const VARIANTS = {
  white: { backgroundColor: 'white', titleColor: 'primary.900' },
  gray: { backgroundColor: 'primary.50', titleColor: 'primary.900' },
};
type MobileHeadingSize = Exclude<HeadingSize, '6xl' | '7xl'>;

// Maps desktop size to a smaller mobile size
const getMobileSize = (size: HeadingSize): MobileHeadingSize => {
  const sizeMap: Record<HeadingSize, MobileHeadingSize> = {
    '7xl': '4xl',
    '6xl': '3xl',
    '5xl': '2xl',
    '4xl': 'xl',
    '3xl': 'lg',
    '2xl': 'md',
    'xl': 'sm',
    'lg': 'xs',
    'md': 'xs',
    'sm': 'xs',
    'xs': 'xs',
  };
  return sizeMap[size];
};

export const HeroWithHighlights: React.FC<HeroWithHighlightsProps> = ({
  slice,
}: HeroWithHighlightsProps) => {
  const parts = parseTitle(slice.title);
  const variant = slice.variant || 'white';
  const textAlign = slice.textAlign || 'left';
  const desktopSize = slice.headingSize || '3xl';
  const mobileSize = getMobileSize(desktopSize);

  return (
    <Box
      position="relative"
      width="full"
      backgroundColor={VARIANTS[variant].backgroundColor}
      paddingTop="var(--boemly-spacing-48)"
      paddingBottom="var(--boemly-spacing-16)"
    >
      <Wrapper>
        <Heading
          as={slice.headingLevel || 'h1'}
          size={[mobileSize, desktopSize]}
          color={VARIANTS[variant].titleColor}
          lineHeight="1.3"
          fontWeight="600"
          textAlign={textAlign}
          colorPalette={VARIANTS[variant].titleColor}
        >
          {parts.map((part, i) =>
            part.highlighted ? (
              <Box as="span" key={i} px="2" backgroundColor="primary.500">
                {part.text}
              </Box>
            ) : (
              part.text
            )
          )}
        </Heading>

        {slice.subTitle && (
          <Text
            fontSize="18px"
            color={VARIANTS[variant].titleColor}
            mt="4"
            textAlign={textAlign}
          >
            {slice.subTitle}
          </Text>
        )}
      </Wrapper>
    </Box>
  );
};
