import React, { useState } from 'react';
import {
  Switch,
  FormControlLabel,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from '@mui/material';
import filterStore from '@/stores/filterStore';
import { jobLevels } from '@/utils/enum/jobLevels';

function Filters() {
  const [isRemote, setIsRemote] = useState(false);
  const [isSkills, setIsSkills] = useState(false);
  const [isFulltime, setIsFulltime] = useState(true);

  const { remote, setRemote, jobLevel, setJobLevel, skills, setSkills } = filterStore(
    (state) => state
  );

  const handleRemoteToggle = () => {
    setRemote(!isRemote);
    setIsRemote(!isRemote);
  };

  const handleSkillToggle = () => {
    setSkills(!isSkills);
    setIsSkills(!isSkills);
  };

  const handleJobLevelChange = (e) => {
    setJobLevel(e.target.value);
  };

  return (
    <div>
      <FormControlLabel
        control={<Switch checked={isRemote} onChange={handleRemoteToggle} />}
        label="Remote"
      />
      <FormControlLabel
        control={<Switch checked={isSkills} onChange={handleSkillToggle} />}
        label="Skills"
      />

      <FormControl fullWidth>
        <InputLabel id="experience-level-select">Experience level</InputLabel>
        <Select
          MenuProps={{ disablePortal: true }} // for modal backdrop styling
          labelId="experience-level-select"
          id="experience-level-select"
          value={jobLevel ?? 'All Levels'}
          label="Experience level"
          onChange={handleJobLevelChange}
        >
          {Object.keys(jobLevels).map((key) => {
            return (
              <MenuItem
                key={key}
                data-test={`job-explorer_${key}`}
                value={jobLevels[key]}
              >
                {jobLevels[key]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default Filters;
