import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack } from '@mui/material';

const ProfileNavigation = () => {
  return (
    <>
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon fontSize="large" />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            '& .Mui-expanded': { color: 'primary.main' },
            '& .Mui-expanded .MuiSvgIcon-root': { color: 'primary.main' },
          }}
        >
          <Typography>Portfolio</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column" spacing={1}>
            <Typography>Work History</Typography>
            <Typography>Education</Typography>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon fontSize="large" />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{
            '& .Mui-expanded': { color: 'primary.main' },
            '& .Mui-expanded .MuiSvgIcon-root': { color: 'primary.main' },
          }}
        >
          <Typography>Preferences</Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon fontSize="large" />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            '& .Mui-expanded': { color: 'primary.main' },
            '& .Mui-expanded .MuiSvgIcon-root': { color: 'primary.main' },
          }}
        >
          <Typography>Activity</Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </>
  );
};

export default ProfileNavigation;
