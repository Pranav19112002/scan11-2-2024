import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Edittype.css';
import Adnavbar from '../Navbar/Adnavbar';
import Adsidebar from '../Navbar/Adsidebar';
import logcoverImage from '../Images/logcover4.png';

function Edittype ({stypeId}){
    const [stypeDetails, setStypeDetails] = useState({
        stype: '',
        // Add more fields if needed
      });
    
      useEffect(() => {
        // Fetch genre details by ID when the component mounts
        const fetchStypeDetails = async () => {
          try {
            const response = await axios.post('http://localhost:3500/stypes/getstypebyid', {
                stypeId,
              });
    
            setStypeDetails(response.data);
          } catch (error) {
            console.error(error);
            // Handle error if needed
          }
        };
    
        fetchStypeDetails();
      }, [stypeId]); // Trigger the effect when genreId changes
    
      const handleInputChange = (e) => {
        setStypeDetails({
          ...stypeDetails,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleUpdateStype = async () => {
        try {
            await axios.put('http://localhost:3500/stypes/updatestype', {
                stypeId,
                ...stypeDetails,
              });
    
          alert("updated")
        } catch (error) {
          console.error(error);
          // Handle error if needed
        }
      };
  return (
     <div className="form-container1">
        <Adnavbar/>
      <Box height={20}>
        <Box sx={{ display: 'flex' }}>
            <Adsidebar/>
          <Grid className="grid-container">
            <Paper elevation={10} className="paperstyleee" style={{ backgroundImage: `url(${logcoverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Typography variant="h4" sx={{ fontFamily: 'cursive', color: 'rebeccapurple' }}>EDITTYPES</Typography>
                <br />
                <div className="input-button-container">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Scan Type"
                    name="stype"
                    value={stypeDetails.stype}
                    onChange={handleInputChange}
                    sx={{
                      '& input::placeholder': {
                        fontFamily: 'cursive',
                      },
                    }}
                  />
                  <Button className="button" onClick={handleUpdateStype} sx={{ backgroundColor: 'rebeccapurple', color: 'white', fontFamily:'cursive' }}>
                    EditType
                  </Button>
                </div>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}

export default Edittype