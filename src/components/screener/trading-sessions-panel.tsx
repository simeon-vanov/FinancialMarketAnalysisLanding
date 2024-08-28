import type { FC } from 'react'
import { Box, Grid } from '@mui/material'
import TradingSessionCard from './trading-session-card'

export const TradingSessions: FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default'
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          p: 3,
          textAlign: 'center'
        }}
      >
        <Grid item xs={12} md={6} lg={3}>
          <TradingSessionCard sessionName='Tokyo' sessionStartHour={23} sessionEndHour={7} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TradingSessionCard sessionName='Sydney' sessionStartHour={22} sessionEndHour={6} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TradingSessionCard sessionName='London' sessionStartHour={7} sessionEndHour={15} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TradingSessionCard sessionName='New York' sessionStartHour={12} sessionEndHour={20} />
        </Grid>
      </Grid>
    </Box>
  )
}
