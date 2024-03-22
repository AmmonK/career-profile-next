import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Stack,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

const EditHistory = ({ item, addMethod, cancelHandler }) => {
  const [workItem, setWorkItem] = useState(item);

  return (
    <>
      <Card>
        <CardContent>
          <h5>Edit education history</h5>
          <Stack direction="column" spacing={2}>
            <TextField
              label="Institution"
              variant="outlined"
              value={workItem.institution}
              onChange={(e) =>
                setWorkItem({ ...workItem, institution: e.target.value })
              }
            />
            <TextField
              label="Degree"
              variant="outlined"
              value={workItem.degree}
              onChange={(e) =>
                setWorkItem({ ...workItem, degree: e.target.value })
              }
            />
            <Stack direction="row" spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label="Start"
                  format="MM/YYYY"
                  value={dayjs(workItem.start)}
                  onChange={(e) => setWorkItem({ ...workItem, start: e })}
                />
                <DateField
                  label="End"
                  format="MM/YYYY"
                  value={dayjs(workItem.end)}
                  onChange={(e) => setWorkItem({ ...workItem, end: e })}
                />
              </LocalizationProvider>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={workItem.current}
                      onChange={(e) =>
                        setWorkItem({ ...workItem, current: e.target.checked })
                      }
                    />
                  }
                  label="I'm currently attending"
                />
              </FormGroup>
            </Stack>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => cancelHandler()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addMethod(workItem)}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default EditHistory;
