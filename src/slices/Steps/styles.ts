import styled from '@emotion/styled';
import { BREAKPOINT_MD } from '@/constants/breakpoints';

export const StepsContainer = styled.div`
  margin-top: var(--boemly-space-24);

  @media screen and (max-width: ${BREAKPOINT_MD}) {
    margin-top: var(--boemly-space-16);
  }
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ProgressDividerProps {
  progress: number;
}

export const ProgressDivider = styled.div<ProgressDividerProps>`
  position: relative;

  margin: var(--boemly-space-4) 0 var(--boemly-space-6) 0;

  height: 2.75rem;

  & .dotted {
    position: absolute;
    height: 100%;
    border-left: dashed 1px white;
    opacity: 0.5;
  }

  & .progress {
    position: absolute;
    height: ${({ progress }) => `${progress}%`};
    border-right: solid 1px white;
    opacity: 1;

    transition: height ease var(--medium-transition-duration);
  }
`;

export const StepNumber = styled.div`
  width: 2.5rem;
  height: 2.5rem;

  border-radius: var(--boemly-radii-full);
  background-color: var(--boemly-colors-white);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
