import { render, screen, userEvent, waitFor } from '@/test/testUtils';
import { pushSpy } from '../../../../__mocks__/next/router';

import SmallCheckout from '.';
import { SmallCheckoutProps } from './SmallCheckout';
import messagesEn from './messages.en';

const defaultProps: SmallCheckoutProps = {
  batchId: 'batchId',
  pricePerKg: 0.06,
  initialContributionValue: 60,
  checkoutText: 'Checkout text',
  currency: 'EUR',
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<SmallCheckout {...combinedProps} />);
};

describe('The SmallCheckout component', () => {
  afterEach(() => {
    pushSpy.mockClear();
  });

  it('displays amount in euro', () => {
    setup();

    expect(
      screen.getByText(
        messagesEn[
          'portfolio.smallCheckout.contributionValueCurrency.label.EUR'
        ]
      )
    ).toBeInTheDocument();
  });

  it('displays amount in tons', () => {
    setup();

    expect(
      screen.getByText(
        messagesEn['portfolio.smallCheckout.contributionValueKgs.label']
      )
    ).toBeInTheDocument();
  });

  it('displays the submit button', () => {
    setup();

    expect(
      screen.getByText(messagesEn['portfolio.smallCheckout.submitButton'])
    ).toBeInTheDocument();
  });

  it('navigates to the checkout on submit', async () => {
    setup();

    await userEvent.clear(
      screen.getByLabelText(
        messagesEn[
          'portfolio.smallCheckout.contributionValueCurrency.label.EUR'
        ]
      )
    );

    await userEvent.type(
      screen.getByLabelText(
        messagesEn[
          'portfolio.smallCheckout.contributionValueCurrency.label.EUR'
        ]
      ),
      '120'
    );

    await userEvent.click(
      screen.getByText(messagesEn['portfolio.smallCheckout.submitButton'])
    );

    await waitFor(() => {
      expect(pushSpy).toHaveBeenCalledWith(
        'https://api.fpm.t-staging.com/v1/webhooks/shop/checkout?batchId=batchId&quantity=2000'
      );
    });
  });

  it('correctly converts tons to EUR', async () => {
    setup();

    await userEvent.clear(
      screen.getByLabelText(
        messagesEn['portfolio.smallCheckout.contributionValueKgs.label']
      )
    );
    await userEvent.type(
      screen.getByLabelText(
        messagesEn['portfolio.smallCheckout.contributionValueKgs.label']
      ),
      '3'
    );

    await userEvent.click(
      screen.getByText(messagesEn['portfolio.smallCheckout.submitButton'])
    );

    await waitFor(() => {
      expect(pushSpy).toHaveBeenCalledWith(
        'https://api.fpm.t-staging.com/v1/webhooks/shop/checkout?batchId=batchId&quantity=3000'
      );
    });
  });

  it('works with CHF', async () => {
    setup({ ...defaultProps, currency: 'CHF' });

    expect(
      screen.getByLabelText(
        messagesEn[
          'portfolio.smallCheckout.contributionValueCurrency.label.CHF'
        ]
      )
    ).toBeInTheDocument();

    await userEvent.clear(
      screen.getByLabelText(
        messagesEn[
          'portfolio.smallCheckout.contributionValueCurrency.label.CHF'
        ]
      )
    );
    await userEvent.type(
      screen.getByLabelText(
        messagesEn[
          'portfolio.smallCheckout.contributionValueCurrency.label.CHF'
        ]
      ),
      '1'
    );
    await userEvent.click(
      screen.getByText(messagesEn['portfolio.smallCheckout.submitButton'])
    );

    expect(
      await screen.findByText(
        messagesEn[
          'portfolio.smallCheckout.contributionValueCurrency.validation.tooLow.CHF'
        ]
      )
    ).toBeInTheDocument();
  });

  it('displays customTitle, customSubtitle and customButton if they are defined im slice', () => {
    setup({
      ...defaultProps,
      title: 'Custom Title',
      subtitle: 'Custom Subtitle',
      button: { id: 1, url: 'customButtonUrl', text: 'Custom Button' },
    });

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();

    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByText('Custom Button')).toBeInTheDocument();
  });
});
