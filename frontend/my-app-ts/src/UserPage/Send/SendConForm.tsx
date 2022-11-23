import * as React from "react";
import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import SendUserSelect from "./SendUserSelect";
import { User, UserDemo } from "../../SignIn/User";
import { UserContext } from '../../UserProvider';


const theme = createTheme();

export function SendConForm() {
    const {loginUser, setLoginUser} = React.useContext(UserContext);
    const HandleSendCon = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!data.get('conPoint')) {
            alert("Please enter conPoint");
            return;
        } else if (!data.get('message')) {
            alert("Please enter message");
            return;
        } else if (!sendUser) {
            alert("Please select User");
            return;
        }
        await axios.post('http://localhost:8000/send?user_id=' + loginUser.user_id, {sender: loginUser, receiver: sendUser, point: data.get('conPoint'), message: data.get('message')})
        .then(() => {})
        .catch((err) => {throw Error(`Failed to post con: ${err}`)});
    };
    const [users, setUsers] = React.useState<User[]>([])
    const FetchOthers = async () => {
      await axios
      .get("http://localhost:8000/login")
      .then((response :any) => {setUsers(response.data.filter((user :User)=>(user.user_id != loginUser.user_id)))})
      .catch((err :Error) => {throw Error(`Failed to fetch others: ${err}`)})
    };
    React.useEffect(() => {
        FetchOthers()
    },[]);
    const [sendUser, setSendUser] = React.useState(UserDemo);

    return (
        <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h6">
                送る
            </Typography>
            <Box component="form" noValidate onSubmit={HandleSendCon} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <SendUserSelect 
                        users={users}
                        sendUser={sendUser}
                        setSendUser={setSendUser}
                    />
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="conPoint"
                            name="conPoint"
                            label="送るConポイント"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={100} width={500}>
                    <TextField 
                        fullWidth
                        name="message"
                        id="message" 
                        label="メッセージ" 
                        variant="standard" 
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    送信
                </Button>
            </Box>
        </ThemeProvider>
    )
}