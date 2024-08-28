import type { FC } from 'react'
import { Box, Container, IconButton, Link, Stack, Typography } from '@mui/material'
import YoutubeIcon from '@mui/icons-material/YouTube'

function Copyright() {
  return (
    <Typography variant='body2' sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      DecodeTheTrade&nbsp;
      {new Date().getFullYear()}
    </Typography>
  )
}

export const Footer: FC = (props) => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      borderTopColor: 'divider',
      borderTopStyle: 'solid',
      borderTopWidth: 1
    }}
    {...props}
  >
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: { xs: 2, sm: 2 },
        textAlign: { sm: 'center', md: 'left' }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <div>
          <Link color='text.secondary' variant='body2' href='/privacy'>
            Privacy Policy
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>&nbsp;•&nbsp;</Typography>
          <Link color='text.secondary' variant='body2' href='/terms-of-use'>
            Terms of Service
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>&nbsp;•&nbsp;</Typography>
          <Link
            color='text.secondary'
            variant='body2'
            href='mailto:support@decodethetrade.com?subject=Support/Feature%20Request&body=Hi%20there,%0D%0A%0D%0A%5BYour%20message%20here%5D'
          >
            Contact Us
          </Link>
          <Copyright />
        </div>
        <Stack direction='row' spacing={1} useFlexGap sx={{ justifyContent: 'left', color: 'text.secondary' }}>
          <IconButton
            color='inherit'
            href='https://www.youtube.com/@DecodeTheTrade-jw7bt'
            aria-label='Youtube'
            sx={{ alignSelf: 'center' }}
          >
            <YoutubeIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  </Box>
)
