import React from 'react';
import DataContainer from '@/components/dataContainer/DataContainer';
import JobList from '@/components/jobList/JobList';

const MyComponent = () => {

  return (
    <div>
      <DataContainer>
        <JobList/>
      </DataContainer>
      {/* testing {userInformation.personId}

      {userInformation?.personId && <ProgramInfo/>}
      {userInformation?.personId && <ContactInfo/>}
      {primaryProgramInfo?.code && <SocCodes socCode={primaryProgramInfo.code} /> }
      <JobList socCodes={primaryProgramInfo.code} /> */}
    </div>
  );
};

export default MyComponent;
