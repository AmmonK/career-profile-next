import { Grid, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import ProfileNavigation from '../profileNavigation/ProfileNavigation';
import WorkHistory from '../workHistory/WorkHistory';
import EducationHistory from '../educationHistory/EducationHistory';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const CareerProfile = ({ page }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [showNav, setShowNav] = useState(false);

  const generatePage = () => {
    switch (page) {
      case 'work-history':
        return <WorkHistory />;
      case 'education-history':
        return <EducationHistory />;
      default:
        return <div>unknown section</div>;
    }
  };

  return (
    <>
      {showNav.toString()}
      {showNav && matches && <ProfileNavigation setShowNav={setShowNav} />}

      <Grid
        container
        sx={{ display: showNav ? 'none' : '' }}
      >
        <Grid
          item
          xs={3}
          sx={{ display: { xs: 'none', md: 'block' }} }
        >
          <ProfileNavigation currentPage={page} />
        </Grid>
        <Grid
          item
          xs={1}
          sx={{ display: { xs: 'none', md: 'block' } }}
        />
        <Grid item xs={12} md={8}>
          {matches && (
            <Button onClick={() => setShowNav(true)}>Show Navigation</Button>
          )}
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
