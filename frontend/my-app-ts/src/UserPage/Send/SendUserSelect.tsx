import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { User, UserDemo } from '../../SignIn/User';

type SendUserSelectProps = {
    users: User[]
    sendUser: User
    setSendUser: React.Dispatch<React.SetStateAction<User>>
}

export default function SendUserSelect(props :SendUserSelectProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedUser = props.users.find(user=>(user.user_id==event.target.value));
        if (typeof selectedUser != "undefined") {
            props.setSendUser(selectedUser);
        }
      };
    
    return (
        <Grid item xs={12} sm={6}>
            <TextField
                id="sendUser"
                select
                label="ユーザー選択"
                value={props.sendUser.last_name + ' ' + props.sendUser.first_name}
                onChange={handleChange}
                helperText="Conを送る相手を選んでください"
                variant="standard"
                size="medium"
                >
                {props.users.map((user) => (
                    <MenuItem key={user.user_id} value={user.last_name + " " + user.first_name}>
                        {user.last_name + " " + user.first_name}
                    </MenuItem>
                ))}
            </TextField>
        </Grid>
    )
}