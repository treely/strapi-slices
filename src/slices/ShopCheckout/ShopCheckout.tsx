import React, { useContext, useCallback } from 'react';
import {
  Badge,
  BoemlyFormControl,
  Box,
  Button,
  Container,
  DefaultSectionContainer,
  DefaultSectionHeader,
  Divider,
  Flex,
  InputRightAddon,
  LabelNumberPair,
  RichText,
  SimpleGrid,
  Spacer,
  useToken,
  Wrapper,
} from 'boemly';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { FPM_API_URI } from '../../constants/api';
import CheckoutForm from '../../models/forms/CheckoutForm';
import {
  MAXIMUM_CONTRIBUTION_VALUE_IN_MONEY,
  MINIMUM_CONTRIBUTION_VALUE_IN_MONEY,
} from '../../constants/domain';
import { IntlContext } from '../../components/ContextProvider';
import { useRouter } from 'next/router';

export interface ShopCheckoutProps {
  slice: {
    tagline?: string;
    title: string;
    text?: string;
    badge?: string;
    batchId: string;
    pricePerKg: number;
    couponId?: string;
    initialContributionValue: number;
    checkoutText: string;
    currency: 'EUR' | 'CHF';
  };
}

export const ShopCheckout = ({ slice }: ShopCheckoutProps): JSX.Element => {
  const [primary50] = useToken('colors', ['primary.50']);
  const { formatMessage, formatNumber, locale } = useContext(IntlContext);
  const { push } = useRouter();

  const validateForm = useCallback(
    (values: CheckoutForm) => {
      const errors: Partial<{ contributionValue: string }> = {};

      if (!values.contributionValue) {
        errors.contributionValue = formatMessage({
          id: 'sections.shopCheckout.contributionValue.validation.empty',
        });
      } else if (
        values.contributionValue < MINIMUM_CONTRIBUTION_VALUE_IN_MONEY
      ) {
        errors.contributionValue = formatMessage({
          id: `sections.shopCheckout.contributionValue.validation.tooLow.${slice.currency}`,
        });
      } else if (
        values.contributionValue > MAXIMUM_CONTRIBUTION_VALUE_IN_MONEY
      ) {
        errors.contributionValue = formatMessage({
          id: 'sections.shopCheckout.contributionValue.validation.tooHigh',
        });
      }

      return errors;
    },
    [locale]
  );

  const onSubmit = ({ contributionValue }: CheckoutForm) => {
    const checkoutURL = new URL(`${FPM_API_URI}/v1/webhooks/shop/checkout`);
    const currentURL = new URL(window.location.href);

    checkoutURL.searchParams.append('batchId', slice.batchId);

    checkoutURL.searchParams.append(
      'quantity',
      Math.floor(contributionValue / slice.pricePerKg).toString()
    );

    checkoutURL.searchParams.append('cancelPath', currentURL.pathname);

    if (slice.couponId)
      checkoutURL.searchParams.append('couponId', slice.couponId);

    push(checkoutURL.toString());
  };

  return (
    <DefaultSectionContainer backgroundColor={primary50} title={slice.title}>
      <Wrapper>
        <Flex
          flexDir={['column', null, null, null, 'row']}
          justifyContent="space-between"
          alignItems={['left', null, null, null, 'center']}
        >
          <Box marginRight={['0', null, null, null, '36']} flexShrink={2}>
            <DefaultSectionHeader
              tagline={slice.tagline}
              title={slice.title}
              text={slice.text}
            />
          </Box>
          <Container maxWidth="md" padding="lg" shadow="lg">
            {slice.badge ? (
              <>
                <Badge
                  colorScheme="green"
                  textTransform="none"
                  whiteSpace="unset"
                >
                  {slice.badge}
                </Badge>
                <Spacer height="3" />
              </>
            ) : (
              <></>
            )}

            <RichText
              content={slice.checkoutText}
              textProps={{ color: 'gray.500' }}
            />

            <Spacer height="6" />
            <Divider />
            <Spacer height="6" />

            <LabelNumberPair
              label={formatMessage({ id: 'sections.shopCheckout.intro.price' })}
              number={`${formatNumber(slice.pricePerKg * 100, {
                style: 'currency',
                currency: slice.currency,
              })}/${formatNumber(100, {
                style: 'unit',
                unit: 'kilogram',
              })}  CO₂`}
            />

            <Spacer height="6" />
            <Divider />
            <Spacer height="6" />

            <Formik
              initialValues={{
                contributionValue: slice.initialContributionValue,
              }}
              validate={validateForm}
              onSubmit={onSubmit}
            >
              {({
                errors,
                touched,
                handleSubmit,
                values,
              }: FormikProps<CheckoutForm>) => (
                <Form onSubmit={handleSubmit}>
                  <Box width="full">
                    <Field name="contributionValue">
                      {({ field }: FieldProps) => (
                        <BoemlyFormControl
                          id="contributionValue"
                          size="md"
                          inputProps={{ type: 'number', ...field }}
                          label={formatMessage({
                            id: `sections.shopCheckout.contributionValue.label.${slice.currency}`,
                          })}
                          rightAddonsOrElements={[
                            <InputRightAddon key="1">
                              {formatMessage({
                                id: `sections.shopCheckout.contributionValue.unit.${slice.currency}`,
                              })}
                            </InputRightAddon>,
                          ]}
                          isInvalid={
                            !!errors.contributionValue &&
                            touched.contributionValue
                          }
                          errorMessage={errors.contributionValue}
                        />
                      )}
                    </Field>
                  </Box>

                  <Spacer height="6" />

                  <SimpleGrid columns={2} gap="4">
                    <LabelNumberPair
                      label={formatMessage({
                        id: 'sections.shopCheckout.summary.kg',
                      })}
                      number={`${formatNumber(
                        Math.floor(values.contributionValue / slice.pricePerKg),
                        {
                          style: 'unit',
                          unit: 'kilogram',
                          maximumFractionDigits: 0,
                        }
                      )} CO₂`}
                    />
                    <LabelNumberPair
                      label={formatMessage({
                        id: 'sections.shopCheckout.summary.price',
                      })}
                      number={formatNumber(
                        Math.floor(
                          values.contributionValue / slice.pricePerKg
                        ) * slice.pricePerKg,
                        {
                          style: 'currency',
                          currency: slice.currency,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    />
                  </SimpleGrid>

                  <Spacer height="6" />

                  <Button type="submit" width="full">
                    {formatMessage({ id: 'sections.shopCheckout.submit' })}
                  </Button>
                </Form>
              )}
            </Formik>
          </Container>
        </Flex>
      </Wrapper>
    </DefaultSectionContainer>
  );
};
