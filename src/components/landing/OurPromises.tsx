import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { Chip as MuiChip } from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { styled } from '@mui/material/styles'

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded'
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded'
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded'
import { StartTrialButton } from './start-trial-button'

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Identify Profitable Setups with Confidence',
    description:
      'Discover high-probability trading opportunities with our Market State Filters and Multi Time Frame Analysis, designed to help you pinpoint the best setups.',
    imageLight: 'url("/static/screenshots/actionable-insights-light.png")',
    imageDark: 'url("/static/screenshots/actionable-insights-dark.png")'
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Manage Risk Effectively with Confluence Analysis',
    description:
      'Protect your capital and enhance your trading strategy by leveraging Confluence Levels across multiple time frames, giving you a clearer view of potential risks and rewards.',
    imageLight: 'url("/static/screenshots/automatic-resistance-lines-light.png")',
    imageDark: 'url("/static/screenshots/automatic-resistance-lines-dark.png")'
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Become a 10x trader',
    description:
      'We are committed to turning you into a 10x trader by providing tools that not only simplify market analysis but also accelerate your learning curve. With our Learning Hub and features like Historical Candle Analysis, you’ll quickly understand the ‘why’ behind every market move. What might take months to grasp through other means, you can master in days with our platform.',
    imageLight: 'url("/static/screenshots/comprehensive-trading-insights-light.png")',
    imageDark: 'url("/static/screenshots/comprehensive-trading-insights-dark.png")'
  }
]

interface ChipProps {
  selected?: boolean
}

const Chip = styled(MuiChip)<ChipProps>(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        background: 'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
        color: 'hsl(0, 0%, 100%)',
        borderColor: theme.palette.primary.light,
        '& .MuiChip-label': {
          color: 'hsl(0, 0%, 100%)'
        },
        ...theme.applyStyles('dark', {
          borderColor: theme.palette.primary.dark
        })
      }
    }
  ]
}))

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0)

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index)
  }

  const selectedFeature = items[selectedItemIndex]

  return (
    <Container id='features' sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component='h2' variant='h4' sx={{ color: 'text.primary' }}>
              Our Promises
            </Typography>
            <Typography variant='body1' sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}>
              We are committed to help traders of all levels to trade with confidence, understand the market better, and
              spent less time analyzing and spent more time with their loved ones.
            </Typography>
          </div>
          <Grid container item sx={{ gap: 1, display: { xs: 'auto', sm: 'none' } }}>
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                selected={selectedItemIndex === index}
              />
            ))}
          </Grid>
          <Card variant='outlined' sx={{ display: { xs: 'auto', sm: 'none' }, mt: 4 }}>
            <Box
              sx={(theme) => ({
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 280,
                backgroundImage: 'var(--items-imageLight)',
                ...theme.applyStyles('dark', {
                  backgroundImage: 'var(--items-imageDark)'
                })
              })}
              style={
                {
                  '--items-imageLight': items[selectedItemIndex].imageLight,
                  '--items-imageDark': items[selectedItemIndex].imageDark
                } as any
              }
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                {selectedFeature.title}
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary', mb: 1.5 }}>
                {selectedFeature.description}
              </Typography>
              <Link
                color='primary'
                variant='body2'
                sx={{
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center',
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' }
                }}
              >
                <span>Learn more</span>
                <ChevronRightRoundedIcon fontSize='small' sx={{ mt: '1px', ml: '2px' }} />
              </Link>
            </Box>
          </Card>
          <Stack
            direction='column'
            spacing={2}
            useFlexGap
            sx={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 3,
                    height: 'fit-content',
                    width: '100%',
                    background: 'none',
                    '&:hover': {
                      background:
                        'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
                      borderColor: 'primary.light',
                      boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
                      ...theme.applyStyles('dark', {
                        background:
                          'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
                        borderColor: 'primary.dark',
                        boxShadow: '0px 1px 8px hsla(210, 100%, 25%, 0.5) '
                      })
                    }
                  }),
                  selectedItemIndex === index &&
                    ((theme) => ({
                      backgroundColor: 'action.selected',
                      borderColor: 'primary.light',
                      ...theme.applyStyles('dark', {
                        borderColor: 'primary.dark'
                      })
                    }))
                ]}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5
                  }}
                >
                  <Box
                    sx={[
                      (theme) => ({
                        color: 'grey.400',
                        ...theme.applyStyles('dark', {
                          color: 'grey.600'
                        })
                      }),
                      selectedItemIndex === index && {
                        color: 'primary.main'
                      }
                    ]}
                  >
                    {icon}
                  </Box>
                  <div>
                    <Typography gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                      {title}
                    </Typography>
                    <Typography variant='body2' sx={{ color: 'text.secondary', mb: 1.5 }}>
                      {description}
                    </Typography>
                    <Link
                      color='primary'
                      variant='body2'
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                      sx={{
                        fontWeight: 'bold',
                        display: 'inline-flex',
                        alignItems: 'center',
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' }
                      }}
                    >
                      <span>Learn more</span>
                      <ChevronRightRoundedIcon fontSize='small' sx={{ mt: '1px', ml: '2px' }} />
                    </Link>
                  </div>
                </Box>
              </Card>
            ))}
            <StartTrialButton fullWidth />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}>
          <Card
            variant='outlined'
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none'
            }}
          >
            <Box
              sx={(theme) => ({
                m: 'auto',
                width: 420,
                height: 500,
                backgroundSize: 'contain',
                backgroundImage: 'var(--items-imageLight)',
                ...theme.applyStyles('dark', {
                  backgroundImage: 'var(--items-imageDark)'
                })
              })}
              style={
                {
                  '--items-imageLight': items[selectedItemIndex].imageLight,
                  '--items-imageDark': items[selectedItemIndex].imageDark
                } as any
              }
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
