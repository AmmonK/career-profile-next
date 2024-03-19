import React from 'react';
import { Button, Typography } from '@mui/material';

const NoHistory = ({addHandler}) => {
  return (
    <>
      <h2>Work History</h2>
      <Typography component={'p'}>
        We don't have any work history for you yet
      </Typography>

    </>
  );
};

export default NoHistory;
