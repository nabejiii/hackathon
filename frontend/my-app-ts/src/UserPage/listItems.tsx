import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SendIcon from '@mui/icons-material/Send';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';

export function MainListItems(){
  const navigate = useNavigate();

  return (
    <React.Fragment>
    <ListItemButton onClick={()=>{navigate('/home')}}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="ホーム" />
    </ListItemButton>
    <ListItemButton onClick={()=>{navigate('/send')}}>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="送る" />
    </ListItemButton>
  </React.Fragment>
  )
}

export function SecondaryListItems(){
  const navigate = useNavigate();

  return (
    <React.Fragment>
    <ListItemButton onClick={()=>{navigate('/members')}}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="メンバー" />
    </ListItemButton>
  </React.Fragment>
  )
}