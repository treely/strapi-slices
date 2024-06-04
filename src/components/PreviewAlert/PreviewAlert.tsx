import React from 'react';
import { BoemlyAlert, Box } from 'boemly';

export const PreviewAlert = (): JSX.Element => {
  return (
    <Box position="fixed" top="4" left="4">
      <BoemlyAlert text="Preview" status="error" />
    </Box>
  );
};
