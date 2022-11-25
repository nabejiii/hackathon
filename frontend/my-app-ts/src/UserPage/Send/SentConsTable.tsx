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
import {Con, conDemo, editCon} from '../Con';
import DeleteButton from './DeleteButton';
import SentConContent from './SentConContent';
import SentConEdit from './SentConEdit';
import { User } from '../../SignIn/User';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

type SentConsTableProps = {
  others :User[]
  sentCons :Con[]
  setSentCons :React.Dispatch<React.SetStateAction<Con[]>>
}

export default function SentConsTable(props: SentConsTableProps) {
  const [editConId, setEditConId] = React.useState<string>('');

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
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.sentCons.map((con) => (
                <>
                <TableRow key={con.con_id} sx={{...(con.con_id == editConId && {display: 'none'})}}>
                  <SentConContent con={con} setSentCons={props.setSentCons} setEditConId={setEditConId}/>
                </TableRow>
                <TableRow key={"edit" + con.con_id} sx={{...(!(con.con_id == editConId) && {display: 'none'})}}>
                  <SentConEdit others={props.others} con={con} setSentCons={props.setSentCons} setEditConId={setEditConId}/>
                </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}