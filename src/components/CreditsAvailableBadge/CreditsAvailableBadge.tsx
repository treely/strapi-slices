import React, { useContext } from 'react';
import { Flex, Tag, Text } from 'boemly';
import NextLink from 'next/link';
import { IntlContext } from '../ContextProvider';
import { CreditAvailability } from '../../models/fpm/FPMProject';

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
      color: 'green.600',
    },
    [CreditAvailability.NO_CREDITS_AVAILABLE]: {
      message: formatMessage({
        id: 'components.creditsAvailableBadge.text.no',
      }),
      color: 'red.600',
    },
    [CreditAvailability.SOME_CREDITS_AVAILABLE]: {
      message: formatMessage({
        id: 'components.creditsAvailableBadge.text.some',
      }),
      color: 'orange.500',
    },
    [CreditAvailability.SOON_CREDITS_AVAILABLE]: {
      message: formatMessage({
        id: 'components.creditsAvailableBadge.text.notYet',
      }),
      color: 'blue.500',
    },
  };

  const variant = variants[status];

  return (
    <Flex
      justifyContent="flex-start"
      as={href ? NextLink : undefined}
      href={href}
    >
      <Tag backgroundColor={variant.color}>
        <Text color="white" size="xsLowBold">
          {variant.message}
        </Text>
      </Tag>
    </Flex>
  );
};

export default CreditsAvailableBadge;
