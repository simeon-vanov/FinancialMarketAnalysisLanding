import { Container, Grid, Typography } from '@mui/material'
import { StartTrialButton } from './start-trial-button'
import { useSettings } from 'hooks/use-settings'

export const WhatIs = () => {
  const { settings } = useSettings()

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 }
      }}
    >
      <Typography
        component='h2'
        variant='h4'
        sx={{
          color: 'text.primary',
          textAlign: 'center'
        }}
      >
        What is Decode The Trade?
      </Typography>

      <Grid container alignItems='center' spacing={12}>
        <Grid item xs={12} sm={6}>
          <Typography variant='body1' gutterBottom>
            Decode The Trade is a powerful trading platform designed to help you navigate the complexities of the market
            with confidence. Our suite of advanced tools, including multiple time frame analysis, resistance and support
            levels, and historical queries, provides you with the insights needed to make informed decisions. With
            Decode The Trade, you can effortlessly identify high-probability setups, manage risk effectively with
            confluence analysis, and gain a competitive edge with historical market insights. Our goal is to empower you
            to trade with precision, understanding the nuances of market movements so you can make decisions based on
            data-driven insights rather than guesswork.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            style={{ width: '100%', borderRadius: 8 }}
            src={`/static/screenshots/collage-of-features-${settings.theme}.png`}
            alt='Analyze Your Way'
          />

          <StartTrialButton fullWidth />
        </Grid>
      </Grid>
    </Container>
  )
}
