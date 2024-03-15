import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import useJobTitles from '@/hooks/rq/useJobTitles';
import { Chip, Button, Card, Stack, CardContent, Box } from '@mui/material';
import { useDebounce } from 'use-debounce';
import JobTitleSkills from '../jobTitleSkills/JobTitleSkills';

const SkillFinder = () => {
  const [search, setSearch] = useState('');
  const [workHistory, setWorkHistory] = useState([]);
  const [debouncedSearch] = useDebounce(search, 500);
  const { data, status } = useJobTitles(debouncedSearch);

  const handleChange = (e, value) => {
    console.log(value);
    setWorkHistory([...workHistory, value]);
  };

  return (
    <div>
      <hr/>
      <Stack direction="column" spacing={1}>
      <TextField
        label="Job Title"
        value={search}
        onChange={(e, value) => setSearch(e.target.value)}
      />
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 0.2,
        },
      
      }}>
        {search&& <Chip variant="outlined" label={search}/>}
      {data &&
        data?.data?.map((job, i) => (
          <Chip
            key={i}
            label={job?.properties.singular_name}
            onClick={(e) => handleChange(e, job)}
          />
        ))}
        </Box>
        </Stack>
      <hr />
      <div>
        <h2>Work History</h2>
        <Stack direction="column" spacing={2}>
          {workHistory.map((job, i) => (
            <Card key={i}>
              <CardContent>
                <Stack direction="column" spacing={1}>
                <Stack direction="row" spacing={1}>
                <h3>{job?.properties.singular_name}</h3>
                
                <Button
                  onClick={() =>
                    setWorkHistory(
                      workHistory.filter((item, index) => index !== i)
                    )
                  }
                >
                  Remove
                </Button>
                </Stack>            
                <Stack direction="row" spacing={1}>
                <Button variant="contained" color="secondary" size="small">Add Company</Button>
                <Button variant="contained" color="secondary" size="small">Add Company Url</Button>
                <Button variant="contained" color="secondary" size="small">Add Industry</Button>
                <Button variant="contained" color="secondary" size="small">Add Cosmetic Title</Button>
                <Button variant="contained" color="secondary" size="small">Add Start Date</Button>
                <Button variant="contained" color="secondary" size="small">Add End Date</Button>
                </Stack>
                <JobTitleSkills title={job?.name} />
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default SkillFinder;
