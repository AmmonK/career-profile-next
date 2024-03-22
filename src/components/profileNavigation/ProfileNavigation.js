import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack, Button, Link, Avatar } from '@mui/material';
import NextLink from 'next/link';

function generate_uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var uuid = (Math.random() * 16) | 0,
      v = c == 'x' ? uuid : (uuid & 0x3) | 0x8;
    return uuid.toString(16);
  });
}

function generateAvatar() {
  return `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${generate_uuidv4()}`;
}

const ProfileNavigation = ({ currentPage }) => {
  return (
    <>
      <Accordion
        disableGutters
        expanded={
          currentPage == 'work-history' || currentPage == 'education-history'
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon fontSize="large" />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            '& .Mui-expanded': { color: 'primary.main' },
            '& .MuiSvgIcon-root': { color: 'primary.main' },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ height: 50, width: 50 }} src={generateAvatar()} />
            <Typography>Portfolio</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column" spacing={1} sx={{ paddingLeft: '1.5rem' }}>
            <Link
              component={NextLink}
              href="/jobs/work-history"
              sx={{
                textDecoration: 'none',
                color: '#5E7079',
                padding: '.5rem',
                ...(currentPage === 'work-history' && {
                  background: '#CCEDEE',
                }),
                '&:hover': { color: '#001823' },
              }}
            >
              Work History
            </Link>
            <Link
              component={NextLink}
              href="/jobs/education-history"
              sx={{
                textDecoration: 'none',
                color: '#5E7079',
                padding: '.5rem',
                ...(currentPage === 'education-history' && {
                  background: '#CCEDEE',
                }),
                '&:hover': { color: '#001823' },
              }}
            >
              Education
            </Link>
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
            '& .MuiSvgIcon-root': { color: 'primary.main' },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ height: 50, width: 50 }} src={generateAvatar()} />{' '}
            <Typography>Preferences</Typography>
          </Stack>
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
            '& .MuiSvgIcon-root': { color: 'primary.main' },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ height: 50, width: 50 }} src={generateAvatar()} />{' '}
            <Typography>Activity</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </>
  );
};

export default ProfileNavigation;
