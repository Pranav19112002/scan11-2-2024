import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import MasksIcon from '@mui/icons-material/Masks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Success from '../components/Success';
import Error from '../components/Error';

function Adlogin() {
  const [inputs, setInputs] = useState({ "email": '', "password": '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    console.log(inputs);
  };

  const navigate = useNavigate();

  const checkData = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3500/admin/login",
        { email: inputs.email, password: inputs.password, });
        const result = response.data;
      setLoading(false);

      if (response.data.success) {
        setSuccess(true); 
        setError(false); 
        alert('Login successful');
        localStorage.setItem('currentadmin', JSON.stringify(result));

        navigate('/panel');
      } else {
        setError(true); 
        setSuccess(false); 
        alert('Invalid email and Password. Please try again.');
        console.log(response.data);
      }
    } catch (err) {
      setError(true); 
      setSuccess(false);
      alert('Error occurred during login. Please try again.');
      localStorage.removeItem('currentadmin');
    }
  };

 // ...

 const btstyle1 = { margin: '8px 0', backgroundColor: '#663399', color: 'white' ,fontFamily: 'cursive'};
 const paperStyle = { padding: 20, height: '60vh', width: 400, margin: '20px auto' ,};
 const avatar1Style = { backgroundColor: '#663399' };
 const linkStyle = { color: '#663399', textDecoration: 'underline', marginRight: '4px' };
 const headingStyle = { color: '#663399',fontFamily: 'cursive'};
 
 
// ...


  return (
    <div className="login-container">
      {loading && <Loader />}
      {error && <Error/>}
      {success && <Success/>}
      <div>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatar1Style}><MasksIcon /></Avatar>
              <h2 style={headingStyle}>Log in</h2>
            </Grid>

            <TextField id="filled-basic" label="Email" name="email" value={inputs.email} onChange={inputHandler} fullWidth /><br/><br/>
            <TextField id="filled-basic" label="Password" type='password' name='password' value={inputs.password} onChange={inputHandler} fullWidth /><br/><br/>
            <Button type='Submit' fullWidth variant='contained' style={btstyle1} onClick={checkData}>
              Login
            </Button>

            {error && (
              <Typography align='left' style={{ color: 'red' }}>
                Login failed. Invalid email or password.
              </Typography>
            )}

            <Typography align='left'>
              <Link href="#" style={linkStyle}>
                {'Forgot Password ?'}
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}

export default Adlogin;
