import {
  Box,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Gradient,
  Heading,
  RichText,
  ShapesCard,
  Text,
  useToken,
  Wrapper,
} from 'boemly';
import Image from 'next/image';
import { createRef, useEffect, useRef, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';
import { useRouter } from 'next/router';
import StrapiShapesCard from '@/models/strapi/StrapiShapesCard';
import StrapiDefaultHeader from '@/models/strapi/StrapiDefaultHeader';
import strapiMediaUrl from '@/utils/strapiMediaUrl';
import strapiLinkUrl from '@/utils/strapiLinkUrl';
import StrapiImage from '@/models/strapi/StrapiImage';
import {
  ImageContainer,
  ProgressDivider,
  StepContainer,
  StepNumber,
  StepsContainer,
} from './styles';

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
  const [gray900] = useToken('colors', ['gray.900']);

  const containerRef = useRef<HTMLDivElement>(null);

  const [stepRefs, setStepRefs] = useState(new Array(slice.steps.length));
  const [stepProgress, setStepProgress] = useState(
    new Array(slice.steps.length)
  );

  const { y: offsetY } = useWindowScroll();
  const { height: windowHeight } = useWindowSize();

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
            <ImageContainer>
              <Image
                src={strapiMediaUrl(slice.image.img, 'xLarge')}
                alt={slice.image.alt}
                fill
                style={{ objectFit: slice.image.objectFit || 'cover' }}
              />
              <Gradient />
            </ImageContainer>
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

            <StepsContainer>
              {slice.steps.map(({ id, step, title, text }, index) => (
                <StepContainer key={id}>
                  <StepNumber>
                    <Text size="smRegularNormal" color="black">
                      {step}
                    </Text>
                  </StepNumber>
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
                    <ProgressDivider
                      ref={stepRefs[index]}
                      progress={stepProgress[index]}
                    >
                      <div className="dotted" />
                      <div className="progress" />
                    </ProgressDivider>
                  )}
                </StepContainer>
              ))}
            </StepsContainer>

            {slice.card && (
              <ShapesCard
                tagline={slice.card.tagline}
                title={slice.card.title}
                text={slice.card.text}
                shapes={
                  slice.card.shapes &&
                  slice.card.shapes?.map((shape) => (
                    <Image
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
                    onClick: () => push(strapiLinkUrl(slice.card?.button)),
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
