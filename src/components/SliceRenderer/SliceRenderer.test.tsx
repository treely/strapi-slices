import React from 'react';
import { render, screen } from '../../test/testUtils';
import { SliceRenderer } from '.';
import { SliceRendererProps } from './SliceRenderer';

const defaultProps: SliceRendererProps = {
  slices: [],
  blogPosts: [],
  projects: [],
  customerStories: [],
};

const setup = (props: Partial<SliceRendererProps> = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  return render(<SliceRenderer {...combinedProps} />);
};

describe('The SliceRenderer component', () => {
  it('displays an error message if the given slice is not supported', () => {
    setup({ slices: [{ id: 1, __component: 'Not supported slice' }] });

    expect(
      screen.getByText('Slice component not supported')
    ).toBeInTheDocument();
  });

  it('renders an existing slice without errors', () => {
    setup({
      slices: [
        { id: 1, __component: 'sections.rich-text', content: 'Rich text' },
      ],
    });

    expect(screen.getByText('Rich text')).toBeInTheDocument();
  });

  it('renders a custom slice if given', () => {
    const CustomSlice = () => <div>Custom slice</div>;

    setup({
      slices: [{ id: 1, __component: 'custom.slice' }],
      additionalSlices: [{ id: 'custom.slice', component: <CustomSlice /> }],
    });

    expect(screen.getByText('Custom slice')).toBeInTheDocument();
  });
});
