import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Title from '../Title';
import { Member } from './Member';
import MemberContent from './MemberContent';
import { UserContext } from '../../UserProvider';
import MemberEdit from './MemberEdit';


function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

type MembersTableProps = {
  members :Member[]
  setMembers :React.Dispatch<React.SetStateAction<Member[]>>
}

export default function MembersTable(props: MembersTableProps) {
  const [edit, setEdit] = React.useState(false);
  const {loginUser} = React.useContext(UserContext);
  return (
    <React.Fragment>
      <Title>メンバー</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>氏名</TableCell>
            <TableCell sx={{...(!edit && {display: 'none'})}}></TableCell>
            <TableCell align="center">今週の ConPoint</TableCell>
            <TableCell align="center">累計 ConPoint</TableCell><TableCell sx={{...(!edit && {display: 'none'})}}></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.members.map((member) => (
            <>
            <TableRow key={member.user_id} sx={{...(edit && member.user_id == loginUser.user_id && {display: 'none'})}}>
              <MemberContent edit={edit} member={member} setEdit={setEdit}/>
            </TableRow>
            <TableRow key={"edit" + member.user_id} sx={{...(!(edit && member.user_id == loginUser.user_id) && {display: 'none'})}}>
              <MemberEdit member={member} setMembers={props.setMembers} setEdit={setEdit}/>
            </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}