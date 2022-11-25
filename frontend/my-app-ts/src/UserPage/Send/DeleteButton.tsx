import * as React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TableCell from '@mui/material/TableCell';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Con, toTimeCons } from '../Con';
import { UserContext } from '../../UserProvider';
import { baseURL } from '../../App';

type DeleteButtonProps = {
    con_id :string
    setSentCons :React.Dispatch<React.SetStateAction<Con[]>>
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
            </IconButton>
        ) : null}
        </DialogTitle>
    );
}
  

export default function DeleteButton (props :DeleteButtonProps) {
    const {loginUser, setLoginUser} = React.useContext(UserContext);
    const handleDelete = (e :any) => {
        const conId = e.currentTarget.dataset['id'];
        axios.delete(baseURL + '/send?user_id=' + loginUser.user_id, {data :{con_id: conId}})
        .then((response :any) => {
            const sent_cons: Con[] = toTimeCons(response.data.sent_cons);
            if (sent_cons !== undefined) {
                props.setSentCons(sent_cons);
            }
        })
        .catch((err) => {throw Error(`Failed to delete con: ${err}`)});
        handleClose();
    }



    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
        <TableCell><Button onClick={handleClickOpen}>削除</Button></TableCell>
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                本当に削除しますか？
                </BootstrapDialogTitle>
                <DialogContent dividers>
                <Typography gutterBottom>
                    この動作は取り消すことができません。本当に削除しますか？
                </Typography>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleDelete} data-id={props.con_id}>
                    削除
                </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
        </>
    )
}