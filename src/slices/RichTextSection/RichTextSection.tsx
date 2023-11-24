import {
  DefaultSectionContainer,
  Grid,
  GridItem,
  RichText,
  Wrapper,
} from 'boemly';

export interface RichTextSectionProps {
  slice: {
    content: string;
  };
}

export const RichTextSection: React.FC<RichTextSectionProps> = ({
  slice,
}: RichTextSectionProps) => (
  <DefaultSectionContainer>
    <Wrapper>
      <Grid templateColumns="repeat(12, 1fr)" gap="4">
        <GridItem colSpan={[12, null, null, 7]}>
          <RichText content={slice.content} />
        </GridItem>
      </Grid>
    </Wrapper>
  </DefaultSectionContainer>
);
