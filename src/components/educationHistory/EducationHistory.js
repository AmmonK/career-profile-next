import React, { useState } from 'react';
import NoHistory from './NoHistory';
import HistoryList from './HistoryList';
import EditHistory from './EditHistory';
import { Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

const EducationHistory = () => {
  const [history, setHistory] = useState([]);
  const [editHistory, setEditHistory] = useState(null);

  function generate_uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var uuid = (Math.random() * 16) | 0,
          v = c == 'x' ? uuid : (uuid & 0x3) | 0x8;
        return uuid.toString(16);
      }
    );
  }

  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  const addHandler = () => {
    const startDate = randomDate(new Date(2012, 0, 1), new Date());
    const endDate = randomDate(startDate, new Date());

    setEditHistory({
      id: generate_uuidv4(),
      institution: 'University of Phoenix',
      degree: 'Bachelors of Science in Information Technology',
      start: dayjs(startDate).startOf('day'),
      end: dayjs(endDate).endOf('day'),
      current: !!((Math.random() * 2) | 0),
    });
  };

  const cancelHandler = () => {
    setEditHistory(null);
  };

  const editHandler = (item) => {
    setEditHistory(item);
  };

  const deleteHandler = (item) => {
    setHistory(history.filter((i) => i.id !== item.id));
  };

  const addMethod = (item) => {
    if (history.find((i) => i.id === item.id)) {
      setHistory(history.map((i) => (i.id === item.id ? item : i)));
    } else {
      setHistory([...history, item]);
    }
    setEditHistory(null);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Education History
      </Typography>
      {!editHistory && (
        <>
          <Stack direction="column" spacing={4} sx={{ marginTop: '4rem' }}>
            {history.length === 0 ? (
              <NoHistory addHandler={addHandler} />
            ) : (
              <HistoryList
                list={history}
                editHandler={editHandler}
                deleteHandler={deleteHandler}
              />
            )}

            <Stack
              direction="row"
              spacing={2}
              justifyContent={history.length > 0 ? 'flex-start' : 'center'}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => addHandler()}
              >
                Add your education history
              </Button>
            </Stack>
          </Stack>
        </>
      )}

      {editHistory && (
        <EditHistory
          item={editHistory}
          addMethod={addMethod}
          cancelHandler={cancelHandler}
        />
      )}
    </>
  );
};

export default EducationHistory;
