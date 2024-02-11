// Addtype.js

import React, { useState } from 'react';
import baseUrl from '../../Api';
import Loader from '../Loader';
import Adnavbar from '../Navbar/Adnavbar';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import Adsidebar from '../Navbar/Adsidebar';
import axios from 'axios';
import './Addtype.css';
import logcoverImage from '../Images/logcover4.png';

function Addtype() {
  const [stype, setStype] = useState('');
  const [loader, setLoader] = useState(false);

  async function addType() {
    try {
      if (!stype.trim()) {
        alert('Please enter a valid type.');
        return;
      }

      const newType = {
        stype: stype.trim(),
        display: true,
      };

      const response = await axios.post(baseUrl + '/stypes/add', newType);
      console.log(response.data);
      alert('scan type added');
    } catch (error) {
      console.error(error);
      alert('Error occured');
    }
  }

  return (
    <div className="form-container1">
      {loader && <Loader />}
      <Adnavbar />
      <Box height={20}>
        <Box sx={{ display: 'flex' }}>
          <Adsidebar />
          <Grid className="grid-container">
            <Paper elevation={10} className="paperstyleee"  style={{ backgroundImage: `url(${logcoverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Typography variant="h4" sx={{ fontFamily: 'cursive', color: 'rebeccapurple' }}>SCANTYPES</Typography>
                <br />
                <div className="input-button-container">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Scan Type"
                    name="stype"
                    value={stype}
                    onChange={(e) => setStype(e.target.value)}
                    sx={{
                      '& input::placeholder': {
                        fontFamily: 'cursive',
                      },
                    }}
                  />
                  <Button className="button" onClick={addType} sx={{ backgroundColor: 'rebeccapurple', color: 'white', fontFamily:'cursive' }}>
                    Add Type
                  </Button>
                </div>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default Addtype;
