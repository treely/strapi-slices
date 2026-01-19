import { useContext } from 'react';
import { BoemlyTag, Flex, Text } from 'boemly';
import NextLink from 'next/link';
import { ShoppingCartIcon } from '@phosphor-icons/react';
import { IntlContext } from '../ContextProvider';
import { CreditAvailability } from '../../models/fpm/FPMProject';

export interface CreditsAvailableBadgeProps {
  status: CreditAvailability;
  href?: string;
  variant?: 'default' | 'withIcon';
}

const CreditsAvailableBadge = ({
  status,
  href,
  variant = 'default',
}: CreditsAvailableBadgeProps) => {
  const { formatMessage } = useContext(IntlContext);

  const variants: Record<
    CreditAvailability,
    {
      message: string;
      color: string;
      withIconColor?: string;
    }
  > = {
    [CreditAvailability.CREDITS_AVAILABLE]: {
      message: formatMessage({
        id: 'components.creditsAvailableBadge.text.yes',
      }),
      color: 'primary.800',
      withIconColor: 'primary.700',
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

  const config = variants[status];

  const backgroundColor =
    variant === 'withIcon'
      ? config.withIconColor || config.color
      : config.color;

  const defaultBadge = (
    <BoemlyTag backgroundColor={backgroundColor}>
      <Text color="white" size="xsLowBold">
        {config.message}
      </Text>
    </BoemlyTag>
  );

  const withIconBadge = (
    <BoemlyTag backgroundColor={backgroundColor} borderRadius="full">
      <Flex alignItems="center" gap="2">
        <ShoppingCartIcon size={16} color="white" weight="bold" />
        <Text size="smRegularNormalBold" color="white">
          {config.message}
        </Text>
      </Flex>
    </BoemlyTag>
  );

  const badge = variant === 'withIcon' ? withIconBadge : defaultBadge;

  return (
    <Flex justifyContent="flex-start">
      {href ? <NextLink href={href}>{badge}</NextLink> : badge}
    </Flex>
  );
};

export default CreditsAvailableBadge;
