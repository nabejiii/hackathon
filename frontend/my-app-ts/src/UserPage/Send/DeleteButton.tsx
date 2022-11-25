import * as React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { Con, toTimeCons } from '../Con';
import { UserContext } from '../../UserProvider';

type DeleteButtonProps = {
    con_id :string
    setSentCons :React.Dispatch<React.SetStateAction<Con[]>>
}

export default function DeleteButton (props :DeleteButtonProps) {
    const {loginUser, setLoginUser} = React.useContext(UserContext);
    const handleDelete = (e :any) => {
        const conId = e.currentTarget.dataset['id'];
        axios.delete('http://localhost:8080/send?user_id=' + loginUser.user_id, {data :{con_id: conId}})
        .then((response :any) => {
            const sent_cons: Con[] = toTimeCons(response.data.sent_cons);
            if (sent_cons !== undefined) {
                props.setSentCons(sent_cons);
            }
        })
        .catch((err) => {throw Error(`Failed to delete con: ${err}`)});
    }
    return (
        <Button data-id={props.con_id} onClick={handleDelete}>削除</Button>
    )
}