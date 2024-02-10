import { React, useState } from 'react';

import { Stack, Card, CardContent } from '@mui/material';
import JobDetail from '../jobDetail/JobDetail';
import useJobPostings from '@/hooks/rq/useJobPostings';

const JobList = () => {
  // const { jobStatus, jobList } = jobStore((state) => state);
  const { data: jobList, isLoading } = useJobPostings();
  const [jobDetailId, setJobDetailId] = useState('');

  const updateJobDetailId = (id) => {
    setJobDetailId(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <h1>job info</h1>


        <Stack direction='column' spacing={1}>

        {
          jobList?.data.postings?.length > 0 &&
          jobList?.data.postings?.map((jobPosting) => {
            return (
              <Card key={jobPosting.id}>
                <CardContent>
                <div onClick={() => updateJobDetailId(jobPosting.id)}>
                  {jobPosting.title_raw}{' '}
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
