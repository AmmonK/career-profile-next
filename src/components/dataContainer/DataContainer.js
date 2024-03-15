import useUserInfo from '@/hooks/rq/useUserInfo';
import useClr from '@/hooks/rq/useClr';
import useSkills from '@/hooks/rq/useSkills';
import useAllSkills from '@/hooks/rq/useAllSkills';
import { Chip } from '@mui/material';
import queryStatus from '@/utils/enum/queryStatus';
import QueryModifications from '../actions/QueryModifications';

const DataContainer = ({ children }) => {

  const {status: allSkillsStatus } = useAllSkills();
  const {status: userInfoStatus } = useUserInfo();
  const { status: clrStatus } = useClr();
  const {status: skillsStatus } = useSkills();

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
        <Chip label="User Info" color={getColor(userInfoStatus)} />
        <Chip label="CLR" color={getColor(clrStatus)} />
        <Chip label="Skills Data" color={getColor(skillsStatus)} />
        <Chip label="All Skills" color={getColor(allSkillsStatus)} />
      </div>
      <QueryModifications />
      {children}
    </div>
  );
};

export default DataContainer;
