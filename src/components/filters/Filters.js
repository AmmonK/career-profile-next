import React, { useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import filterStore from '@/stores/filterStore';

function Filters() {
  const [isRemote, setIsRemote] = useState(false);
  const [isFulltime, setIsFulltime] = useState(true);

  const {remote, setRemote} = filterStore((state) => state);
  const {fulltime, setFulltime} = filterStore((state) => state);

  const handleRemoteToggle = () => {
    setRemote(!isRemote);
    setIsRemote(!isRemote);
  };

  const handleFulltimeToggle = () => {
    setFulltime(!isFulltime);
    setIsFulltime(!isFulltime);
  }

  return (
    <div>
      <FormControlLabel
        control={<Switch checked={isRemote} onChange={handleRemoteToggle} />}
        label="Remote"
      />
      <FormControlLabel
        control={<Switch checked={isFulltime} onChange={handleFulltimeToggle} />}
        label="Fulltime"
      />  
    </div>
  );
}

export default Filters;
