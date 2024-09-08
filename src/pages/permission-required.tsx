import { useEffect } from 'react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import Head from 'next/head'
import { Box, Button, Container, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { gtm } from '../lib/gtm'
import { useSubscription } from 'hooks/use-subscription'
import { toPascalCase } from 'utils/words-utils'

const PermissionRequired: NextPage = () => {
  const theme = useTheme()
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const { subscription } = useSubscription()

  useEffect(() => {
    gtm.push()
  }, [])

  return (
    <>
      <Head>
        <title>Your Subscription Does Not Support this page</title>
      </Head>
      <Box
        component='main'
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          flexGrow: 1,
          py: '80px'
        }}
      >
        <Container maxWidth='lg'>
          <Typography align='center' variant={mobileDevice ? 'h4' : 'h1'}>
            {toPascalCase(subscription ?? '')}: Not Enough Permissions
          </Typography>
          <Typography align='center' color='textSecondary' sx={{ mt: 0.5 }} variant='subtitle2'>
            You do not have enough permissions to access this page. Please upgrade your subscription level.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6
            }}
          >
            <Box
              alt='Under development'
              component='img'
              src={`/static/error/error401_${theme.palette.mode}.svg`}
              sx={{
                height: 'auto',
                maxWidth: '100%',
                width: 400
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6
            }}
          >
            <NextLink href='/' passHref>
              <Button variant='outlined'>Back to Home</Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default PermissionRequired
