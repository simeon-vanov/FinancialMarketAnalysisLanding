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
        <meta property='og:title' content='Decode The Trade' />
        <meta
          property='og:description'
          content='Decode The Trade is a platform for analyzing markets, identifying profitable setups and becoming a world-class trader.'
        />
        <meta property='og:url' content='https://decodethetrade.com' />
        <meta property='og:image' content='https://decodethetrade.com/static/thumbnail.png' />
        <meta property='og:type' content='website' />
        <meta property='og:image:width' content='1280' />
        <meta property='og:image:height' content='720' />
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
