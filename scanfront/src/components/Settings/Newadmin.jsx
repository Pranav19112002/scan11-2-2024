import { Button, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Newadmin () {
    const navigate = useNavigate();
  return (
    <div>
        <Typography variant="h3" sx={{ color: 'rebeccapurple',fontFamily: 'cursive' }}>Register </Typography><br/><br/>
        <Typography variant='h5' sx={{ color: 'rebeccapurple',fontFamily: 'cursive' }}>Add new Admin</Typography><br/><br/>
        <Button onClick={()=>{navigate('/adreg')}} sx={{ backgroundColor: 'yellow', color: 'white', fontFamily:'cursive' }}>AddAdmin</Button>


    </div>
  )
}

export default Newadmin