import { Card } from '@mui/material'
import React from 'react'

function FeedContainer({children, extraCSS}) {
  return (
    <Card
        sx={{
          background: "#1B2730",
          padding: "15px 25px",
          borderRadius: "10px",
          color: "#fff",
          width: '50%',
         ...extraCSS
        }}
      >
       {children}
      </Card>
  )
}

export default FeedContainer