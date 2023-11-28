import React from 'react';
import {
  Box,
  Heading,
  HeroCard,
  SimpleGrid,
  Text,
  BoemlyAccordion,
  Wrapper,
  Flex,
  Spacer,
} from 'boemly';
import { ArrowRight } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import StrapiLink from '../../models/strapi/StrapiLink';
import strapiLinkUrl from '../../utils/strapiLinkUrl';
import StrapiHeroCard from '../../models/strapi/StrapiHeroCard';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import StrapiLinkButton from '../../components/StrapiLinkButton';
import convertToKebabCase from '../../utils/convertToKebabCase';

const VARIANTS = {
  gray: {
    backgroundColor: 'primary.50',
    tagLineColor: 'primary.500',
    textColor: 'black',
    accordionVariant: 'black',
    otherQuestionsBackground: 'primary.700',
  },
  green: {
    backgroundColor: 'primary.800',
    tagLineColor: 'white',
    textColor: 'white',
    accordionVariant: 'white',
    otherQuestionsBackground: 'primary.900',
  },
  white: {
    backgroundColor: 'white',
    tagLineColor: 'primary.500',
    textColor: 'black',
    accordionVariant: 'black',
    otherQuestionsBackground: 'primary.700',
  },
};

export interface QAndAProps {
  slice: {
    tagline: string;
    title: string;
    questionsAndAnswers: {
      id: number;
      key: string;
      value: string;
    }[];
    otherQuestions: string;
    button: StrapiLink;
    hero?: StrapiHeroCard;
    variant?: keyof typeof VARIANTS;
  };
}

export const QAndA: React.FC<QAndAProps> = ({ slice }: QAndAProps) => {
  const { push } = useRouter();

  const variant = VARIANTS[slice.variant ?? 'green'];

  return (
    <>
      <Box
        pb={slice.hero ? 80 : 28}
        id={convertToKebabCase(slice.title)}
        backgroundColor={variant.backgroundColor}
      >
        <Wrapper>
          <SimpleGrid columns={[1, null, null, 2]}>
            <Box mr="16" paddingY="28">
              <Text size="mdMonoUppercase" color={variant.tagLineColor}>
                {slice.tagline}
              </Text>
              <Heading
                as="h2"
                size="3xl"
                color={variant.textColor}
                mt="6"
                mb="16"
              >
                {slice.title}
              </Heading>
            </Box>
            <Box
              maxHeight={['unset', null, null, 'xl']}
              paddingTop={['0', null, null, '28']}
              paddingRight={['0', null, null, '6']}
              overflowY={['unset', null, null, 'scroll']}
            >
              <Box>
                <BoemlyAccordion
                  rows={slice.questionsAndAnswers}
                  defaultIndex={0}
                  variant={variant.accordionVariant as 'white' | 'black'}
                />
                <Flex
                  padding="8"
                  backgroundColor={variant.otherQuestionsBackground}
                  borderRadius="2xl"
                  mt="14"
                  flexDir={['column', null, null, 'row']}
                  justifyContent={['flex-start', null, null, 'space-between']}
                  alignItems={['flex-start', null, null, 'center']}
                >
                  <Heading as="h6" size="sm" color="white">
                    {slice.otherQuestions}
                  </Heading>
                  <Spacer minHeight={['4', null, null, '0']} />
                  <StrapiLinkButton
                    size="lg"
                    colorScheme="white"
                    background="white"
                    rightIcon={<ArrowRight />}
                    link={slice.button}
                  />
                </Flex>
              </Box>
            </Box>
          </SimpleGrid>
        </Wrapper>
      </Box>

      {slice.hero && (
        <Box pb="28" mt="-56">
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
