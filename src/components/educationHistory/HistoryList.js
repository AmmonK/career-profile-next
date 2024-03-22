import React, { useState } from 'react';
import { Card, CardContent, Typography, Stack, Chip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';

const HistoryList = ({ list, editHandler, deleteHandler }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack direction="column" spacing={2}>
        {list.map((item, index) => (
          <Card sx={{ width: '100%' }} key={index}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="column" spacing={1}>
                  <h4>
                    {item.degree}
                    {item.current && (
                      <Chip label="current" color="success" size="small" />
                    )}
                  </h4>
                  <Typography component={'p'}>{item.institution}</Typography>
                  <Typography component={'p'}>
                    {dayjs(item.start).format('MM/YYYY')} -{' '}
                    {item.current
                      ? 'Present'
                      : dayjs(item.end).format('MM/YYYY')}
                  </Typography>
                </Stack>
                <Stack direction="column" spacing={1}>
                  <IconButton
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={false}
                    size="large"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    id="basic-menu"
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={() => editHandler(item)}>Edit</MenuItem>
                    <MenuItem onClick={() => deleteHandler(item)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default HistoryList;
