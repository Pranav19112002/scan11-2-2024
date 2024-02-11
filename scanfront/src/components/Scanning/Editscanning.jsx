// Editscanning.jsx

import { Box, Button, Grid, Input, Paper, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './Editscanning.css';
import baseUrl from '../../Api';
import axios from 'axios';
import Adsidebar from '../Navbar/Adsidebar';
import Adnavbar from '../Navbar/Adnavbar';
import Loader from '../Loader';
import logcoverImage from '../Images/logcover4.png';



function Editscanning ({scanId}){
  const [loader, setLoader] = useState(false);
  const [scanDetails, setScanDetails] = useState({
    sid: '',
    sname: '',
    stype: '',
    sdescription: '',
    samount: '',
    scanImageURL: '',
    scanviewUrl: '',
    scanImageFile: null,
    scanviewFile: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl + `/scans/getscanbyid/${scanId}`);
        setScanDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [scanId]);

  const handleUpdateScan = async () => {
    try {
      setLoader(true);

      const formData = new FormData();
      formData.append('sid', scanDetails.sid);
      formData.append('sname', scanDetails.sname);
      formData.append('stype', scanDetails.stype);
      formData.append('sdescription', scanDetails.sdescription);
      formData.append('samount', scanDetails.samount);

      if (scanDetails.scanImageFile) {
        formData.append('scanImage', scanDetails.scanImageFile);
      }

      if (scanDetails.scanviewFile) {
        formData.append('scanview', scanDetails.scanviewFile);
      }

      const response = await axios.put(baseUrl + `/scans/updatescan/${scanId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      setLoader(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setLoader(false);
      // Handle error
    }
  };

  const handleFileChange = (file, field) => {
    setScanDetails({
      ...scanDetails,
      [`${field}File`]: file,
    });
  };

  const handleInputChange = (e, key) => {
    setScanDetails({
      ...scanDetails,
      [key]: e.target.value,
    });
  };

  return (
    <div className="form-container">
      {loader && <Loader />}
      <Adnavbar />
      <Box height={20}>
        <Box sx={{ display: 'flex' }}>
          <Adsidebar />
          <Grid container spacing={2} className='grid-container'>
            <Paper elevation={10} className='paperstyle' style={{ backgroundImage: `url(${logcoverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h1 className="form-heading">EDIT SCANNING</h1>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className="form-field"
                      id="outlined-basic"
                      placeholder="Id"
                      name="sid"
                      value={scanDetails.sid}
                      onChange={(e) => handleInputChange(e, 'sid')}
                      variant="outlined"
                      sx={{
                        '& input::placeholder': {
                          fontFamily: 'cursive',
                        },
                      }}
                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className="form-field"
                      id="outlined-basic"
                      placeholder="Name"
                      name="sname"
                      value={scanDetails.sname}
                      onChange={(e) => handleInputChange(e, 'sname')}
                      variant="outlined"
                      sx={{
                        '& input::placeholder': {
                          fontFamily: 'cursive',
                        },
                      }}
                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className="form-field"
                      id="outlined-basic"
                      placeholder="Scantype"
                      name="stype"
                      value={scanDetails.stype}
                      onChange={(e) => handleInputChange(e, 'stype')}
                      variant="outlined"
                      sx={{
                        '& input::placeholder': {
                          fontFamily: 'cursive',
                        },
                      }}
                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className="form-field"
                      type='text'
                      id='outlined-basic'
                      placeholder='Amount'
                      name='samount'
                      value={scanDetails.samount}
                      onChange={(e) => handleInputChange(e, 'samount')}
                      variant='outlined'
                      sx={{
                        '& input::placeholder': {
                          fontFamily: 'cursive',
                        },
                      }}
                      
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <textarea
                      className="form-field"
                      id="outlined-basic"
                      placeholder="Description"
                      name="sdescription"
                      value={scanDetails.sdescription}
                      onChange={(e) => handleInputChange(e, 'sdescription')}
                      variant="outlined"
                      sx={{
                        '& input::placeholder': {
                          fontFamily: 'cursive',
                        },
                      }}
                      
                    />

                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <div className="smaller-input">
                      <label className='label-class'>Scan Image:</label>
                      <Input
                        type='file'
                        onChange={(e) => handleFileChange(e.target.files[0], 'scanImage')}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="smaller-input">
                      <label className='label-class'>scanview :</label>
                      <Input
                        type='file'
                        onChange={(e) => handleFileChange(e.target.files[0], 'scanview')}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button variant="contained" className='form-button1 form-button1-left' onClick={handleUpdateScan} sx={{ backgroundColor: 'rebeccapurple', color: 'white', fontFamily:'cursive' }}>
                      SAVE
                    </Button>
                  </Grid>
                </Grid>

              </Box>
            </Paper>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default Editscanning;
