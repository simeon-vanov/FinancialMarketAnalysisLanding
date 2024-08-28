import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
import { useSettings } from 'hooks/use-settings'
import { StartTrialButton } from './start-trial-button'

const items = [
  {
    title: 'Trade the Right Pair at the Right Time',
    description:
      'You’re ready to trade but unsure if the market is active enough to offer profitable opportunities? The Volatility Meter along with the Strength Meter shows you which currency pairs are experiencing significant price movements, indicating higher profit potential. This ensures you’re trading only when the market conditions are ripe, increasing your chances of success and avoiding low-volatility markets where profits are harder to come by.',
    image: 'trade-the-right-pair'
  },
  {
    title: 'No time wasted scanning through charts',
    description:
      'You’re looking for trading opportunities but don’t want to waste time scanning through endless charts? The Screener Table allows you to quickly filter and identify currency pairs that meet your specific criteria, such as trend direction, momentum, and support/resistance levels. This feature streamlines your analysis process, helping you focus only on the most promising setups, saving time, and increasing efficiency.',
    image: 'no-time-wasted'
  },
  {
    title: 'Reduce Emotional Trading with Data-Driven Decisions',
    description:
      'You’re tempted to enter a trade based on gut feeling, but you want to ensure it’s a rational decision? By analyzing Price Moves and applying Market State Filters, you can objectively assess whether the trade aligns with historical data and patterns. This reduces emotional decision-making and keeps you focused on high-probability trades.',
    image: 'reduce-emotional-trading'
  },
  {
    title: 'Optimize Your Risk-Reward Ratio Instantly',
    description:
      'You’re about to place a trade and need to determine your stop-loss and take-profit levels? Market State Filters combined with automatic Support and Resistance Zone detection give you pre-calculated zones where the price is likely to react. This allows you to set optimal entry, stop-loss, and take-profit levels, improving your overall risk-reward ratio.',
    image: 'optimize-risk'
  },
  {
    title: 'Minimize Risk with Higher Time Frame Confluence',
    description:
      'You’re considering entering a trade but want to ensure it’s backed by solid market structure? By using Confluence Levels through Multi-frame analysis, you can align key levels from higher time frames with your current setup. This confluence reduces your risk by ensuring that your trades are supported by multiple layers of market data.',
    image: 'confluence-levels'
  },
  {
    title: 'Learn from the Past to Trade the Future',
    description:
      'Whether you’re new to trading or looking to refine your skills, the Learning Hub provides you with the tools and resources to improve your understanding of the markets. But we know practice is what makes you perfect that is why we want you to build confidence researching the market by providing a complete analysis of every single candle in the past. Thus you gain experience more than 10x times faster.',
    image: 'learn-from-the-past'
  },
  {
    title: 'Ride the Trend, Don’t Chase It',
    description:
      'You want to follow the market trend but struggle to confirm its strength? Our advanced indicators provide clear, actionable signals about the trend’s momentum, volatility, and potential reversals. This means you can enter trades at the right time and ride the trend for maximum profit.',
    image: 'ride-the-trend'
  },
  {
    title: 'Stop Missing Key Market Signals',
    description:
      'Imagine you’re about to enter a trade but aren’t sure if it’s the right moment. With Historical Insights, you can instantly see how similar market setups have played out in the past and what are your probabilities of profit. This feature helps you avoid costly mistakes and seize the right opportunities, turning market patterns into profits.',
    image: 'missing-key-signals'
  },
  {
    title: 'See the Bigger Picture with Ease',
    description:
      'Struggling to align short-term trades with long-term trends? With Multi Time Frame Analysis, you can overlay different time frames on your charts, ensuring your trades are backed by a comprehensive market view. This ensures you’re always trading in harmony with the broader market direction.',
    image: 'align-with-bigger-picture'
  },
  {
    title: 'Capitalize on Market Imbalances',
    description:
      'Have you heard the market always returns to fill previous imbalances? With our Imbalance detection feature, you can easily spot areas to which prices are likely to reach, allowing you to enter trades at the perfect moment and maximize your gains.',
    image: 'market-imbalances'
  }
]

export const WhatWeOffer = () => {
  const { settings } = useSettings()
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: '1600px',
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        px: { xs: 2, sm: 6, md: 12, lg: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 }
      }}
    >
      <Stack spacing={2} useFlexGap sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Typography
            component='span'
            variant='h4'
            sx={{
              color: 'text.primary',
              width: '100%',
              textAlign: 'center'
            }}
          >
            How We Improve Your Trading
          </Typography>
        </Box>
        <Typography
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            width: { sm: '100%', md: '80%' }
          }}
        >
          Each one of our features is designed to help you trade smarter
        </Typography>
      </Stack>

      <Stack spacing={1} useFlexGap>
        {items.map((item, index) => {
          const isEven = index % 2 === 0

          return (
            <Grid container alignItems='center' spacing={4} key={index}>
              <Grid item xs={12} sm={6} order={{ xs: 2, sm: isEven ? 1 : 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Card sx={{ width: '80%' }}>
                    <CardContent>
                      <img
                        style={{ width: '100%', borderRadius: 8 }}
                        src={`/static/screenshots/${item.image}-${settings.theme}.png`}
                        alt={`Screenshot of ${item.title}`}
                      />
                    </CardContent>
                  </Card>
                  <br />
                  <StartTrialButton sx={{ width: '80%' }} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} order={{ xs: 1, sm: isEven ? 2 : 1 }}>
                <Stack spacing={2}>
                  <Typography
                    component='span'
                    variant='h5'
                    sx={{
                      color: 'text.primary',
                      width: '100%'
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    {item.description}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          )
        })}
      </Stack>
    </Container>
  )
}
