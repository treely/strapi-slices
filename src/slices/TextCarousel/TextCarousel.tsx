import {
  Center,
  DefaultSectionContainer,
  DefaultSectionHeader,
  TextCardWithIcon,
  useToken,
  Wrapper,
} from 'boemly';
import { useRef } from 'react';
import Image from 'next/image';
import strapiMediaUrl from '@/utils/strapiMediaUrl';
import StrapiDefaultHeader from '@/models/strapi/StrapiDefaultHeader';
import StrapiLink from '@/models/strapi/StrapiLink';
import StrapiTextCardWithIcon from '@/models/strapi/StrapiTextCardWithIcons';
import StrapiLinkButton from '@/components/StrapiLinkButton';
import {
  CardContainer,
  CarouselContainer,
  CarouselInnerContainer,
} from './styles';

interface TextCarouselSlice extends StrapiDefaultHeader {
  slides: StrapiTextCardWithIcon[];
  button?: StrapiLink;
}
export interface TextCarouselProps {
  slice: TextCarouselSlice;
}

export const TextCarousel: React.FC<TextCarouselProps> = ({
  slice,
}: TextCarouselProps) => {
  const [primary50] = useToken('colors', ['primary.50']);

  const containerRef = useRef(null);

  return (
    <DefaultSectionContainer backgroundColor={primary50} title={slice.title}>
      <Wrapper>
        <DefaultSectionHeader
          tagline={slice.tagline}
          title={slice.title}
          text={slice.text}
          taglineProps={{ textAlign: 'center' }}
          titleProps={{ textAlign: 'center', maxW: '6xl', marginX: 'auto' }}
          textProps={{ textAlign: 'center', maxW: '2xl', marginX: 'auto' }}
        />
      </Wrapper>

      <CarouselContainer ref={containerRef}>
        <CarouselInnerContainer
          drag="x"
          dragConstraints={containerRef}
          numberOfItems={slice.slides.length}
        >
          {slice.slides.map(({ id, title, text, icon }) => (
            <CardContainer key={id} numberOfItems={slice.slides.length}>
              <TextCardWithIcon
                title={title}
                text={text}
                icon={
                  <Image
                    src={strapiMediaUrl(icon.img, 'small')}
                    alt={icon.alt}
                    fill
                    style={{ objectFit: icon.objectFit || 'contain' }}
                  />
                }
                displayAs="column"
              />
            </CardContainer>
          ))}
        </CarouselInnerContainer>
      </CarouselContainer>

      <>
        {slice.button && (
          <Wrapper>
            <Center>
              <StrapiLinkButton
                link={slice.button}
                size="xl"
                mt={['8', null, '14']}
              />
            </Center>
          </Wrapper>
        )}
      </>
    </DefaultSectionContainer>
  );
};
