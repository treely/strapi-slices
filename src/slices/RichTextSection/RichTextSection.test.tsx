import React from 'react';
import { render, screen } from '../../test/testUtils';
import RichTextSection from '.';
import { RichTextSectionProps } from './RichTextSection';

const defaultProps: RichTextSectionProps = {
  slice: { content: 'Content' },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<RichTextSection {...combinedProps} />);
};

describe('The RichText component', () => {
  it('displays the content', () => {
    setup();

    expect(screen.getByText(defaultProps.slice.content)).toBeInTheDocument();
  });
});
