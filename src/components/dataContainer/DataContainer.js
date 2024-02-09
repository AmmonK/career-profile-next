import useUserInfo from '@/hooks/swr/useUserInfo';
import usePrimaryProgramByPersonId from '@/hooks/swr/usePrimaryProgramByPersonId';
import useSocCodesByProgramCode from '@/hooks/swr/useSocCodesByProgramCode';
import useContactInfo from '@/hooks/swr/useContactInfo';
import useJobPostings from '@/hooks/swr/useJobPostings';
import { useEffect } from 'react';
import jobStore from '@/store/jobListStore';
import storeStatus from '@/store/storeStatus';
import { Chip } from '@mui/material'

const DataContainer = ({ children }) => {
  const { setJobStatus, setJobList } = jobStore();

  const { userInfo: userInformation, isLoading: isLoadingUserInfo } =
    useUserInfo();

  const {
    programInfo: primaryProgramInfo,
    isLoading: isLoadingPrimaryProgramInfo,
  } = usePrimaryProgramByPersonId();

  const { contactInfo: contactInfo, isLoading: isLoadingContactInfo } =
    useContactInfo();

  const { socCodes: socCodes, isLoading: isLoadingSocCodes } =
    useSocCodesByProgramCode(primaryProgramInfo.code);

  const { data: jobPostingsData, isLoading: isLoadingJobPostingsData } =
    useJobPostings(socCodes);

  useEffect(() => {
    if (isLoadingJobPostingsData) {
      setJobStatus(storeStatus.LOADING);
    }
    if (jobPostingsData) {
      setJobList(jobPostingsData);
    }
  }, [jobPostingsData, isLoadingJobPostingsData, setJobList, setJobStatus]);
  

  return (
    <div>
      <div>
        <Chip label="User Info" color={isLoadingUserInfo ? 'warning' : 'success'} />
        <Chip label="Contact Info" color={isLoadingContactInfo ? 'warning' : 'success'} />
        <Chip label="Primary Program" color={isLoadingPrimaryProgramInfo ? 'warning' : 'success'} />
        <Chip label="SOC Codes" color={isLoadingSocCodes ? 'warning' : 'success'} />
        <Chip label="Jobs" color={isLoadingJobPostingsData ? 'warning' : 'success'} />
      </div>
      {children}
    </div>
  );
};

export default DataContainer;
