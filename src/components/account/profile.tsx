import { type FC } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Switch,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { UserCircle as UserCircleIcon } from 'icons/user-circle'
import DeleteUserButton from './delete-button'
import { useAuth0 } from '@auth0/auth0-react'
import UpdateNameField from './update-name-field'
import { CheckCircle as VerifiedIcon, Cancel as NotVerifiedIcon } from '@mui/icons-material'
import { useSettings } from 'hooks/use-settings'
import { useSubscription } from 'hooks/use-subscription'
import { toPascalCase } from 'utils/words-utils'

export const AccountProfile: FC = (props) => {
  const { user } = useAuth0()
  const { settings, saveSettings } = useSettings()
  const { subscription } = useSubscription()

  const handleThemeToggle = () => {
    saveSettings({ ...settings, theme: settings.theme == 'dark' ? 'light' : 'dark' })
  }

  const handleManageSubscription = () => {
    window.open(`${process.env.NEXT_PUBLIC_STRIPE_MANAGE_SUBSCRIPTION}?prefilled_email=${user?.email}`, '_blank')
  }

  if (!user) return null

  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant='h6'>Basic details</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <Avatar
                  src={user?.picture}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64
                  }}
                >
                  <UserCircleIcon fontSize='small' />
                </Avatar>
                <Link href='https://gravatar.com/' target='_blank'>
                  Powered by Gravatar
                </Link>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center'
                }}
              >
                <UpdateNameField />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center'
                }}
              >
                <TextField
                  defaultValue={user?.email}
                  disabled
                  label='Email Address'
                  required
                  size='small'
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderStyle: 'dashed'
                    }
                  }}
                />
                {user?.email_verified ? (
                  <Tooltip title='Verified'>
                    <VerifiedIcon fontSize='small' sx={{ color: 'green', ml: 1 }} />
                  </Tooltip>
                ) : (
                  <Tooltip title='Email not verified'>
                    <NotVerifiedIcon fontSize='small' sx={{ color: 'red', ml: 1 }} />
                  </Tooltip>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant='h6'>Settings</Typography>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3
                }}
              >
                <div>
                  <Typography variant='subtitle1'>Theme</Typography>
                  <Typography color='textSecondary' sx={{ mt: 1 }} variant='body2'>
                    Decide on whether you want to use a dark theme.
                  </Typography>
                </div>
                <Switch checked={settings.theme == 'dark'} onChange={handleThemeToggle} /> {/* Add Switch component */}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant='h6'>Subscription</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography sx={{ mb: 3 }} variant='subtitle1'>
                Current Subscription: {toPascalCase(subscription ?? '')}
              </Typography>
              <Button variant='outlined' fullWidth color='warning' onClick={handleManageSubscription}>
                Manage Subscription
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant='h6'>Delete Account</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography sx={{ mb: 3 }} variant='subtitle1'>
                Delete your account and all of your source data. This is irreversible.
              </Typography>
              <DeleteUserButton />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}
