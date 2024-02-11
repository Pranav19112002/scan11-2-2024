// Addscanning.jsx

import baseUrl from '../../Api';
import {Box, Button, Grid, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Addscanning.css';
import axios from 'axios';
import Adsidebar from '../Navbar/Adsidebar';
import Adnavbar from '../Navbar/Adnavbar';
import Loader from '../Loader';
import logcoverImage from '../Images/logcover4.png';


function Addscanning() {
  const [loader, setLoader] = useState(false);
  const [sid, setSid] = useState('');
  const [sname, setSname] = useState('');
  const [sdescription, setSdescription] = useState('');
  const [stype, setStype] = useState('');
  const [stypes, setStypes] = useState([]);
  const [samount, setSamount] = useState(''); 
  const [display, setDisplay] = useState(true);
  
  // States for image files
  const [scanImageFile, setScanImageFile] = useState(null);
  const [scanviewFile, setScanviewFile] = useState(null);

  useEffect(() => {
    // Fetch genres from your API endpoint
    const fetchScans = async () => {
      try {
        const response = await axios.get(baseUrl +'/stypes');
        setStypes(response.data); // Assuming the response is an array of genres
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    fetchScans();
  }, []); // Run this effect once when the component mounts

  async function addScanning() {
    const newScan = {
      sid,
      sname,
      stype,
      sdescription,
      samount,
      display: true, 
    };
    

    // Append image files to the form data
    const formData = new FormData();
    formData.append('sid', sid);
    formData.append('sname', sname);
    formData.append('stype', stype);
    formData.append('sdescription', sdescription);
    formData.append('samount', samount);
    formData.append('display', display);
    

    if (scanImageFile) {
      formData.append('scanImageURL', scanImageFile);
    }
    if (scanviewFile) {
      formData.append('scanviewUrl', scanviewFile);
    }

    try {
      const response = await axios.post(baseUrl +'/scans/addscan', formData);
      console.log(response.data);
      alert('Scan added succesfully');
      // Handle success if needed
    } catch (error) {
      console.error(error);
      alert('Error occured');
      // Handle error if needed
    }
  }




  return (
    <div className="form-container1">
      {loader && <Loader/>}
      <Adnavbar />
      <Box height={20}>
        <Box sx={{ display: 'flex' }}>
          <Adsidebar />
          <Grid className='grid-container'>
            <Paper elevation={10} className='paperstyle' style={{ backgroundImage: `url(${logcoverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h1 className="form-heading1">ADD A SCANNING</h1>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                  className="form-field1"
                  id="outlined-basic"
                  placeholder="Id"
                  name="sid"
                  value={sid}
            onChange={(e) => setSid(e.target.value)}
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
                  className="form-field1"
                  id="outlined-basic"
                  placeholder="Name"
                  name="sname"
                  value={sname}
                  onChange={(e) => setSname(e.target.value)}
                  variant="outlined"
                  sx={{
                    '& input::placeholder': {
                      fontFamily: 'cursive',
                    },
                  }}
                 
                /></Grid> 
            <Grid item xs={12} sm={6}>
          <label  className='label-class'>Scan Type:</label>
          <select
            className="input-field"
            value={stype}
            onChange={(e) => setStype(e.target.value)}
           
          >
            <option value="">Select Type</option>
            {stypes.filter(t => t.display !== false).map((t) => (

              <option key={t._id} value={t.stype}>
                {t.stype}
              </option>
            ))}
          </select>
          </Grid>
        <Grid item xs={12} sm={6}>
                <TextField
                  className="form-field1"
                  type="text"
                  id="outlined-basic"
                  placeholder="Amount"
                  name="samount"
                  value={samount}
                  onChange={(e) => setSamount(e.target.value)}
                  variant="outlined"
                  sx={{
                    '& input::placeholder': {
                      fontFamily: 'cursive',
                    },
                  }}
                /></Grid>
                <Grid item xs={12}>
                <textarea
                  className="form-field1"
                  id="outlined-basic"
                  placeholder="Description"
                  name="sdescription"
                  value={sdescription}
            onChange={(e) => setSdescription(e.target.value)}
                  variant="outlined"
                /></Grid>
                <br />
               <br/><br/>
                <div>
          &nbsp;&nbsp;<label  className='label-class'>Scan Image:</label>
          <input
            type="file"
            className="input-field"
            onChange={(e) => setScanImageFile(e.target.files[0])}
          />
        </div>
        <div>
          &nbsp;&nbsp;<label className='label-class'>Freeview 1:</label>
          <input
            type="file"
            className="input-field"
            onChange={(e) => setScanviewFile(e.target.files[0])}
          />
        </div>
                &nbsp;&nbsp;&nbsp;
                <Button
  variant="contained"
  onClick={addScanning}
  sx={{ backgroundColor: 'rebeccapurple', color: 'white', fontFamily:'cursive' }}
>
  DONE
</Button>

                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default Addscanning;
