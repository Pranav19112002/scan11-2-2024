import React from 'react'
import Adnavbar from '../Navbar/Adnavbar'
import { Box, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Adsidebar from '../Navbar/Adsidebar'
import './Bookings.css';

function Bookings  () {
  return (
     <div>
    <Adnavbar/>
    <Box height={20}>
      <Box sx={{ display: 'flex' }}>
        <Adsidebar/>
        <Grid className='grid-container'>
          <Paper elevation={10} className='paperstyle'>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" sx={{ fontFamily: 'cursive', color: 'rebeccapurple' }}> Bookings</Typography>
              <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                    <TableCell style={{ color: 'white' }}>BookingID</TableCell>
                    <TableCell style={{ color: 'white' }}>UserID</TableCell>
                    <TableCell style={{ color: 'white' }}>Scan</TableCell>
                    <TableCell style={{ color: 'white' }}>Date</TableCell>
                    <TableCell style={{ color: 'white' }}>Time</TableCell>
                    <TableCell style={{ color: 'white' }}>STATUS</TableCell>
                    </TableRow>
                  </TableHead>
                  </Table>
                  </TableContainer>
                  </Box>
                  </Paper>
                  </Grid>
                  </Box>
                  </Box>
                  </div>
  )
}

export default Bookings