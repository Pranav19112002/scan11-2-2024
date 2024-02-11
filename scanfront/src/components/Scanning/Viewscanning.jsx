// ViewScanning.jsx

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, Grid, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Editscanning from './Editscanning';
import './Viewscanning.css';
import axios from 'axios';
import Adsidebar from '../Navbar/Adsidebar';
import Adnavbar from '../Navbar/Adnavbar';
import Loader from '../Loader';
import EditIcon from '@mui/icons-material/Edit';



function ViewScanning() {
  const [scans, setScans] = useState([]);
  const [loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedScanId, setSelectedScanId] = useState('');



  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3500/scans/getallscans');
      setScans(response.data);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditScan = (scanId) => {
    setVisible(true);
    setSelectedScanId(scanId);
  };

  const handleModalCancel = () => {
    setVisible(false);
    setSelectedScanId('');
  };

  const handleActivateScan = async (scanId) => {
    try {
      setLoader(true);
      await axios.put(`http://localhost:3500/scans/activate/${scanId}`);
      fetchData();
      setLoader(false);
      alert("Scan activated successfully");
    } catch (error) {
      console.error(error);
      setLoader(false);
      alert("Failed to activate Scan");
    }
  };

  const handleDeactivateScan = async (scanId) => {
    try {
      setLoader(true);
      await axios.put(`http://localhost:3500/scans/deactivate/${scanId}`);
      fetchData();
      setLoader(false);
      alert("Scan deactivated successfully");
    } catch (error) {
      console.error(error);
      setLoader(false);
      alert("Failed to deactivate scan");
    }
  };

  return (
    <div>
      {loader && <Loader/>}
      <Adnavbar/>
      <Box height={20}>
        <Box sx={{ display: 'flex' }}>
          <Adsidebar/>
          <Grid className='grid-container'>
            <Paper elevation={10} className='paperstyle'>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Typography variant="h4" sx={{ fontFamily: 'cursive', color: 'rebeccapurple' }}> Scannings</Typography>
                <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ color: 'white' }}>Scanning ID</TableCell>
                        <TableCell style={{ color: 'white' }}>Scanning Name</TableCell>
                        <TableCell style={{ color: 'white' }}>Scanning Type</TableCell>
                        <TableCell style={{ color: 'white' }}>Description</TableCell>
                        <TableCell style={{ color: 'white' }}>Amount</TableCell>
                        <TableCell style={{ color: 'white' }}>STATUS</TableCell>
                        <TableCell style={{ color: 'white' }}><EditIcon/></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {scans.map((value, index) => (
                        <TableRow key={index}>
                          <TableCell style={{ color: 'white' }}>{value.sid}</TableCell>
                          <TableCell style={{ color: 'white' }}>{value.sname}</TableCell>
                          <TableCell style={{ color: 'white' }}>{value.stype}</TableCell>
                          <TableCell style={{ color: 'white' }}>{value.sdescription}</TableCell>
                          <TableCell style={{ color: 'white' }}>{value.samount}</TableCell>
                          <TableCell style={{ color: 'white' }}>
                            {value.display ? (
                              <button
                                className='deactivate-button'
                                onClick={() => handleDeactivateScan(value._id)}
                              >
                                Deactivate
                              </button>
                            ) : (
                              <button
                                className='activate-button'
                                onClick={() => handleActivateScan(value._id)}
                              >
                                Activate
                              </button>
                            )}
                          </TableCell>
                          <TableCell style={{ color: 'white' }}>
                            <Button onClick={() => handleEditScan(value._id)}>Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
               
                <Modal
                  title='Edit Scan'
                  open={visible} 
                  onCancel={handleModalCancel}
                  footer={null}
                >
                  <Editscanning scanId={selectedScanId} />
                </Modal>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default ViewScanning;


// tablecellil edit nte icon kodukan it is kept empty do it also in the scan type view