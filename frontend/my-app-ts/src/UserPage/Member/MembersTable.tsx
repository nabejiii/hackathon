import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Title from '../Title';
import {Con} from '../Con';
import { Member } from './Member';


function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

type MembersTableProps = {
  members :Member[]
}

export default function MembersTable(props: MembersTableProps) {
  return (
    <React.Fragment>
      <Title>メンバー</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>氏名</TableCell>
            <TableCell align="center">Con Point</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.members.reverse().map((member) => (
            <TableRow key={member.user_id}>
              <TableCell><Avatar /></TableCell>
              <TableCell>{member.last_name + ' ' + member.first_name}</TableCell>
              <TableCell align="center">{member.point.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}