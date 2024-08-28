import type { FC, ReactNode } from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import AppAppBar from './app-bar'
// import AppAppBar from './app-bar'

interface DashboardLayoutProps {
  children?: ReactNode
}

const DashboardLayoutRoot = styled('div')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%'
}))

export const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
  const { children } = props

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <AppAppBar />
    </>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node
}
