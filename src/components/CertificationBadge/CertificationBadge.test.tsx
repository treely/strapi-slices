import React from 'react';
import { render, screen } from '../../test/testUtils';
import CertificationBadge, {
  CertificationBadgeProps,
} from './CertificationBadge';
import messagesEn from './messages.en';

const defaultProps: CertificationBadgeProps = {};

const setup = (props: Partial<CertificationBadgeProps> = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<CertificationBadge {...combinedProps} />);
};

describe('The CertificationBadge component', () => {
  describe('default variant', () => {
    it('renders "Certification in progress" when no certificationDate is provided', () => {
      setup({});

      expect(
        screen.getByText(
          messagesEn['components.certificationBadge.certificationInProgress']
        )
      ).toBeInTheDocument();
    });

    it('renders "Certified, {year}" when certificationDate is provided', () => {
      setup({ certificationDate: '2024-06-15' });

      expect(screen.getByText('Certified, 2024')).toBeInTheDocument();
    });
  });

  describe('withIcon variant', () => {
    it('renders "Certification in progress" when no certificationDate is provided', () => {
      setup({ variant: 'withIcon' });

      expect(
        screen.getByText(
          messagesEn['components.certificationBadge.certificationInProgress']
        )
      ).toBeInTheDocument();
    });

    it('renders "Certified, {year}" when certificationDate is provided', () => {
      setup({ variant: 'withIcon', certificationDate: '2025-03-20' });

      expect(screen.getByText('Certified, 2025')).toBeInTheDocument();
    });
  });
});
