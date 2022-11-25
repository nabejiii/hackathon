import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import {Con} from '../Con';

type RecConsTableProps = {
  RecCons :Con[]
}

export default function RecConsTable(props: RecConsTableProps) {
  return (
    <React.Fragment>
      <Title>受け取ったCons</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>日付</TableCell>
            <TableCell>送信者</TableCell>
            <TableCell align="center">Con Point</TableCell>
            <TableCell>メッセージ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.RecCons.map((Con) => (
            <TableRow key={Con.con_id}>
              <TableCell>{Con.time.toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })}</TableCell>{/*Con.time.getMonth() + "/" + Con.time.getDay()*/}
              <TableCell>{Con.sender.last_name + ' ' + Con.sender.first_name}</TableCell>
              <TableCell align="center">{Con.point.toString()}</TableCell>
              <TableCell>{Con.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}