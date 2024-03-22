import React from 'react';
import { Button, Stack, Typography } from '@mui/material';

const NoHistory = ({ addHandler }) => {
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Typography component={'p'}>
          We don't have any education history for you yet
        </Typography>
      </Stack>
    </>
  );
};

export default NoHistory;
