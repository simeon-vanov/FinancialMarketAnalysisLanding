import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Container, Divider, Typography } from '@mui/material'
import { AuthGuard } from 'components/authentication/auth-guard'
import { DashboardLayout } from 'components/common/dashboard-layout'
import { AccountProfile } from 'components/account/profile'
import { gtm } from 'lib/gtm'

const Account: NextPage = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Decode The Trade: Account</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth='md'>
          <Typography variant='h4'>Account</Typography>
          <Divider sx={{ mb: 3 }} />
          <AccountProfile />
        </Container>
      </Box>
    </>
  )
}

Account.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default Account
