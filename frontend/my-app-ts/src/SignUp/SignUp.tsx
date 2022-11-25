import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Copyright from '../SignIn/Copyright';
import Link from '@mui/material/Link';
import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn, { theme } from '../SignIn/Login'
import axios from 'axios';
import { baseURL } from '../App';



export default function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const HandleSubmitUser = async () => {
    if (firstName == "") {
        alert("名前を入力してください");
        return;
    } else if (lastName == "") {
        alert("苗字を入力してください");
        return;
    } else if (firstName.length > 25 || lastName.length > 25) {
        alert("25文字以内で入力してください")
    }
    await axios.post(baseURL + '/signup', {first_name: firstName, last_name: lastName})
    .then(() => {
        navigate('/login');
    })
    .catch((err) => {throw Error(`Failed to sign up: ${err}`)});
  };

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 10 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  required
                  fullWidth
                  error={lastName.length > 25}
                  helperText={lastName.length > 25 && ("25字以内で入力してください")}
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  id="lastName"
                  label="氏"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  error={firstName.length > 25}
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  id="firstName"
                  label="名"
                  name="firstName"
                  helperText={firstName.length > 25 && ("25字以内で入力してください")}
                />
              </Grid>
            </Grid>
            <Button
              onClick={HandleSubmitUser}
              fullWidth
              variant="contained"
              sx={{ mt: 15, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={'/login'} variant="body2">
                  既にアカウントをお持ちですか？ ログイン
                </Link>
                <Routes><Route path="login" element={<SignIn />} /></Routes>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}