import React, { useEffect, useState } from 'react'
import Adnavbar from '../Navbar/Adnavbar'
import { Box, Button, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Adsidebar from '../Navbar/Adsidebar'
import Edittype from './Edittype'
import axios from 'axios'
import Loader from '../Loader'
import './Viewtype.css';
import EditIcon from '@mui/icons-material/Edit';

function Viewtype (){
    const [stypes, setStypes] = useState([]);
    const [loader, setLoader] = useState(true);
    const [visible, setVisible] = useState(false);
    const [selectedStypeId, setSelectedStypeId] = useState('');
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3500/stypes');
        setStypes(response.data);
        setLoader(false);
      } catch (error) {
        console.error(error);
        setLoader(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleEditStype = (stypeId) => {
      setVisible(true);
      setSelectedStypeId(stypeId);
    };
  
    const handleModalCancel = () => {
      setVisible(false);
      setSelectedStypeId('');
    };
  
    const handleActivateStype = async (stypeId) => {
      try {
        setLoader(true);
        await axios.put(`http://localhost:3500/stypes/activate/${stypeId}`, { display: true });
        fetchData();
        setLoader(false);
        alert("activated")
      } catch (error) {
        console.error(error);
        setLoader(false);
        // Show error message
      }
    };
  
    const handleDeactivateStype = async (stypeId) => {
      try {
        setLoader(true);
        await axios.put(`http://localhost:3500/stypes/deactivate/${stypeId}`, { display: false });
        fetchData();
        setLoader(false);
        alert("deactivated")
      } catch (error) {
        console.error(error);
        setLoader(false);
        // Show error message
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
            <Typography variant="h4" sx={{ fontFamily: 'cursive', color: 'rebeccapurple' }}> ScanTypes</Typography>
              <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ color: 'white' }}>ScanType ID</TableCell>
                      <TableCell style={{ color: 'white' }}>ScanType</TableCell>
                      <TableCell style={{ color: 'white' }}>STATUS</TableCell>
                      <TableCell style={{ color: 'white' }}><EditIcon/></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stypes.map((value, index) => (
                      <TableRow key={index}>
                        <TableCell style={{ color: 'white' }}>{value._id}</TableCell>
                        <TableCell style={{ color: 'white' }}>{value.stype}</TableCell>
                        <TableCell style={{ color: 'white' }}>
                          {value.display ? (
                            <button
                              className='deactivate-button'
                              onClick={() => handleDeactivateStype(value._id)}
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              className='activate-button'
                              onClick={() => handleActivateStype(value._id)}
                            >
                              Activate
                            </button>
                          )}
                        </TableCell>
                        <TableCell style={{ color: 'white' }}>
                          <Button onClick={() => handleEditStype(value._id)}>Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
             
              <Modal
                title='Edit ScanType'
                open={visible} 
                onCancel={handleModalCancel}
                footer={null}
              >
                <Edittype stypeId={selectedStypeId} />
              </Modal>
            </Box>
          </Paper>
        </Grid>
      </Box>
    </Box>
  </div>
  )
}

export default Viewtype