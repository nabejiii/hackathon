import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Con } from '../Con';
import DeleteButton from './DeleteButton';

type SentConContentProps = {
    con: Con
    setSentCons: React.Dispatch<React.SetStateAction<Con[]>>
    editConId: string
    setEditConId: React.Dispatch<React.SetStateAction<string>>
}

const ITEM_HEIGHT = 48;

const options = [
    '編集',
    '削除'
]

export default function SentConContent(props: SentConContentProps) {
    const handleEdit = () => {
        props.setEditConId(props.con.con_id);
        handleMenuClose();
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <TableCell>{props.con.time.toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })}</TableCell>
            <TableCell>{props.con.receiver.last_name + ' ' + props.con.receiver.first_name}</TableCell>
            <TableCell align="center">{props.con.point.toString()}</TableCell>
            <TableCell>{props.con.message}</TableCell>
            <TableCell sx={{...(props.editConId == '' && {display: 'none'})}}></TableCell>
            <TableCell sx={{...(!(props.editConId != '') && {display: 'none'})}}></TableCell>
            <TableCell sx={{...(props.editConId != '' && {display: 'none'})}}>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                    'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '7.5ch',
                    },
                    }}
                >
                    <MenuItem onClick={handleEdit}>編集</MenuItem>
                    <DeleteButton con_id={props.con.con_id} setSentCons={props.setSentCons} handleMenuClose={handleMenuClose}/>
                </Menu>
            </TableCell>
        </>
    )
}