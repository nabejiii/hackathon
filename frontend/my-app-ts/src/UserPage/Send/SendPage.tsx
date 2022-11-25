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
import SentConsTable from './SentConsTable';
import Copyright from '../../SignIn/Copyright'
import {Con, editCon} from '../Con'
import { FetchSentCons } from './FetchSentCons';
import { UserContext } from '../../UserProvider';
import UserPageDrawer from '../Drawer'
import UserPageAppBar from '../AppBar'
import { SendConForm } from './SendConForm';
import { User, UserDemo } from '../../SignIn/User';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { theme } from '../../SignIn/Login';
import { baseURL } from '../../App';


function SendPageContent() {
  const [open, setOpen] = React.useState(false);
  const [sentCons, setSentCons] = React.useState<Con[]>([])
  const {loginUser, setLoginUser} = React.useContext(UserContext);
  const navigate = useNavigate()
  const [others, setOthers] = React.useState<User[]>([])
  const FetchOthers = async () => {
    await axios
    .get(baseURL + "/login")
    .then((response :any) => {setOthers(response.data.filter((user :User)=>(user.user_id != loginUser.user_id)))})
    .catch((err :Error) => {throw Error(`Failed to fetch others: ${err}`)})
  };
  React.useEffect(() => {
    if (loginUser == UserDemo) {
      navigate('/login');
    }
    FetchSentCons(loginUser,setSentCons)
    FetchOthers()
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
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <SendConForm setSentCons={setSentCons} others={others}/>
              <SentConsTable others={others} sentCons={sentCons} setSentCons={setSentCons}/>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function SendPage() {
  return <SendPageContent />;
}