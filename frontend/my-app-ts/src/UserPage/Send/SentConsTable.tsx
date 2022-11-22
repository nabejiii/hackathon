import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import {Con} from '../Con';


function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

type SentConsTableProps = {
  SentCons :Con[]
}

export default function SendConsTable(props: SentConsTableProps) {
  return (
    <React.Fragment>
      <Title>送ったCons</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>日付</TableCell>
            <TableCell>送った相手</TableCell>
            <TableCell align="center">Con Point</TableCell>
            <TableCell>メッセージ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.SentCons.map((Con) => (
            <TableRow key={Con.con_id}>
              <TableCell>{Con.time.toString()}</TableCell>
              <TableCell>{Con.sender.first_name + ' ' + Con.sender.last_name}</TableCell>
              <TableCell align="center">{Con.point.toString()}</TableCell>
              <TableCell>{Con.message}</TableCell>
            </TableRow>
          ))}
          </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}