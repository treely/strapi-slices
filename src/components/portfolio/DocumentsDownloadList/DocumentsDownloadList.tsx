import StrapiLink from '@/models/strapi/StrapiLink';
import {
  Center,
  Container,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
} from 'boemly';
import { DownloadSimple, FilePdf } from '@phosphor-icons/react';
import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';

export interface DocumentsDownloadListProps {
  documentUrls: StrapiLink[];
}

export const DocumentsDownloadList: React.FC<DocumentsDownloadListProps> = ({
  documentUrls,
}: DocumentsDownloadListProps) => {
  const { formatMessage } = useIntl();

  return (
    <Container p="2">
      <Heading size="xl" textAlign="left">
        <FormattedMessage id="features.portfolio.documentsDownloadList.projectDocuments" />
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
                <FilePdf />
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
              icon={<DownloadSimple />}
              as={Link}
              href={documentUrl.url}
              size="sm"
            />
          </Flex>
        ))}
      </Flex>
    </Container>
  );
};
