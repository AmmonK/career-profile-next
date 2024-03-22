import React, { useState } from 'react';
import NoHistory from './NoHistory';
import HistoryList from './HistoryList';
import EditHistory from './EditHistory';
import { Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

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

  const nonsenseTitles = [
    'Chief Imagination Officer',
    'Digital Overlord',
    'Wizard of Light Bulb Moments',
    'Dream Alchemist',
    'Creative Evangelist',
    'Idea Sherpa',
    'Chief of Unicorn Division',
    'Happiness Engineer',
    'Narrative Architect',
    'Visionary in Charge',
    'Quantum Leap Strategist',
    'Master of Coin',
    'Reality Distortion Engineer',
    'Growth Hacker',
    'Director of First Impressions',
    'Head of Global Trends and Futuring',
    'Innovation Sherpa',
    'Brand Warrior',
    'Social Media DJ',
    'Disruption Director',
    'Mindset Transformation Wizard',
    'Sustainability Guru',
    'Eco-Warrior',
    'Customer Happiness Advocate',
    'Chief Cheerleader',
    'Digital Prophet',
    'Chief Curiosity Curator',
    'Head of Optimism',
    'Galactic Travel Advisor',
    'Time Travel Advisor',
    'Professional Binge Watcher',
    'Underwater Firefighter',
    'Wizard of Want',
    'Relationship Astronaut',
    'Space Hospitality Manager',
    'Virtual Reality Journey Planner',
    'Chief of Chatbot Communications',
    'Mindful Wellness Coach',
    'Blockchain Explorer',
    'Crypto Asset Diversification Specialist',
    'Senior Roadblock Remover',
    'Dynamic Brand Activator',
    'Global Talent Acquisition Magician',
    'Cultural Happiness Ambassador',
    'Augmented Reality Journey Builder',
    'Director of Coffee Operations',
    'Organizational Gandalf',
    'Memory Surgeon',
    'Parallel Universe Coordinator',
    'Emoji Translator',
  ];

  const nonsenseEmployers = [
    'Quantum Synergy',
    'Galactic Innovations',
    'Nebula Weaver',
    'Eclipse Endeavors',
    'Orbit Oasis',
    'Cosmic Creations',
    'Stellar Solutions',
    'Vortex Ventures',
    'Pioneer Pixels',
    'Digital Dreamscape',
    'Infinite Imaginations',
    'Nova Nexus',
    'Celestial Cybernetics',
    'Astral Axioms',
    'Ethereal Elements',
    'Mystic Modules',
    'Phantom Phoenix',
    'Visionary Valleys',
    'Temporal Technologies',
    'Interstellar Intelligence',
    'Dimensional Dynamics',
    'Quantech',
    'Skyward Software',
    'Futurist Forge',
    'Idea Infinity',
    'Nimbus Networks',
    'Omniverse Origins',
    'Plasma Platforms',
    'Quantum Quirks',
    'Radiant Realms',
    'Spectral Systems',
    'Techno Titans',
    'Universe Unleashed',
    'Virtuoso Visions',
    'Warp Wave',
    'Xenon X',
    'Zenith Zones',
    'Accord Algorithms',
    'Bit Beyond',
    'Core Cosmos',
    'Dawn Digits',
    'Elevate Essence',
    'Flux Frontier',
    'Glow Galaxy',
    'Horizon Heights',
    'Insight Infinity',
    'Jupiter Junction',
    'Kaleido Kinetics',
    'Luminous Legacy',
    'Mindful Matrix',
  ];

  // Function to get a random element from an array
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
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
      jobTitle: getRandomElement(nonsenseTitles),
      employer: getRandomElement(nonsenseEmployers),
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
        Work History
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
                Add your work history
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

export default WorkHistory;
