import { React, useState } from 'react';
import { Stack, Card, CardContent, Chip } from '@mui/material';
import JobDetail from '../jobDetail/JobDetail';
// import useJobPostings from '@/hooks/rq/useJobPostings';
import jobPostingStore from '@/stores/jobPostingStore';

const JobList = () => {
  const [jobDetailId, setJobDetailId] = useState('');
  const { postings: jobList } = jobPostingStore((state) => state);

  const updateJobDetailId = (id) => {
    setJobDetailId(id);
  };

  console.log('from job list', jobList);
  console.log(typeof jobList);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <h1>job info</h1>
        <Stack direction="column" spacing={1}>
          {jobList?.data?.postings?.length > 0 &&
            jobList?.data?.postings?.map((jobPosting) => {
              return (
                <Card key={jobPosting.id}>
                  <CardContent>
                    <div onClick={() => updateJobDetailId(jobPosting.id)}>
                      {jobPosting.title_raw}{' '}
                      <div>
                        <Chip label={jobPosting.remote_type_name} />
                        <Chip label={jobPosting.employment_type==1?'fulltime':'parttime'} />
                      </div>
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
