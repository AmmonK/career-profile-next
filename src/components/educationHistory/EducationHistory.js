import React, { useState } from 'react';
import NoHistory from './NoHistory';
import HistoryList from './HistoryList';
import EditHistory from './EditHistory';
import { Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

const EducationHistory = () => {
  const [history, setHistory] = useState([]);
  const [editHistory, setEditHistory] = useState(null);

  const nonsenseDegrees = [
    "Bachelor of Time Travel",
    "Master of Unicorn Management",
    "Doctorate in Underwater Basket Weaving",
    "Associate in Alien Communication",
    "Bachelor of Invisible Arts",
    "Master of Advanced Pillow Fighting",
    "Doctorate in Chocolate Studies",
    "Associate in the Art of Napping",
    "Bachelor of Quantum Entanglement",
    "Master in Dragonology",
    "Doctorate in Advanced Procrastination",
    "Associate in Space Tourism",
    "Bachelor of Wizardry and Witchcraft",
    "Master of Parallel Universe Negotiations",
    "Doctorate in Vampire Psychology",
    "Associate in Hobbit Hole Design",
    "Bachelor in the Study of Mystical Creatures",
    "Master in the Dynamics of Santa’s Sleigh",
    "Doctorate in Superhero Ethics",
    "Associate in Pirate Ship Engineering",
    "Bachelor of Ghost Communication",
    "Master in Zombie Survival Strategies",
    "Doctorate in Time Loop Solutions",
    "Associate in Fairy Tale Problem Solving"
];


  const nonsenseColleges = [
    'University of Phoenix',
    'Aurora Global University',
    'Crestview University',
    'Elysium Institute of Technology',
    'Golden Summit University',
    'Halcyon College',
    'Infinity University',
    'Jupiter Advanced Institute of Science',
    'Kingsford University',
    'Luminous University',
    'Mystic River University',
    'Nova Galactic University',
    'Olympus University',
    'Polaris University',
    'Quantum University',
    'Riverside Institute of Technology',
    'Solaris University of Arts',
    'Terra Nova University',
    'Utopia University',
    'Vortex University',
    'Whispering Pines University',
    'Xenon University',
    'Yonder University',
    'Zephyr University',
  ];

  // Function to get a random element from an array
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

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
      institution: getRandomElement(nonsenseColleges),
      degree: getRandomElement(nonsenseDegrees),
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
