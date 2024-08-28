import { useRef, useState } from 'react'
import { Avatar, Box, ButtonBase } from '@mui/material'
import { UserCircle as UserCircleIcon } from 'icons/user-circle'
import { AccountPopover } from './account-popover'
import { useAuth0 } from '@auth0/auth0-react'

const AccountButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const [openPopover, setOpenPopover] = useState<boolean>(false)
  const { user } = useAuth0()

  const handleOpenPopover = (): void => {
    setOpenPopover(true)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(false)
  }

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40
          }}
          src={user!.picture}
        >
          <UserCircleIcon fontSize='small' />
        </Avatar>
      </Box>
      <AccountPopover anchorEl={anchorRef.current} onClose={handleClosePopover} open={openPopover} />
    </>
  )
}

export default AccountButton
