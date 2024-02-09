import React from 'react';
import {useJobDetail} from '@/store/jobDetailStore';

const JobDetail = ({ jobId }) => {
  const jobDetail = useJobDetail(jobId);

  if (!jobDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {jobId}
      <h1>{jobDetail.title_raw}</h1>
      <p>{jobDetail.body}</p>
      {/* Render other job details */}
    </div>
  );
};

export default JobDetail;