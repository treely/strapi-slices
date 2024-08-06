import React from 'react';
import { render, screen } from '../../test/testUtils';
import CreditsAvailableBadge, {
  CreditsAvailableBadgeProps,
} from './CreditsAvailableBadge';
import messagesEn from './messages.en';
import { CreditAvailability } from '../../models/fpm/FPMProject';

const defaultProps: CreditsAvailableBadgeProps = {
  status: CreditAvailability.CREDITS_AVAILABLE,
};

const setup = (props: Partial<CreditsAvailableBadgeProps> = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<CreditsAvailableBadge {...combinedProps} />);
};

describe('The CreditsAvailableBadge component', () => {
  it('renders successfully with minimal props', () => {
    setup({});

    expect(
      screen.getByText(messagesEn['components.creditsAvailableBadge.text.yes'])
    ).toBeInTheDocument();
    expect(
      screen.getByText(messagesEn['components.creditsAvailableBadge.text.yes'])
    ).not.toHaveAttribute('href');
  });

  it('renders a link if specified', () => {
    setup({ href: 'link-to' });

    expect(
      screen.getByText(messagesEn['components.creditsAvailableBadge.text.yes'])
    ).toBeInTheDocument();
    expect(
      screen
        .getByText(messagesEn['components.creditsAvailableBadge.text.yes'])
        .closest('a')
    ).toHaveAttribute('href', 'link-to');
  });

  it('renders correctly for the "some" case', () => {
    setup({ status: CreditAvailability.SOME_CREDITS_AVAILABLE });

    expect(
      screen.getByText(messagesEn['components.creditsAvailableBadge.text.some'])
    ).toBeInTheDocument();
  });

  it('renders correctly for the "no" case', () => {
    setup({ status: CreditAvailability.NO_CREDITS_AVAILABLE });

    expect(
      screen.getByText(messagesEn['components.creditsAvailableBadge.text.no'])
    ).toBeInTheDocument();
  });

  it('renders correctly for the "notYet" case', () => {
    setup({ status: CreditAvailability.SOON_CREDITS_AVAILABLE });

    expect(
      screen.getByText(
        messagesEn['components.creditsAvailableBadge.text.notYet']
      )
    ).toBeInTheDocument();
  });
});
