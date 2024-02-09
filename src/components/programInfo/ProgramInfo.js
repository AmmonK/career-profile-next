import React from 'react';
import usePrimaryProgramByPersonId from '@/hooks/swr/usePrimaryProgramByPersonId';

const ProgramInfo = () => {
  const {
    programInfo: primaryProgramInfo,
    isLoading: isLoadingPrimaryProgramInfo,
  } = usePrimaryProgramByPersonId();

  return (
    <div>
      <h1>program info</h1>
      {isLoadingPrimaryProgramInfo && <div>Loading program info...</div>}
      {!isLoadingPrimaryProgramInfo && <div>{primaryProgramInfo.code}</div>}
    </div>    
  );
};

export default ProgramInfo;
