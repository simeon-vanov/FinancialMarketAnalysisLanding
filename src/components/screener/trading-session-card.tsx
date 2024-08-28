import React from 'react'
import { format } from 'date-fns'
import { Card, Typography, Box } from '@mui/material'
import { SeverityPill } from 'components/common/severity-pill'

const TradingSessionCard: React.FC<{
  sessionName: string
  sessionStartHour: number
  sessionEndHour: number
}> = ({ sessionName, sessionStartHour, sessionEndHour }) => {
  const getCurrentUtcTime = (): Date => {
    const now = new Date()
    const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
    return utcTime
  }

  const isSessionOpen = (sessionStart: number, sessionEnd: number): boolean => {
    const currentTime = getCurrentUtcTime().getHours()
    const currentDay = getCurrentUtcTime().getDay()

    // Check if it's Saturday or Sunday
    if (currentDay === 0 || currentDay === 6) {
      return false
    }

    if (sessionStart <= sessionEnd) {
      // Session starts and ends on the same day
      return currentTime >= sessionStart && currentTime < sessionEnd
    } else {
      // Session starts on one day and ends on the next day
      return currentTime >= sessionStart || currentTime < sessionEnd
    }
  }

  const getSessionStatus = (sessionStartHour: number, sessionEndHour: number): string => {
    const localSessionStartHour = new Date().setUTCHours(sessionStartHour, 0, 0, 0)
    const localSessionEndHour = new Date().setUTCHours(sessionEndHour, 0, 0, 0)

    const formattedSessionStartHour = format(localSessionStartHour, 'HH:mm')
    const formattedSessionEndHour = format(localSessionEndHour, 'HH:mm')

    return `Opened from ${formattedSessionStartHour} to ${formattedSessionEndHour}`
  }

  const sessionIsOpened = isSessionOpen(sessionStartHour, sessionEndHour)
  const sessionStatus = getSessionStatus(sessionStartHour, sessionEndHour)

  return (
    <Card sx={{ p: 3 }}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Typography color='textPrimary' component='span' variant='h5'>
          {sessionName}
        </Typography>
        <Box sx={{ ml: 1 }}>
          <SeverityPill color={sessionIsOpened ? 'primary' : 'error'}>
            {sessionIsOpened ? 'Live' : 'Closed'}
          </SeverityPill>
        </Box>
      </Box>
      <Typography color='textSecondary' sx={{ mt: 1 }} variant='overline'>
        {sessionStatus}
      </Typography>
    </Card>
  )
}

export default TradingSessionCard
