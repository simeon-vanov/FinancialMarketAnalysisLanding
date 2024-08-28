import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import { useAuth0 } from '@auth0/auth0-react'

export default function Pricing() {
  const { user, loginWithRedirect } = useAuth0()

  const tiers = [
    {
      title: 'Basic',
      price: '0',
      description: [
        'Strength Meter',
        'Volatility Meter',
        'Volume Meter',
        'Screener',
        'Learning Hub',
        'Community (Coming Soon)'
      ],
      buttonText: 'Register for free',
      buttonVariant: 'outlined',
      check: () => user == null,
      onClick: () =>
        loginWithRedirect({
          authorizationParams: {
            screen_hint: 'signup'
          }
        })
    },
    {
      title: 'Premium',
      subheader: 'Recommended',
      price: '12.99',
      description: [
        'Everything in Basic',
        'Advanced charting tools',
        'Over 150 Signals from Indicators',
        'Query Historical Market States',
        'Insights on Momentum',
        'Insights on Trend',
        'Insights on Reversals',
        'Insights on Price Moves',
        'Insights on Price Levels',
        'Insights on Candle Patterns',
        'Insights on Volume',
        'Real-time Market Data',
        'Alerts on Market Conditions (Coming Soon)',
        'Risk Management (Coming Soon)',
        'Paper Trading (Coming Soon)',
        'Trading Journal (Coming Soon)',
        'Strategy Builder (Coming Soon)'
      ],
      buttonText: user != null ? 'Start trial' : 'Try for free',
      buttonVariant: 'contained',
      check: () => true,
      onClick: () => {
        if (user != null) {
          window.open(`${process.env.NEXT_PUBLIC_STRIPE_PAYMENT_MONTHLY}?prefilled_email=${user.email}`, '_blank')
        } else {
          loginWithRedirect({
            authorizationParams: {
              screen_hint: 'signup'
            }
          })
        }
      }
    },
    {
      title: 'Ultimate (Coming Soon)',
      price: '25',
      description: [
        'Everything in Essential',
        'Portfolio Management',
        'Portfolio Backtesting',
        'Ready-made Strategies',
        'AI-powered Assistent',
        'Trading Automation'
      ],
      buttonText: 'Start Pro',
      buttonVariant: 'outlined',
      check: () => true
    }
  ]

  return (
    <Container
      id='pricing'
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
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' }
        }}
      >
        <Typography component='h2' variant='h4' sx={{ color: 'text.primary' }}>
          Pricing
        </Typography>
        <Typography variant='body1' sx={{ color: 'text.secondary' }}>
          We are so confident you are going to love our platform that we offer 14 days free trial for our Premium plan.
          So you can start risk free and pay only if you are satisfied.
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ alignItems: 'center', justifyContent: 'center' }}>
        {tiers.map((tier) => (
          <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
            <Card
              sx={[
                {
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4
                },
                tier.title === 'Essential' &&
                  ((theme) => ({
                    border: 'none',
                    background: 'radial-gradient(circle at 50% 0%, hsl(210, 98%, 35%), hsl(210, 100%, 16%))',
                    boxShadow: `0 8px 12px hsla(210, 98%, 42%, 0.2)`,
                    ...theme.applyStyles('dark', {
                      boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`
                    })
                  })),
                tier.title === 'Premium (Coming Soon)' && { opacity: 0.5 } // Add opacity to indicate it is disabled
              ]}
            >
              <CardContent>
                <Box
                  sx={[
                    {
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2
                    },
                    tier.title === 'Essential' ? { color: 'grey.100' } : { color: '' }
                  ]}
                >
                  <Typography component='h3' variant='h6'>
                    {tier.title}
                  </Typography>
                  {tier.title === 'Essential' && (
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label={tier.subheader}
                      size='small'
                      sx={{
                        borderColor: 'hsla(220, 60%, 99%, 0.3)',
                        backgroundColor: 'hsla(220, 60%, 99%, 0.1)',
                        '& .MuiChip-label': {
                          color: 'primary.main'
                        },
                        '& .MuiChip-icon': {
                          color: 'primary.main'
                        }
                      }}
                    />
                  )}
                </Box>
                <Box
                  sx={[
                    {
                      display: 'flex',
                      alignItems: 'baseline'
                    },
                    tier.title === 'Essential' ? { color: 'grey.50' } : { color: null }
                  ]}
                >
                  <Typography component='h3' variant='h2'>
                    €{tier.price}
                  </Typography>
                  <Typography component='h3' variant='h6'>
                    &nbsp; per month
                  </Typography>
                </Box>
                <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                {tier.description.map((line) => (
                  <Box key={line} sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <CheckCircleRoundedIcon
                      sx={[
                        {
                          width: 20
                        },
                        tier.title === 'Essential' ? { color: 'primary.light' } : { color: 'primary.main' }
                      ]}
                    />
                    <Typography
                      variant='subtitle2'
                      component={'span'}
                      sx={[tier.title === 'Essential' ? { color: 'grey.50' } : { color: null }]}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                {tier.check() && (
                  <Button
                    fullWidth
                    variant={tier.buttonVariant as 'outlined' | 'contained'}
                    onClick={tier.onClick}
                    disabled={tier.title === 'Premium (Coming Soon)'}
                  >
                    {tier.buttonText}
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
