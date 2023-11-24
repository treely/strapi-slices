import CreditsAvailableState from '@/models/CreditsAvailableState';
import { Badge } from 'boemly';
import NextLink from 'next/link';
import { useIntl } from 'react-intl';

export interface CreditsAvailableBadgeProps {
  status: CreditsAvailableState;
  href?: string;
}

const CreditsAvailableBadge = ({
  status,
  href,
}: CreditsAvailableBadgeProps) => {
  const { formatMessage } = useIntl();

  const variants: Record<
    CreditsAvailableState,
    { color: string; text: string }
  > = {
    [CreditsAvailableState.YES]: {
      color: 'green',
      text: formatMessage({ id: 'components.creditsAvailableBadge.text.yes' }),
    },
    [CreditsAvailableState.SOME]: {
      color: 'orange',
      text: formatMessage({ id: 'components.creditsAvailableBadge.text.some' }),
    },
    [CreditsAvailableState.NO]: {
      color: 'red',
      text: formatMessage({ id: 'components.creditsAvailableBadge.text.no' }),
    },
    [CreditsAvailableState.NOT_YET]: {
      color: 'blue',
      text: formatMessage({
        id: 'components.creditsAvailableBadge.text.notYet',
      }),
    },
  };

  const variant = variants[status];

  return (
    <Badge
      as={href ? NextLink : undefined}
      href={href}
      colorScheme={variant.color}
      width="fit-content"
    >
      {variant.text}
    </Badge>
  );
};

export default CreditsAvailableBadge;
