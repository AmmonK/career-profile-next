import React from 'react';
import { Stack, Button, Link, Avatar } from '@mui/material';

function generate_uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var uuid = (Math.random() * 16) | 0,
      v = c == 'x' ? uuid : (uuid & 0x3) | 0x8;
    return uuid.toString(16);
  });
}

function generateAvatar() {
  return `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${generate_uuidv4()}`;
}

const NavAvatar = () => {
  return (
    <Avatar sx={{ height: 50, width: 50 }} src={generateAvatar()} />
  );
};

export default React.memo(NavAvatar);