import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from '../Title';
import {Con} from '../Con';
import { Button } from '@mui/material';


function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

type SentConsTableProps = {
  sentCons :Con[]
}

export default function SendConsTable(props: SentConsTableProps) {
  const handleDelete = () => {
    const con_id = document.getElementById('button');
    console.log(con_id);
  }
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>送ったCons</Title>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>日付</TableCell>
                <TableCell>送った相手</TableCell>
                <TableCell align="center">Con Point</TableCell>
                <TableCell>メッセージ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.sentCons.map((con) => (
                <TableRow key={con.con_id}>
                  <TableCell>{con.time.toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })}</TableCell>
                  <TableCell>{con.receiver.last_name + ' ' + con.receiver.first_name}</TableCell>
                  <TableCell align="center">{con.point.toString()}</TableCell>
                  <TableCell>{con.message}</TableCell>
                  <Button id={con.con_id} onClick={handleDelete}>削除</Button>
                </TableRow>
              ))}
              </TableBody>
          </Table>
          <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
            See more orders
          </Link>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}