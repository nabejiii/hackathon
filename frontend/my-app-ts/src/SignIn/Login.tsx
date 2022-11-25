import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserDialog from './LoginUserDialog'
import Copyright from './Copyright'
import Logo from './Logo'
import { UserDemo } from './User';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserProvider';

export const theme = createTheme({
  palette: {
    mode: 'light',
      primary: { 
        main: '#ff9800',
        light: '#ffc947',
        dark: '#c66900',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#2196f3',
        light: '#6ec6ff',
        dark: '#0069c0'
      },
      
  }
});

export default function SignIn() {
  const {loginUser, setLoginUser} = React.useContext(UserContext);
  
  const navigate = useNavigate();
  const RoadCons = () => {
    if (loginUser == UserDemo) {
      alert('ユーザーを選択してください')
      return;
    } else {
      navigate('/home');
      return;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ mt: 8}}>
            <UserDialog setUser={setLoginUser}/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 3 }}
              onClick={RoadCons}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href={'/signup'} variant="body2">
                  {"アカウントを持っていませんか? サインアップ"}
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}