import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { orange } from '@mui/material/colors';
import {User, UserDemo, UserDialogProps} from './User';

function UserDialogContents(props: UserDialogProps) {
    const [users,setUsers] = useState<User[]>([])
    const fetchUsers = async () => {
      await axios
      .get("http://localhost:8000/login")
      .then((response :any) => {setUsers(response.data)})
      .catch((err :Error) => {throw Error(`Failed to fetch users: ${err}`)})
    };
    useEffect(() => {
        fetchUsers()
    },[]);
    users.map((user) => {user.long_name = user.first_name + ' ' + user.last_name});

    
    const { onClose, selectedUser, open } = props;
    const handleClose = () => {
        onClose(selectedUser);
    };

    const handleListItemClick = (value: User) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}  fullWidth={true}>
        <DialogTitle>Select account</DialogTitle>
        <List sx={{ pt: 0 }}>
            {users.map((user) => (
            <ListItem button onClick={() => handleListItemClick(user)} key={user.user_id}>
                <ListItemAvatar>
                <Avatar sx={{ bgcolor: orange[100], color: orange[600] }}>
                    <PersonIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.long_name} />
            </ListItem>
            ))}
            <ListItem autoFocus button onClick={() => handleListItemClick(users[0])}>
            <ListItemAvatar>
                <Avatar>
                <AddIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
            </ListItem>
        </List>
        </Dialog>
    );
}

export interface SimpleDialogDemoProps {
    setUser: (value :User) => void;
  }

export default function SimpleDialogDemo(props :SimpleDialogDemoProps) {
  const [open, setOpen] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState<User>(UserDemo);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: User) => {
    setOpen(false);
    setSelectedUser(value);
    props.setUser(value)
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Selected User : {selectedUser.long_name}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Select User
      </Button>
      <UserDialogContents
        selectedUser={selectedUser}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}