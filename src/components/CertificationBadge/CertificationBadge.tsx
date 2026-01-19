import { useContext } from 'react';
import { BoemlyTag, Flex, Text } from 'boemly';
import { SealCheckIcon } from '@phosphor-icons/react';
import { IntlContext } from '../ContextProvider';

export interface CertificationBadgeProps {
  certificationDate?: string | Date;
  variant?: 'default' | 'withIcon';
}

const CertificationBadge = ({
  certificationDate,
  variant = 'default',
}: CertificationBadgeProps) => {
  const { formatMessage } = useContext(IntlContext);

  const isCertified = !!certificationDate;

  const defaultBadge = (
    <BoemlyTag backgroundColor="gray.100">
      <Text size="xsLowBold" color="gray.800">
        {isCertified
          ? formatMessage(
              { id: 'components.certificationBadge.certified' },
              { year: new Date(certificationDate).getFullYear() }
            )
          : formatMessage({
              id: 'components.certificationBadge.certificationInProgress',
            })}
      </Text>
    </BoemlyTag>
  );

  const withIconBadge = isCertified ? (
    <BoemlyTag backgroundColor="primary.700" borderRadius="full">
      <Flex alignItems="center" gap="2">
        <SealCheckIcon size={16} color="white" weight="bold" />
        <Text size="smRegularNormalBold" color="white">
          {formatMessage(
            { id: 'components.certificationBadge.certified' },
            { year: new Date(certificationDate).getFullYear() }
          )}
        </Text>
      </Flex>
    </BoemlyTag>
  ) : (
    <BoemlyTag backgroundColor="gray.100" borderRadius="full">
      <Flex alignItems="center" gap="2">
        <SealCheckIcon size={16} color="gray.800" weight="bold" />
        <Text size="smRegularNormalBold" color="gray.800">
          {formatMessage({
            id: 'components.certificationBadge.certificationInProgress',
          })}
        </Text>
      </Flex>
    </BoemlyTag>
  );

  return variant === 'withIcon' ? withIconBadge : defaultBadge;
};

export default CertificationBadge;
