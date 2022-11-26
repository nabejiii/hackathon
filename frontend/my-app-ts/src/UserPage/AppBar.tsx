import * as React from 'react';
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {drawerWidth} from './Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { UserContext } from '../UserProvider';
import pic from "../image/foxpic.png";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { UserDemo } from '../SignIn/User';
import { useNavigate } from 'react-router-dom';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
  
export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function UserPageAppBar() {
    const {loginUser, setLoginUser, drawerOpen, setDrawerOpen} = React.useContext(UserContext);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const navigate = useNavigate()
    const handleLogout = () => {
      setLoginUser(UserDemo);
      navigate('/login');
    }

    return (
        <AppBar position="absolute" open={drawerOpen}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => {setDrawerOpen(!drawerOpen)}}
              sx={{
                marginRight: '36px',
                ...(drawerOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ 
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: 25
              }}
            >
            <img src={pic} alt="foxpic" width={33}></img>
              {"　Con !!"}
            </Typography>
            <Box sx={{ flexGrow: 0,
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: 25}}>
            <Tooltip title="ログイン中のユーザー">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Typography textAlign={"center"} sx={{mb: 1}}>
                {loginUser.last_name + " " + loginUser.first_name}
              </Typography>
              <Divider />
              <MenuItem onClick={handleLogout}>
                  ログアウト
              </MenuItem>
            </Menu>
          </Box>
          </Toolbar>
        </AppBar>
    )
}