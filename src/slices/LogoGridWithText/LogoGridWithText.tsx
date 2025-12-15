import React from 'react';
import {
  Box,
  DefaultSectionContainer,
  Flex,
  Heading,
  RichText,
  SimpleGrid,
  useToken,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import { ArrowRightIcon } from '@phosphor-icons/react';
import strapiLinkUrl from '../../utils/strapiLinkUrl';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import StrapiImageWithLink from '../../models/strapi/StrapiImageWithLink';
import StrapiLink from '../../models/strapi/StrapiLink';

export interface LogoGridWithTextProps {
  slice: {
    title: string;
    text: string;
    button?: StrapiLink;
    logos: StrapiImageWithLink[];
  };
}

export const LogoGridWithText: React.FC<LogoGridWithTextProps> = ({
  slice,
}: LogoGridWithTextProps) => {
  const [primary50] = useToken('colors', ['primary.50']);

  return (
    <DefaultSectionContainer backgroundColor={primary50} title={slice.title}>
      <Wrapper>
        <SimpleGrid columns={2} gap="28" minChildWidth="16rem">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Heading as="h2" size="3xl" mb="4">
              {slice.title}
            </Heading>
            <RichText content={slice.text} />
            {slice.button && (
              <StrapiLinkButton
                link={slice.button}
                size="md"
                colorPalette="white"
                variant="outline"
                mt="6"
                rightIcon={<ArrowRightIcon />}
                component="LogoGridWithText"
              />
            )}
          </Box>
          <Flex flexDir="row" flexWrap="wrap" gap={['12', null, null, '28']}>
            {slice.logos.map((logo) => (
              <Flex
                key={logo.id}
                justifyContent="center"
                alignItems="center"
                flexGrow={1}
                flexShrink={0}
                flexBasis={slice.logos.length > 2 ? '34%' : '90%'} // 34% are just enough to not allow three in one row
              >
                <Box position="relative" height="20" width="100%">
                  {logo.link ? (
                    <a href={strapiLinkUrl(logo.link)}>
                      <Image
                        src={strapiMediaUrl(logo.img, 'small')}
                        alt={logo.alt}
                        fill
                        style={{ objectFit: logo.objectFit || 'contain' }}
                      />
                    </a>
                  ) : (
                    <Image
                      src={strapiMediaUrl(logo.img, 'small')}
                      alt={logo.alt}
                      fill
                      style={{ objectFit: logo.objectFit || 'contain' }}
                    />
                  )}
                </Box>
              </Flex>
            ))}
          </Flex>
        </SimpleGrid>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
