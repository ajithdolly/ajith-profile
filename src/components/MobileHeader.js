import * as React from 'react';
import { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const MobileHeader = ({ onScroll }) => {
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
      <Grid container padding='1rem'>
        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'start' }}> 
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            {open ? <CloseIcon fontSize="inherit" /> : <MenuIcon fontSize="inherit" />}
          </IconButton>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'start' }}> 
          <Typography variant="h5" style={{ paddingTop: '.6rem', fontWeight: 'bold' }}>
            Ajith Dollichan
          </Typography>
        </Grid>
      </Grid>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); onScroll('About'); }}>About</MenuItem>
        <MenuItem onClick={() => { handleClose(); onScroll('Experience'); }}>Experience</MenuItem>
        <MenuItem onClick={() => { handleClose(); onScroll('Project'); }}>Project</MenuItem>
        <MenuItem onClick={() => { handleClose(); onScroll('Contact'); }}>Contact</MenuItem>
      </Menu>
    </>
  );
};

export default MobileHeader;