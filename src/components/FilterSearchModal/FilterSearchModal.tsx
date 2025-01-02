import { SlidersHorizontal } from '@phosphor-icons/react';
import { Button, useDisclosure, Text } from 'boemly';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  CheckboxGroup,
  RadioGroup,
  HStack,
  useRadio,
  chakra,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';

const CustomCheckbox = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <chakra.label cursor="pointer">
      <input {...input} />
      <chakra.div
        {...checkbox}
        bg="gray.100"
        rounded="6px"
        p={2}
        textAlign="center"
        _checked={{
          bg: 'green.100',
          color: 'green.800',
        }}
      >
        {props.children}
      </chakra.div>
    </chakra.label>
  );
};

export const FilterSearchModal = () => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [filters, setFilters] = useState(null); // Simulated search function
  const handleSearch = (values: any) => {
    setFilters(values);
    console.log('Searching with filters: ', values);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={onOpen}
        leftIcon={<SlidersHorizontal size="14" weight="fill" />}
      >
        {/* TODO: translate */}
        Filter&nbsp;&nbsp;
        <span
          style={{
            backgroundColor: 'var(--boemly-colors-green-100)',
            color: 'var(--boemly-colors-green-800)',
            borderRadius: '6px',
            padding: '2px 6px',
          }}
        >
          {filters ? Object.keys(filters).length : 0}
        </span>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter Events</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              sortBy: 'Newest first',
              eventType: [],
              language: [],
            }}
            onSubmit={(values) => {
              handleSearch(values);
              onClose();
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <ModalBody>
                  {/* Sort By */}
                  <Box mb={4}>
                    <Text fontWeight="bold" mb={2}>
                      Sort by
                    </Text>
                    <RadioGroup
                      name="sortBy"
                      onChange={(value) => setFieldValue('sortBy', value)}
                      value={values.sortBy}
                    >
                      <HStack spacing={4}>
                        {['Newest First', 'Latest First'].map(
                          (value, index) => (
                            <CustomCheckbox
                              key={index}
                              value={value.toLowerCase()}
                            >
                              {value}
                            </CustomCheckbox>
                          )
                        )}
                      </HStack>
                      {/* <VStack align="start">
                        <Field
                          as={Radio}
                          name="sortBy"
                          value="date"
                          // color="--var(boemly-color-primary-500)"
                          color="green"
                        >
                          Newest First
                        </Field>
                        <Field as={Radio} name="sortBy" value="relevancy">
                          Latest First
                        </Field>
                      </VStack> */}
                    </RadioGroup>
                  </Box>

                  {/* Event Type */}
                  <Box mb={4}>
                    <Text fontWeight="bold" mb={2}>
                      Event Type
                    </Text>
                    <CheckboxGroup
                      value={values.eventType}
                      onChange={(value) => setFieldValue('eventType', value)}
                    >
                      <HStack spacing={4} flexWrap="wrap">
                        {[
                          'Webinar',
                          'Fair',
                          'Meet Up',
                          'Festival',
                          'Conference',
                          'Forest Walk',
                          'Partner Event',
                          'Lunch & Learn',
                          'Roadshow',
                        ].map((value, index) => (
                          <CustomCheckbox
                            key={index}
                            value={value.toLowerCase()}
                          >
                            {value}
                          </CustomCheckbox>
                        ))}
                      </HStack>
                    </CheckboxGroup>
                  </Box>

                  {/* Language */}
                  <Box mb={4}>
                    <Text fontWeight="bold" mb={2}>
                      Language
                    </Text>
                    <CheckboxGroup
                      value={values.language}
                      onChange={(value) => setFieldValue('language', value)}
                    >
                      <HStack spacing={4} flexWrap="wrap">
                        {[
                          'English',
                          'German',
                          'French',
                          'Italian',
                          'Hungarian',
                        ].map((value, index) => (
                          <CustomCheckbox
                            key={index}
                            value={value.toLowerCase()}
                          >
                            {value}
                          </CustomCheckbox>
                        ))}
                      </HStack>
                    </CheckboxGroup>
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="gray"
                    mr={3}
                    type="reset"
                    onClick={() => {
                      setFilters(null); // Clear filters
                    }}
                  >
                    Reset Filter
                  </Button>
                  <Button type="submit" colorScheme="green">
                    Apply Filters
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
    // <Formik
    //   initialValues={{
    //     sortBy: 'Newest first',
    //     eventType: 'Webinar',
    //     language: 'English',
    //   }}
    //   onSubmit={(values, actions) => {
    //     onClose();
    //     actions.resetForm();
    //   }}
    // >
    //   {(props: FormikProps<FilterSearchModalValues>) => (
    //     <Form>
    //       <BoemlyModal
    //         // TODO: translate
    //         title="Filter"
    //         isOpen={isOpen}
    //         onClose={onClose}
    //         trigger={
    //           <Button
    //             variant="outline"
    //             onClick={onOpen}
    //             leftIcon={<SlidersHorizontal size="14" weight="fill" />}
    //           >
    //             {/* TODO: translate */}
    //             Filter
    //           </Button>
    //         }
    //         content={
    //           <Flex gap="4">
    //             <Field name="Sort by">
    //               {() => (
    //                 <BoemlyFormControl
    //                   id="sortBy"
    //                   label={'sortBy'}
    //                   inputType="Select"
    //                   selectOptions={sortByOptions}
    //                   //  isInvalid={!!form.errors.name && !!form.touched.name}
    //                   //  errorMessage={`${form.errors.name}`}
    //                   //  inputProps={field}
    //                 />
    //               )}
    //             </Field>
    //             <Field name="Event type">
    //               {() => (
    //                 <BoemlyFormControl
    //                   id="eventType"
    //                   label={'eventType'}
    //                   inputType="Select"

    //                   //  isInvalid={!!form.errors.name && !!form.touched.name}
    //                   //  errorMessage={`${form.errors.name}`}
    //                   //  inputProps={field}
    //                 />
    //               )}
    //             </Field>
    //             <Field name="Language">
    //               {() => (
    //                 <BoemlyFormControl
    //                   id="language"
    //                   label={'language'}
    //                   inputType="Select"

    //                   //  isInvalid={!!form.errors.name && !!form.touched.name}
    //                   //  errorMessage={`${form.errors.name}`}
    //                   //  inputProps={field}
    //                 />
    //               )}
    //             </Field>
    //           </Flex>
    //         }
    //         footer={
    //           <Flex gap="4">
    //             <Button onClick={onClose} colorScheme="white" variant="outline">
    //               Reset Filter
    //               {/* (TODO: translate) (TODO: amount of chosen
    //               filters) */}
    //               {/* <FormattedMessage id="app.admin.projects.createProject.modal.close" /> */}
    //             </Button>

    //             <Button
    //               isLoading={props.isSubmitting}
    //               onClick={props.submitForm}
    //             >
    //               Show Events
    //               {/* (TODO: translate) */}
    //               {/* <FormattedMessage id="app.admin.projects.createProject.modal.submit" /> */}
    //             </Button>
    //           </Flex>
    //         }
    //       />
    //     </Form>
    //   )}
    // </Formik>
  );
};
