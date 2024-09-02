import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Divider } from '@mui/material'
import { DashboardLayout } from 'components/common/dashboard-layout'
import { gtm } from 'lib/gtm'
import Hero from 'components/landing/Hero'
import OurPromises from 'components/landing/OurPromises'
import Pricing from 'components/landing/Pricing'
import FAQ from 'components/landing/FAQ'
import { Footer } from 'components/landing/footer'
import { WhatIs } from 'components/landing/WhatIs'
import { HowItWorks } from 'components/landing/HowItWorks'
import { WhatWeOffer } from 'components/landing/WhatWeOffer'
import { Element } from 'react-scroll'

const Overview: NextPage = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Decode The Trade</title>
      </Head>
      <Hero />
      <Box>
        <Divider />
        <Element name='what-is'>
          <WhatIs />
        </Element>
        <Divider />
        <Element name='our-promise'>
          <OurPromises />
        </Element>
        <Divider />
        <Element name='how-it-works'>
          <HowItWorks />
        </Element>
        <Divider />
        <Element name='what-we-offer'>
          <WhatWeOffer />
        </Element>
        <Divider />
        <Element name='pricing'>
          <Pricing />
        </Element>
        <Divider />
        <Element name='faq'>
          <FAQ />
        </Element>
        <Footer />
      </Box>
    </>
  )
}

Overview.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Overview
