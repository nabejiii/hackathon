import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SentConsTable from './SentConsTable';
import Copyright from '../../SignIn/Copyright'
import {Con} from '../Con'
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
  const [sentCons, setSentCons] = React.useState<Con[]>([])
  const {loginUser} = React.useContext(UserContext);
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
        <UserPageAppBar/>
        <UserPageDrawer/>
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