import { Menu, MenuItem, ListItemIcon, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useState, Fragment } from 'react'
import SchoolIcon from '@mui/icons-material/School'
import PublicIcon from '@mui/icons-material/Public'
import InfoIcon from '@mui/icons-material/Info'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import AssessmentIcon from '@mui/icons-material/Assessment'
import SecurityIcon from '@mui/icons-material/Security'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PsychologyIcon from '@mui/icons-material/Psychology'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'

const LearningHubMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()

  const open = Boolean(anchorEl)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigate = (path: string) => {
    router.push(path).catch(console.error)
    handleClose()
  }

  return (
    <Fragment>
      <Button variant='text' color='info' size='small' onClick={handleClick}>
        Learning Hub
      </Button>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleNavigate('/learning/introduction')}>
          <ListItemIcon>
            <InfoIcon fontSize='small' />
          </ListItemIcon>
          <Typography color='inherit'>Introduction</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/learning/market-overview')}>
          <ListItemIcon>
            <PublicIcon fontSize='small' />
          </ListItemIcon>
          <Typography color='inherit'>Market Overview</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/learning/basics')}>
          <ListItemIcon>
            <SchoolIcon fontSize='small' />
          </ListItemIcon>
          <Typography color='inherit'>Basics of Trading</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/learning/technical-analysis')}>
          <ListItemIcon>
            <ShowChartIcon fontSize='small' />
          </ListItemIcon>
          <Typography color='inherit'>Technical Analysis</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/learning/fundamental-analysis')}>
          <ListItemIcon>
            <AssessmentIcon fontSize='small' />
          </ListItemIcon>
          <Typography color='inherit'>Fundamental Analysis</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/learning/risk-management')}>
          <ListItemIcon>
            <SecurityIcon fontSize='small' />
          </ListItemIcon>
          <Typography color='inherit'>Risk Management</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/learning/strategies')}>
          <ListItemIcon>
            <TrendingUpIcon fontSize='small' />
          </ListItemIcon>
          <Typography color='inherit'>Trading Strategies</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/learning/psychology')}>
          <ListItemIcon>
            <PsychologyIcon fontSize='small' />
          </ListItemIcon>
          <Typography color='inherit'>Psychology of Trading</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/learning/how-to-use')}>
          <ListItemIcon>
            <TipsAndUpdatesIcon fontSize='small' />
          </ListItemIcon>
          <Typography color='inherit'>Decode The Trade</Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default LearningHubMenu
