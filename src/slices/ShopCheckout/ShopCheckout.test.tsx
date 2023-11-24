import { render, screen, userEvent, waitFor } from '@/test/testUtils';
import { DEFAULT_USE_ROUTER_RETURN_VALUE } from '@/test/defaultMocks/next';
import { ShopCheckoutProps } from './ShopCheckout';
import ShopCheckout from '.';
import { useRouter } from '../../../__mocks__/next/router';
import messagesEn from './messages.en';

const pushSpy = jest.fn();

const defaultProps: ShopCheckoutProps = {
  slice: {
    title: 'Title',
    batchId: 'batchId',
    pricePerKg: 0.06,
    initialContributionValue: 60,
    checkoutText: 'Checkout Text',
    currency: 'EUR',
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<ShopCheckout {...combinedProps} />);
};

describe('The ShowCheckout section', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      ...DEFAULT_USE_ROUTER_RETURN_VALUE,
      push: pushSpy,
    });
  });

  afterEach(() => {
    pushSpy.mockRestore();
    useRouter.mockRestore();
  });

  it('displays the title', () => {
    setup();

    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('displays the badge', () => {
    setup({ slice: { ...defaultProps.slice, badge: 'Badge Text' } });

    expect(screen.getByText('Badge Text')).toBeInTheDocument();
  });

  it('navigates to the checkout on submit', async () => {
    setup();

    await userEvent.click(
      screen.getByText(messagesEn['sections.shopCheckout.submit'])
    );

    await waitFor(() => {
      expect(pushSpy).toHaveBeenCalledWith(
        'https://api.fpm.t-staging.com/v1/webhooks/shop/checkout?batchId=batchId&quantity=1000'
      );
    });
  });

  it('adds the coupon-id to the url if it is set', async () => {
    setup({ slice: { ...defaultProps.slice, couponId: 'coupon-id' } });

    await userEvent.click(
      screen.getByText(messagesEn['sections.shopCheckout.submit'])
    );

    await waitFor(() => {
      expect(pushSpy).toHaveBeenCalledWith(
        'https://api.fpm.t-staging.com/v1/webhooks/shop/checkout?batchId=batchId&quantity=1000&couponId=coupon-id'
      );
    });
  });

  it('works with CHF', async () => {
    setup({ slice: { ...defaultProps.slice, currency: 'CHF' } });

    expect(
      screen.getByLabelText(
        messagesEn['sections.shopCheckout.contributionValue.label.CHF']
      )
    ).toBeInTheDocument();

    await userEvent.clear(
      screen.getByLabelText(
        messagesEn['sections.shopCheckout.contributionValue.label.CHF']
      )
    );
    await userEvent.type(
      screen.getByLabelText(
        messagesEn['sections.shopCheckout.contributionValue.label.CHF']
      ),
      '1'
    );
    await userEvent.click(
      screen.getByText(messagesEn['sections.shopCheckout.submit'])
    );

    expect(
      await screen.findByText(
        messagesEn[
          'sections.shopCheckout.contributionValue.validation.tooLow.CHF'
        ]
      )
    ).toBeInTheDocument();
  });

  describe('does not submit', () => {
    it('if the value is empty', async () => {
      setup();

      await userEvent.clear(
        screen.getByLabelText(
          messagesEn['sections.shopCheckout.contributionValue.label.EUR']
        )
      );
      await userEvent.click(
        screen.getByText(messagesEn['sections.shopCheckout.submit'])
      );

      expect(
        await screen.findByText(
          messagesEn['sections.shopCheckout.contributionValue.validation.empty']
        )
      ).toBeInTheDocument();
    });

    it('if the value is too low', async () => {
      setup();

      await userEvent.clear(
        screen.getByLabelText(
          messagesEn['sections.shopCheckout.contributionValue.label.EUR']
        )
      );
      await userEvent.type(
        screen.getByLabelText(
          messagesEn['sections.shopCheckout.contributionValue.label.EUR']
        ),
        '1'
      );
      await userEvent.click(
        screen.getByText(messagesEn['sections.shopCheckout.submit'])
      );

      expect(
        await screen.findByText(
          messagesEn[
            'sections.shopCheckout.contributionValue.validation.tooLow.EUR'
          ]
        )
      ).toBeInTheDocument();
    });

    it('if the value is too high', async () => {
      setup();

      await userEvent.clear(
        screen.getByLabelText(
          messagesEn['sections.shopCheckout.contributionValue.label.EUR']
        )
      );
      await userEvent.type(
        screen.getByLabelText(
          messagesEn['sections.shopCheckout.contributionValue.label.EUR']
        ),
        '1000000'
      );
      await userEvent.click(
        screen.getByText(messagesEn['sections.shopCheckout.submit'])
      );

      expect(
        await screen.findByText(
          messagesEn[
            'sections.shopCheckout.contributionValue.validation.tooHigh'
          ]
        )
      ).toBeInTheDocument();
    });
  });
});
