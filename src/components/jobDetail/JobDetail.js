import React from 'react';
import {useJobDetails} from '@/hooks/rq/useJobDetails';
import {Skeleton, Chip} from '@mui/material';
import queryStatus from '@/utils/enum/queryStatus';
import DataChips from '../dataChips/DataChips';

const JobDetail = ({ jobId }) => {
  const {data, status} = useJobDetails(jobId);

  if (status == queryStatus.PENDING) {
    return <div><Skeleton variant="rectangle" width={300} /></div>;
  }

  return (
    <div>
      {jobId}
      <h1>{data?.data.title_raw}</h1>
      <hr/>
      <DataChips posting={data?.data} />
      <hr/>
      <div>
        {data?.data?.active_urls[0]}
      </div>
      <hr/>
      {data?.data?.skills_name?.map((skill, index) => (
        <Chip key={index} label={skill} />
      ))}
      <hr/>
      <div dangerouslySetInnerHTML={{__html: data?.data.body }}/>
      {/* Render other job details */}
    </div>
  );
};

export default JobDetail;