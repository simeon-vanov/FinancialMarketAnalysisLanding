import { type FC } from 'react'
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { AppBarProps } from '@mui/material'
import { Menu as MenuIcon } from 'icons/menu'
import NextLink from 'next/link'
import { Logo } from './logo'
import { useAuth0 } from '@auth0/auth0-react'
import AccountButton from './account-button'
import LearningHubMenu from './learning-hub-menu'
import ContentSearchButton from './content-search-button'
import SignInButton from './sign-in-button'
import ToggleColorMode from './toggle-color-mode'
import { useRouter } from 'next/router'
import SignUpButton from './sign-up-button'
import { useSubscription } from 'hooks/use-subscription'
import StarIcon from '@mui/icons-material/Star'
import { SubscriptionDashboardButton } from './subscription-dashboard-button'

interface DashboardNavbarProps extends AppBarProps {
  onOpenSidebar?: () => void
}

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'light'
    ? {
        boxShadow: theme.shadows[3]
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none'
      })
}))

export const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const { onOpenSidebar, ...other } = props
  const { user, isLoading } = useAuth0()
  const router = useRouter()
  const { subscription } = useSubscription()

  return (
    <>
      <DashboardNavbarRoot {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize='small' />
          </IconButton>
          <Box
            sx={{
              alignItems: 'center',
              display: {
                xs: 'none',
                lg: 'flex'
              }
            }}
          >
            <NextLink href='/' passHref>
              <Typography>
                <Logo height={42} width={84} />
              </Typography>
            </NextLink>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              alignItems: 'center',
              display: {
                xs: 'none',
                lg: 'flex'
              }
            }}
          >
            {subscription && (
              <Button variant='text' color='info' onClick={() => router.push('/screener')}>
                Screener
              </Button>
            )}
            {subscription == 'basic' && (
              <Badge
                badgeContent='Premium'
                color='primary'
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                <Tooltip title='This feature is available for users with package Premium'>
                  <span>
                    <Button
                      variant='text'
                      color='info'
                      startIcon={<StarIcon />}
                      disabled={true}
                      onClick={() => router.push('/chart')}
                    >
                      Insights
                    </Button>
                  </span>
                </Tooltip>
              </Badge>
            )}
            {(subscription == 'ultimate' || subscription == 'premium') && (
              <Button variant='text' color='info' startIcon={<StarIcon />} onClick={() => router.push('/chart')}>
                Insights
              </Button>
            )}
            <LearningHubMenu />
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <SubscriptionDashboardButton />
          <ToggleColorMode />

          {user && (
            <>
              <ContentSearchButton />
              <AccountButton />
            </>
          )}
          {!user && !isLoading && (
            <>
              <SignInButton />
              <SignUpButton />
            </>
          )}
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  )
}
