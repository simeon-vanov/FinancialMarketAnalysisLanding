import type { FC } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { Logo } from './logo'

export const SplashScreen: FC = () => (
  <Box
    sx={{
      alignItems: 'center',
      backgroundColor: 'neutral.900',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'center',
      left: 0,
      p: 3,
      position: 'fixed',
      top: 0,
      width: '100vw',
      zIndex: 2000
    }}
  >
    <CircularProgress
      size={220} // Adjust the size of the CircularProgress as per your requirement
      thickness={4} // Adjust the thickness of the CircularProgress as per your requirement
      sx={{ position: 'absolute' }}
    />
    <Logo height={80} width={160} />
  </Box>
)
