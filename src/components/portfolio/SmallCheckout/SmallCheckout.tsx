import React, { useContext, useCallback } from 'react';
import { CDN_URI, FPM_API_URI } from '../../../constants/api';
import StrapiLinkButton from '../../../components/StrapiLinkButton';
import {
  BoemlyFormControl,
  Box,
  Button,
  Divider,
  Flex,
  InputRightAddon,
  Spacer,
  Text,
} from 'boemly';
import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikErrors,
  FormikProps,
} from 'formik';
import { useRouter } from 'next/router';
import Image from 'next/image';
import StrapiLink from '../../../models/strapi/StrapiLink';
import {
  MAXIMUM_CONTRIBUTION_VALUE_IN_MONEY,
  MINIMUM_CONTRIBUTION_VALUE_IN_MONEY,
} from '../../../constants/domain';
import { IntlContext } from '../../ContextProvider';

export interface SmallCheckoutProps {
  batchId: string;
  pricePerKg: number;
  initialContributionValue: number;
  checkoutText?: string;
  currency: 'EUR' | 'CHF';

  title?: string;
  subtitle?: string;
  button?: StrapiLink;
}

interface SmallCheckoutForm {
  contributionValueCurrency: number;
  contributionValueKgs: number;
}

const SmallCheckout = ({
  pricePerKg,
  currency,
  batchId,
  initialContributionValue,
  checkoutText,
  title,
  subtitle,
  button,
}: SmallCheckoutProps) => {
  const { formatNumber, formatMessage, locale } = useContext(IntlContext);
  const { push } = useRouter();

  const validateForm = useCallback(
    (values: SmallCheckoutForm) => {
      const errors: FormikErrors<SmallCheckoutForm> = {};

      if (!values.contributionValueCurrency) {
        errors.contributionValueCurrency = formatMessage({
          id: 'portfolio.smallCheckout.contributionValueCurrency.validation.empty',
        });
      } else if (
        values.contributionValueCurrency < MINIMUM_CONTRIBUTION_VALUE_IN_MONEY
      ) {
        errors.contributionValueCurrency = formatMessage({
          id: `portfolio.smallCheckout.contributionValueCurrency.validation.tooLow.${currency}`,
        });
      } else if (
        values.contributionValueCurrency > MAXIMUM_CONTRIBUTION_VALUE_IN_MONEY
      ) {
        errors.contributionValueCurrency = formatMessage({
          id: 'portfolio.smallCheckout.contributionValueCurrency.validation.tooHigh',
        });
      }

      return errors;
    },
    [locale]
  );

  const onSubmit = async ({ contributionValueCurrency }: SmallCheckoutForm) => {
    push(
      `${FPM_API_URI}/v1/webhooks/shop/checkout?batchId=${batchId}&quantity=${Math.floor(
        contributionValueCurrency / pricePerKg
      )}`
    );
  };

  return (
    <Flex
      width="full"
      height="full"
      borderRadius="xl"
      background="primary.100"
      padding="6"
      direction="column"
    >
      <Flex gap="1" alignItems="end" mb="6">
        <Text color="black" lineHeight="0">
          {formatMessage(
            { id: 'unit.formatter.tonsCo2' },
            {
              number: (
                <Text as="span" size="lgLowBold" color="black">
                  {formatNumber(pricePerKg * 1000, {
                    style: 'currency',
                    currency,
                    maximumFractionDigits: 0,
                  })}
                </Text>
              ),
            }
          )}
        </Text>
      </Flex>

      <Formik
        initialValues={{
          contributionValueCurrency: initialContributionValue,
          contributionValueKgs: initialContributionValue / pricePerKg / 1000,
        }}
        validate={validateForm}
        onSubmit={onSubmit}
      >
        {({
          errors,
          touched,
          handleSubmit,
          setValues,
        }: FormikProps<SmallCheckoutForm>) => (
          <Form onSubmit={handleSubmit}>
            <Flex gap="4">
              <Box width="full">
                <Field name="contributionValueCurrency">
                  {({ field }: FieldProps) => (
                    <BoemlyFormControl
                      id="contributionValueCurrency"
                      size="md"
                      inputType="NumberInput"
                      numberInputProps={{
                        value: field.value,
                        onChange: (valueString) => {
                          // valueAsNumber might be NaN
                          const value = parseInt(valueString || '0', 10);

                          setValues({
                            contributionValueCurrency: value,
                            contributionValueKgs: value / pricePerKg / 1000,
                          });
                        },
                      }}
                      label={formatMessage({
                        id: `portfolio.smallCheckout.contributionValueCurrency.label.${currency}`,
                      })}
                      rightAddonsOrElements={[
                        <InputRightAddon key="currencyUnit">
                          {formatMessage({
                            id: `portfolio.smallCheckout.contributionValueCurrency.unit.${currency}`,
                          })}
                        </InputRightAddon>,
                      ]}
                      isInvalid={
                        !!errors.contributionValueCurrency &&
                        touched.contributionValueCurrency
                      }
                      errorMessage={errors.contributionValueCurrency}
                    />
                  )}
                </Field>
              </Box>

              <Box width="full">
                <Field name="contributionValueKgs">
                  {({ field }: FieldProps) => (
                    <BoemlyFormControl
                      id="contributionValueKgs"
                      size="md"
                      inputType="NumberInput"
                      numberInputProps={{
                        value: field.value,
                        onChange: (valueString) => {
                          const value = parseInt(valueString || '0', 10);

                          setValues({
                            contributionValueCurrency:
                              value * pricePerKg * 1000,
                            contributionValueKgs: value,
                          });
                        },
                      }}
                      label={formatMessage({
                        id: 'portfolio.smallCheckout.contributionValueKgs.label',
                      })}
                      rightAddonsOrElements={[
                        <InputRightAddon key="tCO₂">tCO₂</InputRightAddon>,
                      ]}
                      isInvalid={
                        !!errors.contributionValueKgs &&
                        touched.contributionValueKgs
                      }
                      errorMessage={errors.contributionValueKgs}
                    />
                  )}
                </Field>
              </Box>
            </Flex>

            <Spacer height="4" />

            <Button type="submit" width="full">
              {formatMessage({ id: 'portfolio.smallCheckout.submitButton' })}
            </Button>
          </Form>
        )}
      </Formik>

      <Flex
        width="full"
        justifyContent="center"
        alignItems="center"
        mt="6"
        gap="2"
      >
        <Image
          src={`${CDN_URI}/assets/v3/strapi-slices/globe-love-icon.svg`}
          alt="Icon"
          width={20}
          height={20}
        />
        <Text size="smLowNormal">{checkoutText}</Text>
      </Flex>

      <Divider my="6" />

      <Flex width="full" alignItems="center" direction="column">
        {title && (
          <Text size="smLowBold" textAlign="center" color="black" mb="2">
            {title}
          </Text>
        )}
        {subtitle && (
          <Text size="smRegularNormal" textAlign="center" mb="3">
            {subtitle}
          </Text>
        )}
        {button && (
          <StrapiLinkButton
            link={{
              id: 1,
              intercomLauncher: true,
              text: button.text,
            }}
            variant="outline"
          />
        )}
      </Flex>
    </Flex>
  );
};

export default SmallCheckout;
