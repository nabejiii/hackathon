import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Con, editCon, toTimeCons } from '../Con';
import { Button } from '@mui/material';
import DeleteButton from './DeleteButton';
import SendUserSelect from './SendUserSelect';
import { User } from '../../SignIn/User';
import axios from 'axios';
import { UserContext } from '../../UserProvider';

type SentConEditProps = {
    others: User[]
    con: Con
    setSentCons: React.Dispatch<React.SetStateAction<Con[]>>
    setEditConId: React.Dispatch<React.SetStateAction<string>>
}

export default function SentConEdit(props: SentConEditProps) {
    const {loginUser, setLoginUser} = React.useContext(UserContext);
    const [receiver, setReciver] = React.useState(props.con.receiver);
    const [point, setPoint] = React.useState(props.con.point);
    const [message, setMessage] = React.useState(props.con.message);
    const handlePutCon = async () => {
        if (message == "") {
            alert("Please enter message");
            return;
        }
        await axios.put("http://localhost:8080/send?user_id=" + loginUser.user_id, {con_id: props.con.con_id , sender: loginUser, receiver: receiver, point: point, message: message})
        .then((response :any) => {
            const sent_cons: Con[] = toTimeCons(response.data.sent_cons);
            if (sent_cons !== undefined) {
                props.setSentCons(sent_cons);
            }
            props.setEditConId("");
            console.log(message);
        })
        .catch((err) => {throw Error(`Failed to post con: ${err}`)});
    };
    const quitEdit = () => {
        props.setEditConId("");
    }
        
    return (
        <>
            <TableCell>{props.con.time.toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })}</TableCell>
            <TableCell>
                <SendUserSelect 
                                users={props.others}
                                receiveUser={receiver}
                                setReceiveUser={setReciver}
                                helperText={''}
                />
            </TableCell>
            <TableCell align="center">
                <TextField
                    id="conPoint"
                    name="conPoint"
                    label="送るConポイント"
                    type="number"
                    value={point}
                    onChange={(event) => setPoint(Number(event.target.value))}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                />
            </TableCell>
            <TableCell>
                <TextField 
                    fullWidth
                    onChange={(event) => setMessage(event.target.value)}
                    value={message}
                    name="message"
                    id="message" 
                    label="メッセージ" 
                    variant="standard" 
                />
            </TableCell>
            <TableCell>
                <Button onClick={handlePutCon}>完了</Button>
            </TableCell>
            <TableCell><Button onClick={quitEdit}>やめる</Button></TableCell>
        </>
    )
}