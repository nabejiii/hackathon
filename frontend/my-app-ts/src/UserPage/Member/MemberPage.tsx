import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../../SignIn/Copyright'
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
  const [members, setMembers] = React.useState<Member[]>([])
  const {loginUser} = React.useContext(UserContext);
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
          <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <MembersTable members={members} setMembers={setMembers}/>
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