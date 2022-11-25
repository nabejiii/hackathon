import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Points from './Points';
import RecConsTable from './RecConsTable';
import Copyright from '../../SignIn/Copyright'
import {Con} from '../Con'
import { fetchRecCons } from './fetchRecCons';
import { UserContext } from '../../UserProvider';
import UserPageDrawer from '../Drawer'
import UserPageAppBar from '../AppBar'
import { UserDemo } from '../../SignIn/User';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../SignIn/Login';

function DashboardContent() {
  const [totalPoint, setTotalPoint] = React.useState<number>(0);
  const [weekPoint, setWeekPoint] = React.useState<number>(0);
  const [RecCons, setRecCons] = React.useState<Con[]>([])
  const {loginUser} = React.useContext(UserContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (loginUser == UserDemo) {
      navigate('/login');
    }
    fetchRecCons(loginUser,setWeekPoint,setTotalPoint,setRecCons)
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
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart totalPoint={totalPoint} RecCons={RecCons}/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Points totalPoint={totalPoint} weekPoint={weekPoint}/>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <RecConsTable RecCons={RecCons} />
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

export default function Home() {
  return <DashboardContent />;
}