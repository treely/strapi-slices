import React from 'react';
import Image from 'next/image';
import {
  Box,
  DefaultSectionHeader,
  HeroCard,
  QuoteCard,
  Shape,
  SimpleGrid,
  Wrapper,
} from 'boemly';
import StrapiDefaultHeader from '../../models/strapi/StrapiDefaultHeader';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import StrapiQuoteCard from '../../models/strapi/StrapiQuoteCard';
import StrapiHeroCard from '../../models/strapi/StrapiHeroCard';
import strapiLinkUrl from '../../utils/strapiLinkUrl';
import StrapiImage from '../../models/strapi/StrapiImage';
import convertToKebabCase from '../../utils/convertToKebabCase';
import { useRouter } from 'next/router';

interface QuoteCardsSlice extends StrapiDefaultHeader {
  cards: StrapiQuoteCard[];
  shapes?: StrapiImage[];
  hero?: StrapiHeroCard;
}
export interface QuoteCardsProps {
  slice: QuoteCardsSlice;
}

export const QuoteCards: React.FC<QuoteCardsProps> = ({
  slice,
}: QuoteCardsProps) => {
  const { push } = useRouter();

  return (
    <>
      <Box
        id={convertToKebabCase(slice.title)}
        position="relative"
        paddingTop="28"
        paddingBottom={!!slice.hero ? '80' : '28'}
      >
        {slice.shapes && slice.shapes.length === 2 && (
          <>
            <Shape
              shape={
                <Image
                  src={strapiMediaUrl(slice.shapes[0].img, 'small')}
                  alt={slice.shapes[0].alt}
                  fill
                  style={{ objectFit: slice.shapes[0].objectFit || 'cover' }}
                />
              }
              top="0"
              right="0"
              size="xs"
              radius="bottom-left"
            />
            <Shape
              shape={
                <Image
                  src={strapiMediaUrl(slice.shapes[1].img, 'small')}
                  alt={slice.shapes[1].alt}
                  fill
                  style={{ objectFit: slice.shapes[1].objectFit || 'cover' }}
                />
              }
              bottom="0"
              left="0"
              radius="top-right"
            />
          </>
        )}
        <Wrapper>
          <Box maxW="3xl">
            <DefaultSectionHeader
              tagline={slice.tagline}
              title={slice.title}
              text={slice.text}
            />
          </Box>
          <SimpleGrid
            columns={2}
            gap="20"
            rowGap="6"
            mt="16"
            minChildWidth={['100%', null, '16rem']}
          >
            {slice.cards.map((card) => (
              <Box key={card.id} width="full" maxWidth="2xl">
                <QuoteCard
                  key={card.id}
                  avatar={{
                    name: card.avatar.name,
                    description: card.avatar.description,
                    image: (
                      <Image
                        src={strapiMediaUrl(card.avatar.image.img, 'small')}
                        alt={card.avatar.image.alt}
                        fill
                        style={{
                          objectFit: card.avatar.image.objectFit || 'cover',
                        }}
                      />
                    ),
                  }}
                  text={card.text}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Wrapper>
      </Box>
      {slice.hero && (
        <Box marginTop="-40" paddingBottom="28">
          <Wrapper>
            <HeroCard
              title={slice.hero.title}
              subTitle={slice.hero.subTitle}
              link={
                slice.hero.button && {
                  text: slice.hero.button.text,
                  onClick: () => push(strapiLinkUrl(slice.hero?.button)),
                }
              }
              image={
                slice.hero.image && (
                  <Image
                    src={strapiMediaUrl(slice.hero.image.img, 'xLarge')}
                    alt={slice.hero.image.alt}
                    fill
                    style={{ objectFit: slice.hero.image.objectFit || 'cover' }}
                  />
                )
              }
            />
          </Wrapper>
        </Box>
      )}
    </>
  );
};
