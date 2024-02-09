import React from 'react';
import {useJobDetails} from '@/hooks/rq/useJobDetails';

const JobDetail = ({ jobId }) => {
  const {data, isLoading, isError} = useJobDetails(jobId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {jobId}
      <h1>{data?.data.title_raw}</h1>
      <p>{data?.data.body}</p>
      {/* Render other job details */}
    </div>
  );
};

export default JobDetail;