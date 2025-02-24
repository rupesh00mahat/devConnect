import { Button } from '@mui/material'
import React from 'react'

function ButtonTwo({text, extraCSS, icon = null, onClick}) {
  return (
    <Button onClick={onClick} sx={{border: '1px solid #aeaeae', borderRadius: '10px', width: '100%', p:'12px 25px', color: '#fff', ...extraCSS, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
        {icon && icon}
        {text}
    </Button>
  )
}

export default ButtonTwo