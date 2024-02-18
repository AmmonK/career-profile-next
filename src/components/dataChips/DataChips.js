import React from 'react';
import { Stack, Card, CardContent, Chip } from '@mui/material';
import { convertJobLevel } from '@/utils/enum/jobLevels';

const DataChips = ({posting}) => {
  return (
    <Stack direction="row">
      <Chip label={'remote: ' + posting.remote_type_name} />
      <Chip
        label={'level: ' + convertJobLevel(posting.min_years_experience)}
      />
      <Chip label={'soc5: ' + posting.soc5_name} />
    </Stack>
  );
};

export default DataChips;
