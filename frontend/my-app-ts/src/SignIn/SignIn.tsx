import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserDialog from './UserDialog'

import Copyright from './Copyright'
import Logo from './Logo'
import { User, UserDemo } from './User';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserProvider';

const theme = createTheme();

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
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Logo/>
          <Box sx={{ mt: 8 }}>
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
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}