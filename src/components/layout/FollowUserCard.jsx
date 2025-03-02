import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { followUser } from '../../redux/middleware/postInterationThunk'
import { useDispatch, useSelector } from 'react-redux'

function FollowUserCard({img, email, userName,uid}) {
  const dispatch = useDispatch();
  const userId = useSelector((state)=> state.uid);
  const [followed, setIsFollowed] = useState(false);
  return (
    <Box sx={{ borderRadius: '6px', width: '90%', p: 2, border: '1px solid black', mb: 3, background: '#1B2730', color: '#fff'}}>
       {img &&  <img src={img} loading='lazy'/>}
        <Typography variant='h4' fontSize={'16px'} lineHeight={1.6} fontWeight={700}>{userName}</Typography>
        <Typography variant='span' sx={{display: 'block', mb: 2}} color='#617079' fontSize={'14px'} fontWeight={400}>@{email}</Typography>
        {followed ? <Button sx={{color: 'eaeaea'}}>Followed</Button> :<Button onClick={()=>{
          dispatch(followUser(userId, uid))
          setIsFollowed(true);
          }} fullWidth sx={{p:1}} variant='outlined'>Follow</Button>}
    </Box>
  )
}

export default FollowUserCard