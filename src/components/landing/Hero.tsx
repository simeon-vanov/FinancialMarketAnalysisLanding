import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { styled } from '@mui/material/styles'
import { useTheme } from '@emotion/react'
import { useState } from 'react'
import { StartTrialButton } from './start-trial-button'

const StyledBox = styled('div')(({ theme }) => ({
  position: 'relative',
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  outline: '1px solid',
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `url(${'/static/screenshots/hero-light.png'})`,
  outlineColor: 'hsla(220, 25%, 80%, 0.5)',
  backgroundSize: 'cover',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover .play-indicator': {
    opacity: 1
  },
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `url(${'/static/screenshots/hero-dark.png'})`,
    outlineColor: 'hsla(210, 100%, 80%, 0.1)'
  })
}))

const PlayIndicator = styled('div')(({}) => ({
  position: 'absolute',
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  fontSize: 30,
  opacity: 0,
  transition: 'opacity 0.3s'
}))

export default function Hero() {
  const handleDownloadGuide = () => {
    window.open('/static/Decode The Perfect Trade - Book.pdf', '_blank')
  }
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const theme = useTheme()

  return (
    <Box
      id='hero'
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)'
        })
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 }
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: 'clamp(5rem, 13vw, 5rem)'
            }}
          >
            <Typography
              component='span'
              variant='h1'
              sx={{
                fontSize: 'inherit'
              }}
            >
              Decode the Past, Navigate the{' '}
              <Typography
                component='span'
                variant='h1'
                sx={{
                  fontSize: 'inherit',
                  color: 'primary.main',
                  ...theme.applyStyles('dark', {
                    color: 'primary.light'
                  })
                }}
              >
                Future
              </Typography>
            </Typography>
          </Box>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' }
            }}
          >
            Leave losing trades in the past. We provide actionable insights to boost your trading success and turn
            potential into profit.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <StartTrialButton />
            <Button variant='contained' color='inherit' onClick={handleDownloadGuide}>
              Welcome Bonus Book
            </Button>
          </Stack>
        </Stack>
        {isVideoPlaying ? (
          <Box
            sx={{
              width: '100%',
              height: 400,
              [theme.breakpoints.up('sm')]: {
                marginTop: theme.spacing(10),
                height: 700
              }
            }}
          >
            <video width='100%' height='100%' controls autoPlay>
              <source
                src='https://decodethetradestorage.blob.core.windows.net/videos/landing_intro_mp4_V1.mp4'
                type='video/mp4'
              />
              Your browser does not support the video tag.
            </video>
          </Box>
        ) : (
          <StyledBox id='image' onClick={() => setIsVideoPlaying(true)}>
            <PlayIndicator className='play-indicator'>▶️</PlayIndicator>
          </StyledBox>
        )}
      </Container>
    </Box>
  )
}
