import { React, useEffect, useState } from 'react';
import { Stack, Card, CardContent, Chip } from '@mui/material';
import JobDetail from '../jobDetail/JobDetail';
import jobPostingStore from '@/stores/jobPostingStore';
import DataChips from '../dataChips/DataChips';

const JobList = () => {
  const [jobDetailId, setJobDetailId] = useState('');
  const { postings: jobList } = jobPostingStore((state) => state);

  const updateJobDetailId = (id) => {
    setJobDetailId(id);
  };

  useEffect(() => {
    if (jobList?.data?.postings?.length > 0) {
      setJobDetailId(jobList?.data?.postings[0].id);
    }
  }
  , [jobList]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <h1>Postings</h1>
        <Stack direction="column" spacing={1}>
          {jobList?.data?.postings?.length > 0 &&
            jobList?.data?.postings?.map((jobPosting) => {
              return (
                <Card
                  onClick={() => updateJobDetailId(jobPosting.id)}
                  key={jobPosting.id}
                  sx={{
                    borderLeft: 3,
                    borderLeftColor:
                      jobPosting.id === jobDetailId ? 'red' : 'white',
                    borderRight: 3,
                    borderRightColor:
                      jobPosting.id === jobDetailId ? 'red' : 'white',
                  }}
                >
                  <CardContent>
                    <div>
                      {jobPosting.title_raw} <DataChips posting={jobPosting} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </Stack>
      </div>
      <JobDetail jobId={jobDetailId} />
    </Stack>
  );
};

export default JobList;
