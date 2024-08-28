import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

const caseStudies = [
  {
    avatar: <Avatar alt='Rayner Teo' src='/static/mock-images/avatars/rayner.jpg' />,
    name: 'Rayner Teo',
    occupation: 'From Engineering Student to Forex Educator',
    testimonial:
      'Rayner Teo started trading in 2009 during a Forex trading competition at his school, only to blow up his account within two days. Determined to succeed, he devoured every bit of trading knowledge available, from technical indicators to chart patterns. Despite initial failures, his persistence paid off when he secured a position as a proprietary futures trader after university. This experience led to his "AHA" moment, and he has since become a consistently profitable trader and now inspires thousands through his blog, TradingwithRayner'
  },
  {
    avatar: <Avatar alt='Chris Capre' src='/static/mock-images/avatars/chris-capre.jpg' />,
    name: 'Chris Capre',
    occupation: 'From Yoga Instructor to Forex Mentor',
    testimonial:
      "Chris Capre initially aspired to be a yoga instructor, but a friend's intuition led him to explore currency trading. Intrigued by charts that seemed to make sense to him, Chris quickly found his calling in Forex trading. Despite early success, he endured tough times and gained experience as a broker, hedge fund trader, and finally, an independent trader and educator."
  },
  {
    avatar: <Avatar alt='Nial Fuller' src='/static/mock-images/avatars/nialfuller.png' />,
    name: 'Nial Fuller',
    occupation: 'From Aspiring Trader to Price Action Authority',
    testimonial:
      "Nial Fuller began his trading journey over 20 years ago with a passion for mastering price action trading. Starting his blog in 2008, he has since become one of the most followed Forex trading coaches worldwide, attracting over 250,000 readers each month. His simple yet effective trading philosophy has helped thousands of traders. Nial's dedication to trading and coaching has led to his success, making him a recognized authority in the field."
  },
  {
    avatar: <Avatar alt='Remy Sharp' src='/static/mock-images/avatars/Jarratt-davis.jpg' />,
    name: 'Jarratt Davis',
    occupation: 'From Window Washer to Hedge Fund Trader',
    testimonial:
      'Jarratt Davis began his trading journey with no prior experience or education in finance, starting just like many others. Despite facing numerous setbacks and quitting several times, his persistence paid off. A chance meeting with a successful stock trader helped him refine his approach, ultimately leading him to become the #2 ranked Forex trader in the world according to Barclays. His story highlights the importance of resilience, continuous learning, and the value of networking in achieving success in Forex trading.'
  }
]

export default function CaseStudies() {
  return (
    <Container
      id='testimonials'
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
          width: { sm: '100%', md: '70%' },
          textAlign: { sm: 'left', md: 'center' }
        }}
      >
        <Typography component='h2' variant='h4' sx={{ color: 'text.primary' }}>
          But You Can Succeed Too
        </Typography>
        <Typography variant='body1' sx={{ color: 'text.secondary' }}>
          Discover how ordinary individuals transformed their lives through Forex trading. With determination,
          self-education, and resilience, they turned their passion for trading into successful careers. Let their
          journeys inspire you to start your own path to financial freedom and success.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {caseStudies.map((testimonial, index) => (
          <Grid item xs={12} md={6} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1
              }}
            >
              <CardContent>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <CardHeader avatar={testimonial.avatar} title={testimonial.name} subheader={testimonial.occupation} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
