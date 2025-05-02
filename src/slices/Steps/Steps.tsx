import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Center,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Flex,
  Gradient,
  Heading,
  RichText,
  ShapesCard,
  Text,
  useToken,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import { useWindowScroll, useWindowSize } from 'react-use';
import { useRouter } from 'next/router';
import StrapiShapesCard from '../../models/strapi/StrapiShapesCard';
import StrapiDefaultHeader from '../../models/strapi/StrapiDefaultHeader';
import strapiMediaUrl from '../../utils/strapiMediaUrl';
import strapiLinkUrl from '../../utils/strapiLinkUrl';
import StrapiImage from '../../models/strapi/StrapiImage';
import { AnalyticsContext } from '../../components/ContextProvider/ContextProvider';

interface StepsSlice extends StrapiDefaultHeader {
  steps: {
    id: number;
    step: number;
    title: string;
    text?: string;
  }[];
  image?: StrapiImage;
  card?: StrapiShapesCard;
}
export interface StepsProps {
  slice: StepsSlice;
}

export const Steps: React.FC<StepsProps> = ({ slice }: StepsProps) => {
  const { push } = useRouter();
  const analyticsFunction = useContext(AnalyticsContext);

  const [gray900] = useToken('colors', ['gray.900']);

  const containerRef = useRef<HTMLDivElement>(null);

  const [stepRefs, setStepRefs] = useState(new Array(slice.steps.length));
  const [stepProgress, setStepProgress] = useState(
    new Array(slice.steps.length)
  );

  const { y: offsetY } = useWindowScroll();
  const { height: windowHeight } = useWindowSize();

  const handleShapesCardButtonClick = () => {
    if (slice.card?.button) {
      analyticsFunction?.({
        type: 'track',
        props: {
          action: 'click',
          component: 'Steps',
          buttonText: slice.card.button.text,
          buttonUrl: strapiLinkUrl(slice.card.button),
          section: 'card',
        },
      });
      push(strapiLinkUrl(slice.card.button));
    }
  };
  useEffect(() => {
    setStepRefs(slice.steps.map(() => createRef()));
  }, []);

  useEffect(() => {
    const containerOffsetTop = containerRef.current?.offsetTop || 0;
    setStepProgress(
      stepRefs.map((ref) => {
        const currentItemOffsetTop = ref.current?.offsetTop || 0;
        return containerOffsetTop + currentItemOffsetTop <
          offsetY + windowHeight / 3
          ? 100
          : 0;
      })
    );
  }, [offsetY]);

  return (
    <div ref={containerRef}>
      <DefaultSectionContainer backgroundColor={gray900} title={slice.title}>
        <>
          {slice.image && (
            <Box
              position="absolute"
              top="0"
              left="0"
              width="full"
              height="full"
            >
              <Image
                src={strapiMediaUrl(slice.image.img, 'xLarge')}
                alt={slice.image.alt}
                fill
                style={{ objectFit: slice.image.objectFit || 'cover' }}
              />
              <Gradient />
            </Box>
          )}
        </>
        <Wrapper>
          <>
            <DefaultSectionHeader
              tagline={slice.tagline}
              title={slice.title}
              text={slice.text}
              taglineProps={{ textAlign: 'center' }}
              titleProps={{
                textAlign: 'center',
                maxW: '2xl',
                marginX: 'auto',
                color: 'white',
              }}
              textProps={{
                textAlign: 'center',
                maxW: 'xl',
                marginX: 'auto',
                color: 'whiteAlpha.800',
              }}
            />

            <Box marginTop={['16', null, '24']}>
              {slice.steps.map(({ id, step, title, text }, index) => (
                <Flex flexDir="column" alignItems="center" key={id}>
                  <Center
                    width="10"
                    height="10"
                    borderRadius="full"
                    backgroundColor="white"
                  >
                    <Text size="smRegularNormal" color="black">
                      {step}
                    </Text>
                  </Center>
                  <Heading size="lg" color="white" mt="4" textAlign="center">
                    {title}
                  </Heading>
                  {text && (
                    <Box maxW="xl" mt="4">
                      <RichText
                        options={{ forceBlock: true }}
                        content={text}
                        textProps={{
                          size: 'mdRegularNormal',
                          color: 'whiteAlpha.700',
                          textAlign: 'center',
                        }}
                      />
                    </Box>
                  )}
                  {(index + 1 < slice.steps.length || slice.card) && (
                    <Box
                      ref={stepRefs[index]}
                      position="relative"
                      marginTop="4"
                      marginBottom="6"
                      height="12"
                    >
                      <Box
                        position="absolute"
                        height="full"
                        borderLeft="dashed 1px white"
                        opacity="0.5"
                      />
                      <Box
                        position="absolute"
                        height={`${stepProgress[index]}%`}
                        borderRight="solid 1px white"
                        opacity="1"
                        transition="height ease var(--medium-transition-duration)"
                      />
                    </Box>
                  )}
                </Flex>
              ))}
            </Box>

            {slice.card && (
              <ShapesCard
                tagline={slice.card.tagline}
                title={slice.card.title}
                text={slice.card.text}
                shapes={
                  slice.card.shapes &&
                  slice.card.shapes?.map((shape) => (
                    <Image
                      key={shape.id}
                      src={strapiMediaUrl(shape.img, 'small')}
                      alt={shape.alt}
                      fill
                      style={{ objectFit: shape.objectFit || 'cover' }}
                    />
                  ))
                }
                button={
                  slice.card.button && {
                    text: slice.card.button.text,
                    onClick: handleShapesCardButtonClick,
                  }
                }
              />
            )}
          </>
        </Wrapper>
      </DefaultSectionContainer>
    </div>
  );
};
