import React, { useContext } from 'react';
import StrapiLink from '../../../models/strapi/StrapiLink';
import {
  Center,
  Container,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
} from 'boemly';
import { DownloadSimpleIcon, FilePdfIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { IntlContext } from '../../ContextProvider';

export interface DocumentsDownloadListProps {
  documentUrls: StrapiLink[];
}

export const DocumentsDownloadList: React.FC<DocumentsDownloadListProps> = ({
  documentUrls,
}: DocumentsDownloadListProps) => {
  const { formatMessage } = useContext(IntlContext);

  return (
    <Container p="2">
      <Heading size="xl" textAlign="left">
        {formatMessage({
          id: 'features.portfolio.documentsDownloadList.projectDocuments',
        })}
      </Heading>

      <Flex flexDir="column">
        {documentUrls.map((documentUrl) => (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mt="6"
            key={documentUrl.text}
          >
            <Flex alignItems="center">
              <Center
                w="8"
                h="8"
                borderRadius="full"
                borderWidth="1px"
                borderColor="grey.200"
              >
                <FilePdfIcon />
              </Center>

              <Spacer width="4" />

              <Flex flexDir="column">
                <Text size="smMonoNormal">PDF</Text>
                <Text size="mdLowBold" color="black" textAlign="left">
                  {documentUrl.text}
                </Text>
              </Flex>
            </Flex>

            <Spacer width="32" />

            <IconButton
              variant="outline"
              aria-label={formatMessage({
                id: 'features.portfolio.documentsDownloadList.downloadDocument',
              })}
              size="sm"
              asChild
            >
              <Link href={documentUrl.url || '#'}>
                <DownloadSimpleIcon />
              </Link>
            </IconButton>
          </Flex>
        ))}
      </Flex>
    </Container>
  );
};
