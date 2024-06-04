import React from 'react';
import { render, screen } from '@testing-library/react';
import { PreviewAlert } from '.';

const setup = () => {
  render(<PreviewAlert />);
};

describe('The PreviewAlert component', () => {
  it('displays a preview alert', () => {
    setup();

    expect(screen.getByText('Preview')).toBeInTheDocument();
  });
});
