import React, { useContext } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
  useDisclosure,
  useToken,
} from 'boemly';
import { MapPin } from '@phosphor-icons/react';
import NextLink from 'next/link';
import CreditsAvailableBadge from '../../components/CreditsAvailableBadge';
import { IntlContext } from '../../components/ContextProvider';
import { CreditAvailability } from '../../models/fpm/FPMProject';

export interface MapMarkerProps {
  title: string;
  isPublic?: boolean;
  projectDeveloper?: string;
  slug?: string;
  portfolioHost?: string;
  creditAvailability: CreditAvailability;
}

const MapMarker = ({
  title,
  projectDeveloper,
  slug,
  creditAvailability,
  portfolioHost = '',
  isPublic = false,
}: MapMarkerProps) => {
  const { formatMessage } = useContext(IntlContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const blue600 = useToken('colors', 'blue.600');

  return (
    <Flex
      position="absolute"
      gap="4"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      cursor="grab"
    >
      <Box
        as={slug ? NextLink : undefined}
        href={slug && `${portfolioHost}/portfolio/${slug}`}
      >
        <MapPin
          size="40px"
          color={blue600}
          weight="fill"
          data-testid="mapmarker-pin"
          filter="drop-shadow(0px 0px 2px #FFF)"
        />
      </Box>

      {isPublic && isOpen && (
        <Container
          shadow="md"
          width="max-content"
          minWidth="3xs"
          maxWidth={['3xs', null, null, 'sm']}
        >
          <Flex direction="column">
            <CreditsAvailableBadge
              status={creditAvailability}
              href={slug && `${portfolioHost}/portfolio/${slug}`}
            />
            <Spacer height="3" />

            <Heading size="md">{title}</Heading>

            {projectDeveloper && (
              <Text size="smLowNormal" mt="1">
                {projectDeveloper}
              </Text>
            )}

            {slug && (
              <Button
                width="fit-content"
                variant="outline"
                size="sm"
                as={NextLink}
                href={`${portfolioHost}/portfolio/${slug}`}
                mt="4"
                whiteSpace="nowrap"
              >
                {formatMessage({ id: 'sections.projectsMap.link.text' })}
              </Button>
            )}
          </Flex>
        </Container>
      )}
    </Flex>
  );
};

export default MapMarker;
