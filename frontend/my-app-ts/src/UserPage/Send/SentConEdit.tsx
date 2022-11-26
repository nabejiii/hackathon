import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { Con, toTimeCons } from '../Con';
import { Button } from '@mui/material';
import SendUserSelect from './SendUserSelect';
import { User, UserDemo } from '../../SignIn/User';
import axios from 'axios';
import { UserContext } from '../../UserProvider';
import { baseURL } from '../../App';

type SentConEditProps = {
    others: User[]
    con: Con
    setSentCons: React.Dispatch<React.SetStateAction<Con[]>>
    setEditConId: React.Dispatch<React.SetStateAction<string>>
}

export default function SentConEdit(props: SentConEditProps) {
    const {loginUser} = React.useContext(UserContext);
    const [receiver, setReceiver] = React.useState(props.con.receiver);
    const [point, setPoint] = React.useState<number | undefined>(props.con.point);
    const [message, setMessage] = React.useState(props.con.message);
    const handlePutCon = async () => {
        if (message == "") {
            alert("メッセージを入力してください");
            return;
        }
        if (point === undefined) {
            alert("ConPointを入力してください")
            return;
        }
        if (point !== undefined) {
            if (point < 0 || point > 100) {
                alert("ConPointが不正な値です")
                return;
            }
        }
        if (receiver == UserDemo) {
            alert("ユーザーを選択してください")
            return;
        }
        await axios.put(baseURL + "/send?user_id=" + loginUser.user_id, {con_id: props.con.con_id , sender: loginUser, receiver: receiver, point: point, message: message})
        .then((response :any) => {
            const sent_cons: Con[] = toTimeCons(response.data.sent_cons);
            if (sent_cons !== undefined) {
                props.setSentCons(sent_cons);
            }
            props.setEditConId("");
        })
        .catch((err) => {throw Error(`Failed to post con: ${err}`)});
    };
    const quitEdit = () => {
        props.setEditConId("");
        setReceiver(props.con.receiver)
        setPoint(props.con.point);
        setMessage(props.con.message);
    }
        
    return (
        <>
            <TableCell>{props.con.time.toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })}</TableCell>
            <TableCell>
                <SendUserSelect 
                                users={props.others}
                                receiveUser={receiver}
                                setReceiveUser={setReceiver}
                                helperText={''}
                                size={"small"}
                />
            </TableCell>
            <TableCell align="center">
                <TextField
                    required
                    error={point !== undefined && (point > 100 || point < 0)}
                    helperText={point !== undefined && (point > 100 || point < 0) && ("0~100で入力してください")}
                    id="conPoint"
                    name="conPoint"
                    label="送るConポイント"
                    type="number"
                    value={point}
                    onChange={(event) => {
                        if (event.target.value === "") {
                            setPoint(undefined);
                        } else {
                            setPoint(Number(event.target.value))
                        }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    size="small"
                />
            </TableCell>
            <TableCell>
                <TextField 
                    fullWidth
                    required
                    error={message.length > 100 || message == ""}
                    helperText={message.length > 100 && ("100文字以内で入力してください")}
                    onChange={(event) => setMessage(event.target.value)}
                    value={message}
                    name="message"
                    id="message" 
                    label="メッセージ" 
                    variant="standard" 
                    size="small"
                />
            </TableCell>
            <TableCell>
                <Button onClick={handlePutCon} variant="contained">完了</Button>
            </TableCell>
            <TableCell><Button onClick={quitEdit}>やめる</Button></TableCell>
        </>
    )
}