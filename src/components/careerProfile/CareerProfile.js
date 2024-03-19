import { Grid } from '@mui/material';
import React from 'react';
import ProfileNavigation from '../profileNavigation/ProfileNavigation';
import WorkHistory from '../workHistory/WorkHistory';

const CareerProfile = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <h1>nav</h1>
          <ProfileNavigation/>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={8}>
          <h1>content</h1>
          <WorkHistory/>
        </Grid>
      </Grid>
    </>
  );
};

export default CareerProfile;
