import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import ProfileNavigation from '../profileNavigation/ProfileNavigation';
import WorkHistory from '../workHistory/WorkHistory';
import EducationHistory from '../educationHistory/EducationHistory';

const CareerProfile = ({ page }) => {

  const generatePage = () => {
    switch (page) {
      case 'work-history':
        return <WorkHistory />;
      case 'education-history':
        return <EducationHistory />;
      default:
        return <div>unknown section</div>;
    }

  }

  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <ProfileNavigation currentPage={page} />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={8}>
          <Typography gutterBottom sx={{ color: '#00638C' }}>
            Career Profile
          </Typography>
          {generatePage()}
        </Grid>
      </Grid>
    </>
  );
};

export default CareerProfile;
