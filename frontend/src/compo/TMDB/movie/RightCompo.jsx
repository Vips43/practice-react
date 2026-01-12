import React from 'react'
import OthInfo from './OthInfo'
import Companies from '../oth/Companies'
import { Box } from '@mui/material'
import Videos from '../oth/show/Videos'

function RightCompo({movie, type}) {
  return (
    <Box>
    <OthInfo movie={movie} type={type} />
    <Companies movie={movie} />
    
    </Box>
  )
}

export default RightCompo