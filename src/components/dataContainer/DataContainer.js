import useUserInfo from '@/hooks/rq/useUserInfo';
import usePrimaryProgram from '@/hooks/rq/usePrimaryProgram';
import useSocCodes from '@/hooks/rq/useSocCodes';
import useContactInfo from '@/hooks/rq/useContactInfo';
import useJobPostings from '@/hooks/rq/useJobPostings';
import { Chip } from '@mui/material';
import filterStore from '@/stores/filterStore';
import jobPostingStore from '@/stores/jobPostingStore';
import { useEffect } from 'react';

const DataContainer = ({ children }) => {
  const { remote,fulltime } = filterStore((state) => state);
  const { setPostings } = jobPostingStore((state) => state);

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
    useJobPostings(socCodes,remote,fulltime);

  useEffect(() => {
    if (!isLoadingJobPostingsData && jobPostingsData != null) {
      setPostings(jobPostingsData);
    }
  } , [isLoadingJobPostingsData,jobPostingsData], );



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
