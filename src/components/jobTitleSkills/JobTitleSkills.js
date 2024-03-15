import React from 'react';
import useJobTitleSkills from '@/hooks/rq/useJobTitleSkills';
import useAllSkills from '@/hooks/rq/useAllSkills';
import { Chip, Stack, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BatteryUnknownIcon from '@mui/icons-material/BatteryUnknown';
import findClrMatch from '@/utils/skills/findClrMatch';
import useClr from '@/hooks/rq/useClr';

const JobTitleSkills = ({ title }) => {
  const { data, status } = useJobTitleSkills(title);
  const { data: allSkills, status: allSkillsStatus } = useAllSkills();
  const { data: clrData, status: clrStatus } = useClr();

  const findSkillById = (id) => {
    return allSkills?.find((skill) => skill.id === id);
  };

  const skillTypeIndicator = (skill) =>  {
    switch (skill.skillType) {
      case 'Specialized Skill':
        return <WorkspacePremiumIcon/>;
      case 'Common Skill':
        return <SquareFootIcon/>;
      default:
        return <BatteryUnknownIcon/>;
    }
  }

  return (
    <div>
      Top Skills
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 0.5,
        },
      
      }}>
        {data &&
          data?.data?.ranking.buckets.map((skill, i) => (
            <Chip
              color={findClrMatch(skill, clrData) ? "success" : "default"}
              icon={skillTypeIndicator(findSkillById(skill.name))}
              key={i}
              label={findSkillById(skill.name).name + ": " + findSkillById(skill.name).skillType}
              variant="outlined"
            />
          ))}
      </Box>
    </div>
  );
};

export default JobTitleSkills;
