import useUserInfo from '@/hooks/rq/useUserInfo';
import usePrimaryProgram from '@/hooks/rq/usePrimaryProgram';
import useSocCodes from '@/hooks/rq/useSocCodes';
import useContactInfo from '@/hooks/rq/useContactInfo';
import useJobPostings from '@/hooks/rq/useJobPostings';
import { useEffect } from 'react';
import jobStore from '@/store/jobListStore';
import storeStatus from '@/store/storeStatus';
import { Chip } from '@mui/material';

const DataContainer = ({ children }) => {
  const { setJobStatus, setJobList } = jobStore();

  const { data: userInformation, isLoading: isLoadingUserInfo } = useUserInfo();

  const { data: primaryProgramInfo, isLoading: isLoadingPrimaryProgramInfo } =
    usePrimaryProgram();

  const { data: contactInfo, isLoading: isLoadingContactInfo } =
    useContactInfo();

  const { data: socCodes, isLoading: isLoadingSocCodes } = useSocCodes(
    primaryProgramInfo != null &&
      Array.isArray(primaryProgramInfo) &&
      primaryProgramInfo.length > 0
      ? primaryProgramInfo[0]?.externalSystemIds.programCodeVersion[0].split(
          ':'
        )[0]
      : null
  );

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
        <Chip
          label="User Info"
          color={isLoadingUserInfo ? 'warning' : 'success'}
        />
        <Chip
          label="Contact Info"
          color={isLoadingContactInfo ? 'warning' : 'success'}
        />
        <Chip
          label="Primary Program"
          color={isLoadingPrimaryProgramInfo ? 'warning' : 'success'}
        />
        <Chip
          label="SOC Codes"
          color={isLoadingSocCodes ? 'warning' : 'success'}
        />
        <Chip
          label="Jobs"
          color={isLoadingJobPostingsData ? 'warning' : 'success'}
        />
      </div>
      {children}
    </div>
  );
};

export default DataContainer;
