import { Check, X } from '@phosphor-icons/react';
import { Box } from 'boemly';

export interface IconProps {
  variant: 'gray' | 'green' | 'white';
  icon: string;
}

const BULLET_POINT_VARIANTS = {
  gray: { bulletPointColor: 'black' },
  green: { bulletPointColor: 'white' },
  white: { bulletPointColor: 'black' },
};

export const Icon = ({ variant, icon }: IconProps): JSX.Element => {
  switch (icon) {
    case 'check':
      return <Check size={20} color="var(--boemly-colors-primary-500)" />;
    case 'cross':
      return <X size={20} color="var(--boemly-colors-red-500)" />;
    default:
      return (
        <Box
          data-testid="bullet-point-box"
          borderRadius="full"
          backgroundColor={BULLET_POINT_VARIANTS[variant].bulletPointColor}
          width="2"
          height="2"
          margin="1.5"
        />
      );
  }
};
export default Icon;
