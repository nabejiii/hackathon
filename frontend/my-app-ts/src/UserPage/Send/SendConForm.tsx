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
import { baseURL } from "../../App";

const theme = createTheme();

type SendConFormProps = {
    others: User[]
    setSentCons: React.Dispatch<React.SetStateAction<Con[]>>
}

export function SendConForm(props :SendConFormProps) {
    const {loginUser, setLoginUser} = React.useContext(UserContext);
    const [receiveUser, setReceiveUser] = React.useState(UserDemo);
    const [point, setPoint] = React.useState<number>();
    const [message, setMessage] = React.useState('');
    let a : number | undefined = 2;
    const handleSendCon = async () => {
        if (receiveUser === UserDemo) {
            alert("送る相手を選択してください");
            return;
        }
        if (point === undefined) {
            alert("ConPointを入力してください")
            return;
        }
        if (point !== undefined) {
            if (point < 0 || point > 100) {
                alert("ConPointが不正な値です");
                return;
            }
        } 
        if (message == '') {
            alert("メッセージを入力してください");
            return;
        }
        if (message.length > 100 ) {
            alert("メッセージは100文字までです");
            return;
        }
        await axios.post(baseURL + "/send?user_id=" + loginUser.user_id, {sender: loginUser, receiver: receiveUser, point: point, message: message})
        .then((response :any) => {
            const sent_cons: Con[] = toTimeCons(response.data.sent_cons);
            if (sent_cons !== undefined) {
                props.setSentCons(sent_cons);
            }
            setReceiveUser(UserDemo);
            setPoint(0);
            setMessage('');
        })
        .catch((err) => {throw Error(`Failed to post con: ${err}`)});
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography component="h1" variant="h6">
                        送る
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <SendUserSelect 
                                users={props.others}
                                receiveUser={receiveUser}
                                setReceiveUser={setReceiveUser}
                                helperText={"Conを送る相手を選んでください"}
                                size={"medium"}
                            />
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    error={point!== undefined && (point < 0 || point > 100)}
                                    id="conPoint"
                                    name="conPoint"
                                    label="送るConポイント"
                                    type="number"
                                    value={point}
                                    onChange={(event) => {
                                        if (event.target.value === "") {
                                            setPoint(undefined)
                                        } else {
                                            setPoint(Number(event.target.value))
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    helperText="100ポイントまで"
                                />
                            </Grid>
                            <Grid item xs={12} sm={100} width={500} sx={{mr: 3, ml: 3}}>
                            <TextField 
                                required
                                fullWidth
                                error={message.length > 100}
                                onChange={(event) => setMessage(event.target.value)}
                                value={message}
                                name="message"
                                id="message" 
                                label="メッセージ" 
                                variant="standard"
                                helperText="100文字まで"
                            />
                            </Grid>
                        </Grid>
                        <Button
                            onClick={handleSendCon}
                            variant="contained"
                            color={"primary"}
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