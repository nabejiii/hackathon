import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { orange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { Member } from './Member';
import axios from 'axios';
import { UserContext } from '../../UserProvider';
import { baseURL } from '../../App';

type MemberEditProps = {
    setMembers: React.Dispatch<React.SetStateAction<Member[]>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    member: Member
}

export default function MemberEdit(props: MemberEditProps) {
    const {loginUser} = React.useContext(UserContext);
    const [firstName, setFirstName] = React.useState(loginUser.first_name);
    const [lastName, setLastName] = React.useState(loginUser.last_name);
    const handleEditMember = async () => {
        if (firstName == "") {
            alert("名前を入力してください");
            return;
        }
        if (lastName == "") {
            alert("苗字を入力してください");
            return;
        }
        if (firstName.length > 25 || lastName.length > 25) {
            alert("氏名は25文字以内で入力してください");
            return;
        }
        await axios.put(baseURL + "/user?user_id=" + loginUser.user_id, {first_name: firstName, last_name: lastName})
        .then((response :any) => {
            const members: Member[] = response.data;
            if (members !== undefined) {
                props.setMembers(members);
            }
            props.setEdit(false);
            const member = members.find(user => user.user_id == loginUser.user_id);
            if(member != undefined) {
                setFirstName(member.first_name);
                setLastName(member.last_name);
            }
        })
        .catch((err) => {throw Error(`Failed to post con: ${err}`)});
    };
    const quitEdit = () => {
        props.setEdit(false);
        setFirstName(loginUser.first_name);
        setLastName(loginUser.last_name);
    }
        
    return (
        <>
            <TableCell><Avatar sx={{bgcolor: orange[100], color: orange[600]}}/></TableCell>
            <TableCell align="center">
                <TextField
                    error={lastName.length > 25 || lastName==""}
                    helperText={(lastName.length > 25 && ("25文字以内で入力してください")) || (lastName == "" && ("必須です"))}
                    id="lastName"
                    name="lastName"
                    label="氏"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    size="small"
                />
            </TableCell>
            <TableCell>
                <TextField 
                    error={firstName.length > 25 || firstName==""}
                    helperText={(firstName.length > 25 && ("25文字以内で入力してください")) || (firstName == "" && ("必須です"))}
                    onChange={(event) => setFirstName(event.target.value)}
                    value={firstName}
                    name="firstName"
                    id="firstName" 
                    label="名" 
                    variant="standard" 
                    size="small"
                />
            </TableCell>
            <TableCell align="center">{props.member.week_point.toString()}</TableCell>
            <TableCell align="center">{props.member.total_point.toString()}</TableCell>
            <TableCell>
                <Button onClick={handleEditMember} variant="contained">完了</Button>
            </TableCell>
            <TableCell><Button onClick={quitEdit}>やめる</Button></TableCell>
        </>
    )
}