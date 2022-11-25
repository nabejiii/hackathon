import * as React from 'react';
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
import Box from '@mui/material/Box';
import { baseURL } from '../App';
import pic from "../image/foxpic.png";

function UserDialogContents(props: UserDialogProps) {
    const [users,setUsers] = React.useState<User[]>([])
    const fetchUsers = async () => {
      await axios
      .get(baseURL + "/login")
      .then((response :any) => {setUsers(response.data)})
      .catch((err :Error) => {throw Error(`Failed to fetch users: ${err}`)})
    };
    React.useEffect(() => {
        fetchUsers()
    },[]);
    users.map((user) => {user.long_name = user.last_name + ' ' + user.first_name});

    
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
        </List>
        </Dialog>
    );
}

export interface SimpleDialogDemoProps {
    setUser: (value :User) => void;
  }

export default function SimpleDialogDemo(props :SimpleDialogDemoProps) {
  const [open, setOpen] = React.useState(false);
  
  const [selectedUser, setSelectedUser] = React.useState<User>(UserDemo);

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
      <Typography 
            variant="subtitle1" component="div" fontSize={30} >
        <img src={pic} alt="foxpic" width={60}></img>
        Con !!
      </Typography>
      <Box sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
      }}>
        <Avatar sx={{ bgcolor: orange[100], color: orange[600], ...((selectedUser.long_name == "") && { display: 'none' })}}>
          <PersonIcon />
        </Avatar>
      </Box>
      <Typography variant="subtitle1" component="div" fontSize={20} m={2}>
        {selectedUser.long_name}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        ユーザー選択
      </Button>
      <UserDialogContents
        selectedUser={selectedUser}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}