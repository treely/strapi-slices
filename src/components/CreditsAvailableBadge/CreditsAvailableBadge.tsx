import React, { useContext } from 'react';
import { Flex, Spacer, Tag, Text } from 'boemly';
import NextLink from 'next/link';
import { IntlContext } from '../ContextProvider';
import { CreditAvailability } from '../../models/fpm/FPMProject';
import { Info } from '@phosphor-icons/react';

export interface CreditsAvailableBadgeProps {
  status: CreditAvailability;
  href?: string;
}

const CreditsAvailableBadge = ({
  status,
  href,
}: CreditsAvailableBadgeProps) => {
  const { formatMessage } = useContext(IntlContext);

  const variants: Record<
    CreditAvailability,
    { message: string; color: string }
  > = {
    [CreditAvailability.CREDITS_AVAILABLE]: {
      message: formatMessage({
        id: 'components.creditsAvailableBadge.text.yes',
      }),
      color: 'var(--boemly-colors-primary-800)',
    },
    [CreditAvailability.NO_CREDITS_AVAILABLE]: {
      message: formatMessage({
        id: 'components.creditsAvailableBadge.text.no',
      }),
      color: 'var(--boemly-colors-red-600)',
    },
    [CreditAvailability.SOME_CREDITS_AVAILABLE]: {
      message: formatMessage({
        id: 'components.creditsAvailableBadge.text.some',
      }),
      color: 'var(--boemly-colors-orange-500)',
    },
    [CreditAvailability.SOON_CREDITS_AVAILABLE]: {
      message: formatMessage({
        id: 'components.creditsAvailableBadge.text.notYet',
      }),
      color: 'var(--boemly-colors-blue-500)',
    },
  };

  const variant = variants[status];

  return (
    <Flex
      justifyContent="flex-start"
      as={href ? NextLink : undefined}
      href={href}
    >
      <Tag backgroundColor={variant.color} mt="2" mb="1">
        <Info size={12} color="white" weight="fill" />
        <Spacer width="1" />
        <Text color="white" size="xsLowBold">
          {variant.message}
        </Text>
      </Tag>
    </Flex>
  );
};

export default CreditsAvailableBadge;
