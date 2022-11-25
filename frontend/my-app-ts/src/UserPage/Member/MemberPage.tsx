import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ListItems } from '../listItems';
import Copyright from '../../SignIn/Copyright'
import {Con} from '../Con'
import { UserContext } from '../../UserProvider';
import UserPageDrawer from '../Drawer'
import UserPageAppBar from '../AppBar'
import { UserDemo } from '../../SignIn/User';
import { useNavigate } from 'react-router-dom';
import MembersTable from './MembersTable';
import { fetchMembers } from './fetchMembers';
import { Member } from './Member';
import { theme } from '../../SignIn/Login';


function MembersContents() {
  const [open, setOpen] = React.useState(false);
  const [members, setMembers] = React.useState<Member[]>([])
  const {loginUser, setLoginUser} = React.useContext(UserContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (loginUser == UserDemo) {
      navigate('/login');
    }
    fetchMembers(setMembers)
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <UserPageAppBar open={open} setOpen={setOpen}/>
        <UserPageDrawer open={open} setOpen={setOpen}/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <MembersTable members={members}/>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Members() {
  return <MembersContents />;
}