import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { styled } from '@mui/material/styles'
import { useTheme } from '@emotion/react'
import { useState } from 'react'
import { visuallyHidden } from '@mui/utils'
import { CircularProgress, InputLabel, TextField } from '@mui/material'
import toast from 'react-hot-toast'
import { useSettings } from 'hooks/use-settings'

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `url(${'/static/screenshots/hero-light.png'})`,
  backgroundSize: 'cover',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& .play-indicator': {
    opacity: 1
  },
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `url(${'/static/screenshots/hero-dark.png'})`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: theme.palette.grey[700]
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { settings } = useSettings()

  const joinTheWaitlist = async () => {
    if (loading) {
      return
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_WAITLIST_URL as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      })

      console.log(response)

      if (response.status === 200) {
        toast.success('Thank you for joining the waitlist!')
      } else if (response.status === 400) {
        const json = await response.text()
        console.log(json)
        if (json.includes('already')) {
          toast.success('You are already on the waitlist!')
        } else {
          toast.error(json)
        }
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('There was an error with your request. Please try again.')
    }

    setLoading(false)
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

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
          <Typography
            variant='h1'
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)'
            }}
          >
            Decode the Past,&nbsp;
            <Typography component='span' variant='h1'>
              Navigate the&nbsp;
              <Typography
                component='span'
                sx={(theme) => ({
                  fontSize: 'inherit',
                  color: 'primary.main',
                  ...theme.applyStyles('dark', {
                    color: 'primary.light'
                  })
                })}
              >
                Future
              </Typography>
            </Typography>
          </Typography>

          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' }
            }}
          >
            Leave the losing trades in the past. Join the waitlist to get{' '}
            <Typography component='span' sx={{ fontWeight: 'bold' }}>
              14 days free trial
            </Typography>{' '}
            and a code for a{' '}
            <Typography component='span' sx={{ fontWeight: 'bold' }}>
              20% discount for the first 3 months
            </Typography>
            .
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
          >
            <InputLabel htmlFor='email-hero' sx={visuallyHidden}>
              Email
            </InputLabel>
            <TextField
              id='email-hero'
              hiddenLabel
              size='small'
              variant='outlined'
              aria-label='Enter your email address'
              placeholder='Your email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              slotProps={{
                htmlInput: {
                  autoComplete: 'off',
                  'aria-label': 'Enter your email address'
                }
              }}
            />
            <Button
              variant='contained'
              color='primary'
              size='small'
              sx={{
                minWidth: '130px',
                position: 'relative' // Ensure positioning context for the loader
              }}
              onClick={joinTheWaitlist}
            >
              {loading ? (
                <CircularProgress
                  size={24} // Adjust the size to fit inside the button
                  sx={{
                    color: 'text.main',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px', // Center the loader vertically
                    marginLeft: '-12px' // Center the loader horizontally
                  }}
                />
              ) : (
                'Join the Waitlist'
              )}
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
