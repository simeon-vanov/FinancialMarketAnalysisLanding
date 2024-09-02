import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ToggleColorMode from './toggle-color-mode'
import { useRouter } from 'next/router'
import { Logo as Sitemark } from './logo'
import LearningHubMenu from './learning-hub-menu'
import { Link, scroller } from 'react-scroll'
import { useEffect } from 'react'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px'
}))

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const router = useRouter()

  useEffect(() => {
    if (router.asPath == '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
      })

      return
    }

    const hash = router.asPath
    if (hash) {
      scroller.scrollTo(hash.slice(2), {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      })
    }
  }, [router.asPath])

  const handleNavigate = (path: string) => {
    router.push(`/#${path}`).catch(console.error)
  }

  return (
    <AppBar position='fixed' sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 3 }}>
      <Container maxWidth='lg'>
        <StyledToolbar variant='dense' disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Sitemark onClick={() => router.push('/')} sx={{ mr: 1 }} height={21} variant='logo-4' />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant='text' color='info' size='small' onClick={() => handleNavigate('what-is')}>
                About The Platform
              </Button>
              <Button variant='text' color='info' size='small' onClick={() => handleNavigate('our-promise')}>
                Our Promises
              </Button>
              <Button variant='text' color='info' size='small' onClick={() => handleNavigate('how-it-works')}>
                How It Works
              </Button>
              <Button variant='text' color='info' size='small' onClick={() => handleNavigate('what-we-offer')}>
                How You Benefit
              </Button>
              <Button variant='text' color='info' size='small' onClick={() => handleNavigate('pricing')}>
                Pricing
              </Button>
              <Button variant='text' color='info' size='small' onClick={() => handleNavigate('faq')}>
                FAQ
              </Button>
              <LearningHubMenu />
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center'
            }}
          >
            <ToggleColorMode />
          </Box>
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <ToggleColorMode smallScreen={true} />
            <IconButton aria-label='Menu button' onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor='top' open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Link to='what-is' smooth={true}>
                    About The Platform
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to='our-promise' smooth={true}>
                    Our Promises
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to='how-it-works' smooth={true}>
                    How It Works
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to='what-we-offer' smooth={true}>
                    What We Offer
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to='pricing' smooth={true}>
                    Pricing
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to='faq' smooth={true}>
                    FAQ
                  </Link>
                </MenuItem>
                <LearningHubMenu />
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  )
}
