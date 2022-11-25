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
import Paper from '@mui/material/Paper';
import { Con, toTimeCons } from "../Con";

const theme = createTheme();

type SendConFormProps = {
    others: User[]
    setSentCons: React.Dispatch<React.SetStateAction<Con[]>>
}

export function SendConForm(props :SendConFormProps) {
    const {loginUser, setLoginUser} = React.useContext(UserContext);
    const [receiveUser, setReceiveUser] = React.useState(UserDemo);
    const handleSendCon = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!data.get('conPoint')) {
            alert("Please enter conPoint");
            return;
        } else if (!data.get('message')) {
            alert("Please enter message");
            return;
        } else if (!receiveUser) {
            alert("Please select User");
            return;
        }
        const pointornull = data.get('conPoint');
        if (pointornull != null) {
            const point :Number = +pointornull;
            await axios.post("http://localhost:8080/send?user_id=" + loginUser.user_id, {sender: loginUser, receiver: receiveUser, point: point, message: data.get('message')})
            .then((response :any) => {
                const sent_cons: Con[] = toTimeCons(response.data.sent_cons);
                if (sent_cons !== undefined) {
                    props.setSentCons(sent_cons);
                }
            })
            .catch((err) => {throw Error(`Failed to post con: ${err}`)});
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography component="h1" variant="h6">
                        送る
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSendCon} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <SendUserSelect 
                                users={props.others}
                                receiveUser={receiveUser}
                                setReceiveUser={setReceiveUser}
                                helperText={"Conを送る相手を選んでください"}
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
                </Paper>
              </Grid>
        </ThemeProvider>
    )
}