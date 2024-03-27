import React from 'react';
import { Box } from '@mui/material';
import CareerProfile from '@/components/careerProfile/CareerProfile';
import { useRouter } from 'next/router'

const MyComponent = () => {

  const router = useRouter();
  const { slug } = router.query;

  return (
    <Box>
      <CareerProfile page={slug}/>
    </Box>
  );
};

export default MyComponent;
