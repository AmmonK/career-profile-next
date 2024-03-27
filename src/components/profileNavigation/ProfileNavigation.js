import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack, Link, Box } from '@mui/material';
import NextLink from 'next/link';
import NavAvatar from './NavAvatar';

const ProfileNavigation = ({ currentPage, setShowNav=() => {} }) => {
  return (
    <Box
      sx={{
        minWidth: '300px',
      }}
    >
      <Accordion disableGutters defaultExpanded={true}>
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
            <NavAvatar />
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
              onClick={() => setShowNav(false)}
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
              onClick={() => setShowNav(false)}
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
            <NavAvatar />
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
            <NavAvatar />
            <Typography>Activity</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProfileNavigation;
