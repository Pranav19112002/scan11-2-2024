import { Avatar, Button, Grid, Paper, TextField, Typography, Link } from '@mui/material';
import React, { useState } from 'react';
import MasksIcon from '@mui/icons-material/Masks';
import axios from 'axios';
import Loader from '../components/Loader';
import Success from '../components/Success';
import Error from '../components/Error';

function Adregister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);


  async function register() {
    if (password === cpassword) {
      const user = {
        email,
        password,
        cpassword,
      };
      try {
        setLoader(true);
        await axios.post('http://localhost:3500/admin/register', user)
        setLoader(false);
        setSuccess(true);

        setEmail('');
        setPassword('');
        setCpassword('');
      } catch (error) {
        setLoader(false);
        setError(true);
        console.log(error);
      }
    } else {
      alert('Passwords do not Match');
    }
  }



  const btstyle1 = { margin: '8px 0', backgroundColor: '#663399', color: 'white' };
  const paperStyle = { padding: 20, height: '70vh', width: 400, margin: '20px auto' };
  const avatar1Style = { backgroundColor: '#663399' };
  const linkStyle = { color: '#663399', textDecoration: 'underline', marginRight: '4px' };
  const headingStyle = { color: '#663399' };
  
  return (
    <div>
      {loader && <Loader />}
      {error && <Error/>}
      {success && <Success/>}
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatar1Style}><MasksIcon/></Avatar>
            <h2 style={headingStyle}>Sign Up</h2>
          </Grid>
          <TextField id="filled-basic" label="Email" variant="filled" name='email' value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
          <TextField id="filled-basic" label="Password" variant="filled" name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
          <TextField id="filled-basic" label="Confirm password" variant="filled" name='cpassword' type='password' value={cpassword} onChange={(e) => setCpassword(e.target.value)} fullWidth /><br/><br/>
          <Button type='Submit' fullWidth variant='contained' style={btstyle1} onClick={register}>
            Signup
          </Button>

          {error && (
            <Typography align='left' style={{ color: 'red' }}>
              Registration failed. Please try again.
            </Typography>
          )}

          <Typography align='left'>
            <Link href="#" style={linkStyle}>
              {'Forgot Password ?'}
            </Link>
          </Typography>
          <p align='left'>Do you have an account ?</p>
          <Typography align='left'>
            <Link href="/login" style={linkStyle}>
              {'Sign In'}
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
}

export default Adregister;
