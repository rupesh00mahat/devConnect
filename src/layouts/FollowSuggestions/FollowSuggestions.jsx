import React from 'react'
import FollowUserCard from '../../components/layout/FollowUserCard'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

function FollowSuggestions() {
  const exploreUsers = useSelector((state)=> state.exploreUsers);
  return (
    <Box sx={{p: 2, maxWidth: '100%', borderRadius: '10px'}}>
      <Typography variant='h4' fontSize={'18px'} sx={{my: 2}} fontWeight={700}>Suggested for you</Typography>
        {exploreUsers && exploreUsers.map(({email, uid, name})=>{
          return <FollowUserCard
          key={uid}
          email={email}
          userName={name}
          uid={uid}
          />
        })}
    </Box>

  )
}

export default FollowSuggestions