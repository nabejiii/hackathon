import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Con, editCon } from '../Con';
import { Button } from '@mui/material';
import DeleteButton from './DeleteButton';

type SentConContentProps = {
    con: Con
    setSentCons: React.Dispatch<React.SetStateAction<Con[]>>
    setEditConId: React.Dispatch<React.SetStateAction<string>>
}

export default function SentConContent(props: SentConContentProps) {
    const handleClick = () => {
        props.setEditConId(props.con.con_id)
    }
    return (
        <>
            <TableCell>{props.con.time.toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })}</TableCell>
            <TableCell>{props.con.receiver.last_name + ' ' + props.con.receiver.first_name}</TableCell>
            <TableCell align="center">{props.con.point.toString()}</TableCell>
            <TableCell>{props.con.message}</TableCell>
            <TableCell><Button onClick={handleClick}>編集</Button></TableCell>
            <TableCell><DeleteButton con_id={props.con.con_id} setSentCons={props.setSentCons}/></TableCell>
        </>
    )
}