import { useState, type FC } from 'react'
import NextLink from 'next/link'
import toast from 'react-hot-toast'
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
  useTheme
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { UserCircle as UserCircleIcon } from 'icons/user-circle'
import { SettingsDrawer } from './settings-drawer'
import { useAuth0 } from '@auth0/auth0-react'

interface AccountPopoverProps {
  anchorEl: null | Element
  onClose?: () => void
  open?: boolean
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props
  const theme = useTheme()
  const { logout, user } = useAuth0()
  const [settingsOpened, setSettingsOpened] = useState<boolean>(false)

  const handleLogout = async (): Promise<void> => {
    try {
      onClose?.()

      logout({ logoutParams: { returnTo: process.env.NEXT_PUBLIC_AUTH0_CALLBACK } })
    } catch (err) {
      console.error(err)
      toast.error('Unable to logout.')
    }
  }

  const handleClose = (): void => {
    setSettingsOpened(false)
  }

  const fontColor = theme.palette.text.primary

  return (
    <>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        keepMounted
        onClose={onClose}
        open={!!open}
        PaperProps={{ sx: { width: 300 } }}
        transitionDuration={0}
        {...other}
      >
        <Box
          sx={{
            alignItems: 'center',
            p: 2,
            display: 'flex'
          }}
        >
          <Avatar
            src={user!.picture}
            sx={{
              height: 40,
              width: 40
            }}
          >
            <UserCircleIcon fontSize='small' />
          </Avatar>
          <Box
            sx={{
              ml: 1
            }}
          >
            <Typography variant='body1'>{user!.email}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ my: 1 }}>
          <NextLink href='/account' passHref>
            <MenuItem>
              <ListItemIcon>
                <UserCircleIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant='body1' color={fontColor}>
                    Profile
                  </Typography>
                }
              />
            </MenuItem>
          </NextLink>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary={<Typography variant='body1'>Logout</Typography>} />
          </MenuItem>
        </Box>
      </Popover>
      <SettingsDrawer onClose={handleClose} open={settingsOpened} />
    </>
  )
}
