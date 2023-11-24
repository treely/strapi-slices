import { DefaultSectionHeader, Flex, Gradient, Wrapper } from 'boemly';
import Image from 'next/image';
import strapiMediaUrl from '@/utils/strapiMediaUrl';
import StrapiLinkButton from '@/components/StrapiLinkButton';
import StrapiImage from '@/models/strapi/StrapiImage';
import StrapiLink from '@/models/strapi/StrapiLink';
import StrapiButtonWithVariant from '@/models/strapi/StrapiButtonWithVariant';
import { ShapeContainer, HeadingContainer, HeroContainer } from './styles';

export interface HeroProps {
  slice: {
    tagline?: string;
    title: string;
    subTitle: string;
    button?: StrapiLink;
    additionalButtons: StrapiButtonWithVariant[];
    image?: StrapiImage;
    textAlign: 'left' | 'center';
    shape?: StrapiImage;
  };
}

export const Hero: React.FC<HeroProps> = ({ slice }: HeroProps) => (
  <HeroContainer>
    {slice.image && (
      <>
        <Image
          src={strapiMediaUrl(slice.image.img, 'xLarge')}
          alt={slice.image.alt}
          fill
          style={{ objectFit: slice.image.objectFit || 'cover' }}
        />
        <Gradient />
      </>
    )}
    {slice.shape && (
      <ShapeContainer>
        <Image
          src={strapiMediaUrl(slice.shape.img, 'medium')}
          alt={slice.shape.alt}
          fill
          style={{ objectFit: slice.shape.objectFit || 'cover' }}
        />
      </ShapeContainer>
    )}
    <HeadingContainer textAlign={slice.textAlign}>
      <Wrapper>
        <>
          <DefaultSectionHeader
            isHero
            tagline={slice.tagline}
            title={slice.title}
            text={slice.subTitle}
            taglineProps={{ color: 'white' }}
            titleProps={{
              color: 'white',
              maxW: slice.textAlign === 'center' ? '4xl' : '3xl',
              mx: slice.textAlign === 'center' ? 'auto' : 'unset',
              textAlign: slice.textAlign,
            }}
            textProps={{
              maxW: '2xl',
              mx: slice.textAlign === 'center' ? 'auto' : 'unset',
              textAlign: slice.textAlign,
              color: 'white',
            }}
          />

          <Flex
            gap="8"
            justifyContent={slice.textAlign === 'center' ? 'center' : 'start'}
          >
            {slice.button && (
              <StrapiLinkButton
                key={slice.button.id}
                mt="10"
                size="xl"
                link={slice.button}
              />
            )}
            {slice.additionalButtons.map((button) => (
              <StrapiLinkButton
                key={button.button.id}
                mt="10"
                size="xl"
                variant={button.variant}
                link={button.button}
              />
            ))}
          </Flex>
        </>
      </Wrapper>
    </HeadingContainer>
  </HeroContainer>
);
