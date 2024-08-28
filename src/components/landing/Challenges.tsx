import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LayersRounded from '@mui/icons-material/LayersRounded'
import FilterListIcon from '@mui/icons-material/FilterListRounded'
import SecurityIcon from '@mui/icons-material/SecurityRounded'
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded'
import ShuffleIcon from '@mui/icons-material/ShuffleRounded'
import BarChartIcon from '@mui/icons-material/BarChartRounded'
import PsychologyIcon from '@mui/icons-material/PsychologyRounded'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovementRounded'
import EqualizerIcon from '@mui/icons-material/EqualizerRounded'

const items = [
  {
    icon: <LayersRounded />,
    title: 'Market Complexity',
    description:
      'The market produces less alpha and technical patterns, price movements, and market sentiment are hard to recognize.'
  },
  {
    icon: <FilterListIcon />,
    title: 'Information Overload',
    description:
      'Filtering out the noise and identifying relevant information is overwhelming, particularly for novice traders.'
  },
  {
    icon: <SecurityIcon />,
    title: 'Risk Management',
    description:
      'Many traders struggle with setting stop-loss levels and position sizing, leading to large, unexpected losses.'
  },
  {
    icon: <TrendingUpIcon />,
    title: 'Market Volatility',
    description:
      'The markets are volatile, with prices changing rapidly. Managing trades in such an environment requires experience and a robust strategy.'
  },
  {
    icon: <ShuffleIcon />,
    title: 'Lack of Consistent Strategies',
    description:
      'The internet offers countless strategies, but determining which one works for your trading style and market conditions is tough.'
  },
  {
    icon: <BarChartIcon />,
    title: 'Technical Analysis Challenges',
    description:
      'Effective technical analysis involves interpreting various indicators and chart patterns, which can be daunting for new traders.'
  },
  {
    icon: <PsychologyIcon />,
    title: 'Psychological Barriers',
    description: "Emotions fear of missing out, fear of loss, and overconfidence are part of every trader's journey."
  },
  {
    icon: <SelfImprovementIcon />,
    title: 'Emotional Discipline',
    description:
      'Fear and greed often lead to impulsive decisions and significant losses. Staying composed and sticking to a strategy is crucial yet difficult.'
  },
  {
    icon: <EqualizerIcon />,
    title: 'Managing Multiple Indicators',
    description:
      'Juggling multiple indicators to confirm signals is challenging and time-consuming, often leading to confusion and missed opportunities.'
  }
]

export default function Challenges() {
  return (
    <Box
      id='highlights'
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'hsl(220, 30%, 2%)'
      }}
    >
      <Container
        sx={{
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
          <Typography component='h2' variant='h4'>
            Why Traders Fail
          </Typography>
          <Typography variant='body1' sx={{ color: 'grey.400' }}>
            Trading in the forex market is incredibly challenging, akin to winning an Olympic gold medal, as noted by
            renowned hedge fund manager Ray Dalio. Many traders spend years honing their skills before achieving
            consistent profitability.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction='column'
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'hsla(220, 25%, 25%, .3)',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                  boxShadow: 'none'
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
