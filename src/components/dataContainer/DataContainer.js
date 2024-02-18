import useUserInfo from '@/hooks/rq/useUserInfo';
import usePrimaryProgram from '@/hooks/rq/usePrimaryProgram';
import useSocCodes from '@/hooks/rq/useSocCodes';
import useContactInfo from '@/hooks/rq/useContactInfo';
import useJobPostings from '@/hooks/rq/useJobPostings';
import useClr from '@/hooks/rq/useClr';
import useSkills from '@/hooks/rq/useSkills';
import { Chip } from '@mui/material';
import filterStore from '@/stores/filterStore';
import jobPostingStore from '@/stores/jobPostingStore';
import { useEffect } from 'react';
import queryStatus from '@/utils/enum/queryStatus';
import QueryModifications from '../actions/QueryModifications';

const DataContainer = ({ children }) => {
  const { remote, jobLevel, skills } = filterStore((state) => state);
  const { setPostings } = jobPostingStore((state) => state);

  const { data: userInformation, status: userInfoStatus } = useUserInfo();
  


  const { data: primaryProgramInfo, status: primaryProgramStatus } =
    usePrimaryProgram();

  const { data: contactInfo, status: contactInfoStatus } = useContactInfo();

  const { data: socCodes, status: socCodesStatus } = useSocCodes(
    primaryProgramInfo != null &&
      Array.isArray(primaryProgramInfo) &&
      primaryProgramInfo.length > 0
      ? primaryProgramInfo[0]?.externalSystemIds.programCodeVersion[0].split(
          ':'
        )[0]
      : null
  );

  const { data: clrData, status: clrStatus } = useClr();

  const { data: jobPostingsData, status: jobPostingStatus } = useJobPostings(
    socCodes,
    remote,
    jobLevel,
    clrData,
    skills
  );

  const { data: skillsData, status: skillsStatus } = useSkills(clrData);

  useEffect(() => {
    if (jobPostingStatus == queryStatus.SUCCESS && jobPostingsData != null) {
      setPostings(jobPostingsData);
    }
  }, [jobPostingStatus, jobPostingsData, setPostings]);

  const getColor = (status) => {
    switch (status) {
      case queryStatus.SUCCESS:
        return 'success';
      case queryStatus.PENDING:
        return 'warning';
      case queryStatus.ERROR:
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div>
      <div>
        {jobLevel}
        <Chip label="User Info" color={getColor(userInfoStatus)} />
        <Chip label="Contact Info" color={getColor(contactInfoStatus)} />
        <Chip label="Primary Program" color={getColor(primaryProgramStatus)} />
        <Chip label="SOC Codes" color={getColor(socCodesStatus)} />
        <Chip label="Jobs" color={getColor(jobPostingStatus)} />
        <Chip label="CLR" color={getColor(clrStatus)} />
        <Chip label="Skills Data" color={getColor(skillsStatus)} />
      </div>
      <QueryModifications/>
      {children}
    </div>
  );
};

export default DataContainer;
