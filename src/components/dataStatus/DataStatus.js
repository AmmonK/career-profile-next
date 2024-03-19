import useUserInfo from '@/hooks/rq/useUserInfo';
import usePrimaryProgram from '@/hooks/rq/usePrimaryProgram';
import useSocCodes from '@/hooks/rq/useSocCodes';
import useContactInfo from '@/hooks/rq/useContactInfo';
import useClr from '@/hooks/rq/useClr';
import { Chip, Stack } from '@mui/material';
import queryStatus from '@/utils/enum/queryStatus';

const  DataStatus = ({ children }) => {

  const {status: userInfoStatus } = useUserInfo();

  const {status: primaryProgramStatus } =
    usePrimaryProgram();

  const {status: contactInfoStatus } = useContactInfo();

  const {status: socCodesStatus } = useSocCodes();

  const {status: clrStatus } = useClr();


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
      <Stack direction="row" spacing={1}>
        <Chip label="User Info" color={getColor(userInfoStatus)} />
        <Chip label="Contact Info" color={getColor(contactInfoStatus)} />
        <Chip label="Primary Program" color={getColor(primaryProgramStatus)} />
        <Chip label="SOC Codes" color={getColor(socCodesStatus)} />
        {/* <Chip label="Jobs" color={getColor(jobPostingStatus)} /> */}
        <Chip label="CLR" color={getColor(clrStatus)} />
        {/* <Chip label="Skills Data" color={getColor(skillsStatus)} /> */}
      </Stack>
  );
};

export default DataStatus;
