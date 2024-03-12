import React from 'react';
import { DefaultSectionHeader, Flex, useMediaQuery, Wrapper } from 'boemly';
import Image from 'next/image';
import { BREAKPOINT_LG_QUERY } from '../../constants/breakpoints';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import StrapiImage from '../../models/strapi/StrapiImage';
import StrapiLink from '../../models/strapi/StrapiLink';
import {
  MapHeroContainer,
  MapHeroTextContainer,
  ShapeContainer,
  MapContainer,
  MapGradient,
} from './styles';

export interface MapHeroProps {
  slice: {
    tagline?: string;
    title: string;
    subTitle?: string;
    buttons?: StrapiLink[];
    shape?: StrapiImage;
    map: StrapiImage;
    mobileMap: StrapiImage;
  };
}

export const MapHero: React.FC<MapHeroProps> = ({ slice }: MapHeroProps) => {
  const [belowBreakpoint] = useMediaQuery(BREAKPOINT_LG_QUERY);

  return (
    <MapHeroContainer maxWidth="full">
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
      <MapHeroTextContainer>
        <Wrapper>
          <>
            <DefaultSectionHeader
              isHero
              tagline={slice.tagline}
              title={slice.title}
              text={slice.subTitle}
              titleProps={{ maxW: ['100%', null, null, null, '60%'] }}
              textProps={{ maxW: ['100%', null, null, null, '55%'] }}
            />
            {slice.buttons && slice.buttons.length > 0 && (
              <Flex mt="10" flexDir="row" gap="5">
                <StrapiLinkButton link={slice.buttons[0]} size="xl" />
                {slice.buttons.length === 2 && (
                  <StrapiLinkButton
                    link={slice.buttons[1]}
                    variant="outline"
                    size="xl"
                  />
                )}
              </Flex>
            )}
          </>
        </Wrapper>
      </MapHeroTextContainer>
      <MapContainer>
        {belowBreakpoint ? (
          <Image
            src={strapiMediaUrl(slice.mobileMap.img, 'xLarge')}
            alt={slice.mobileMap.alt}
            fill
            style={{ objectFit: slice.mobileMap.objectFit || 'contain' }}
          />
        ) : (
          <Image
            src={strapiMediaUrl(slice.map.img, 'xLarge')}
            alt={slice.map.alt}
            fill
            style={{ objectFit: slice.map.objectFit || 'cover' }}
          />
        )}
        <MapGradient />
      </MapContainer>
    </MapHeroContainer>
  );
};
