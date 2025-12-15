import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../test/testUtils';
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
