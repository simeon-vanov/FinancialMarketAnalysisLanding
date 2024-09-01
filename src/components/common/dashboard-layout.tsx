import type { FC, ReactNode } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import AppAppBar from './app-bar'
// import AppAppBar from './app-bar'

interface DashboardLayoutProps {
  children?: ReactNode
}

export const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
  const { children } = props

  return (
    <>
      <Box sx={{ flex: '1 1', overflow: 'auto' }}>
        <AppAppBar />
        {children}
      </Box>
    </>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node
}
