import { React, useState } from 'react';

import jobStore from '@/store/jobListStore';
import storeStatus from '@/store/storeStatus';
import { Stack, Card, CardContent } from '@mui/material';
import JobDetail from '../jobDetail/JobDetail';

const JobList = () => {
  const { jobStatus, jobList } = jobStore((state) => state);
  const [jobDetailId, setJobDetailId] = useState('');

  const updateJobDetailId = (id) => {
    console.log('updateJobDetailId', id);
    setJobDetailId(id);
  };

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <h1>job info</h1>
        <Stack direction='column' spacing={1}>
        {jobStatus == storeStatus.EMPTY && <div>no jobs to display</div>}
        {jobStatus == storeStatus.LOADING && <div>loading...</div>}
        {jobStatus == storeStatus.LOADED &&
          jobList?.postings?.length > 0 &&
          jobList?.postings?.map((jobPosting) => {
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
      {jobStatus == storeStatus.LOADED && <JobDetail jobId={jobDetailId} />}
    </Stack>
  );
};

export default JobList;
