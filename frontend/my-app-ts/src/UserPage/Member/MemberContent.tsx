import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { orange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteUserButton from './DeleteUserButton';
import { Member } from './Member';
import { UserContext } from '../../UserProvider';

type MemberContentProps = {
    member: Member
    edit: boolean
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const ITEM_HEIGHT = 35;

const options = [
    '編集',
    '削除'
]

export default function MemberContent(props: MemberContentProps) {
    const {loginUser} = React.useContext(UserContext);
    const handleEdit = () => {
        handleMenuClose();
        props.setEdit(true);
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
            <TableCell><Avatar sx={{bgcolor: orange[100], color: orange[600]}}/></TableCell>
            <TableCell>{props.member.last_name + ' ' + props.member.first_name}</TableCell>
            <TableCell sx={{...(!props.edit && {display: 'none'})}}></TableCell>
            <TableCell align="center">{props.member.week_point.toString()}</TableCell>
            <TableCell align="center">{props.member.total_point.toString()}</TableCell>
            <TableCell sx={{...(!(props.member.user_id == loginUser.user_id) && {display: 'none'})}}>
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
                        maxHeight: ITEM_HEIGHT * 3,
                        width: '7.5ch',
                        textAlign: 'center'
                    },
                    }}
                >
                    <MenuItem divider={true} onClick={handleEdit}>編集</MenuItem>
                    <DeleteUserButton handleMenuClose={handleMenuClose}/>
                </Menu>
            </TableCell>
            <TableCell sx={{...((props.member.user_id == loginUser.user_id) && {display: 'none'})}}></TableCell>
            <TableCell sx={{...(!props.edit && {display: 'none'})}}></TableCell>
        </>
    )
}