import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { useSettings } from 'hooks/use-settings'

export const HowItWorks = () => {
  const { settings } = useSettings()
  return (
    <Box
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        px: { xs: 2, sm: 6, md: 12, lg: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
        width: '100%'
      }}
    >
      <Typography
        component='h2'
        variant='h4'
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: 'center'
        }}
      >
        How It Works?
      </Typography>

      <Grid container width={'100%'} alignItems='center' spacing={2}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant='h6'>Step 1 - Asset Selection</Typography>
              <Typography variant='subtitle1' gutterBottom>
                Pick asset by volatility, strength and curren market state
              </Typography>
              <img
                src={`/static/screenshots/screener - portrait-${settings.theme}.png`}
                alt='Step 1 pick an asset'
                style={{ width: '100%' }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant='h6'>Step 2 - Analyze Trend</Typography>
              <Typography variant='subtitle1' gutterBottom>
                Determine trade direction using multiple time frame analysis
              </Typography>
              <img
                src={`/static/screenshots/analyze trend-${settings.theme}.png`}
                alt='Step 2 analzye trend'
                style={{ width: '100%' }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant='h6'>Step 3 - Find an Entry</Typography>
              <Typography variant='subtitle1' gutterBottom>
                Find a high probability entry point using filters and structure
              </Typography>
              <img
                src={`/static/screenshots/pick an entry point-${settings.theme}.png`}
                alt='Step 3 pick an entry point'
                style={{ width: '100%' }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant='h6'>Step 4 - Manage Risk</Typography>
              <Typography variant='subtitle1' gutterBottom>
                Pick a stop loss, target profit and monitor continously
              </Typography>
              <img
                src={`/static/screenshots/risk management-${settings.theme}.png`}
                alt='Step 4 manage risk'
                style={{ width: '100%' }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
