import React, { useState } from 'react';
import NoHistory from './NoHistory';
import HistoryList from './HistoryList';
import EditHistory from './EditHistory';
import { Button } from '@mui/material';

const WorkHistory = () => {
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

  const addHandler = () => {
    setEditHistory({
      id: generate_uuidv4(),
      jobTitle: 'Software Engineer',
      employer: 'University of Phoenix',
      start: new Date(),
      end: new Date(),
      current: true,
    });
  };

  const cancelHandler = () => {
    setEditHistory(null);
  }

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
      {!editHistory && (
        <>
          {history.length === 0 ? (
            <NoHistory addHandler={addHandler} />
          ) : (
            <HistoryList
              list={history}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
            />
          )}

<hr/>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addHandler()}
          >
            Add your work history
          </Button>
        </>
      )}

      {editHistory && <EditHistory item={editHistory} addMethod={addMethod} cancelHandler={cancelHandler} />}

    </>
  );
};

export default WorkHistory;
