import { Fragment, useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Container, Grid, Typography } from '@mui/material'
import { DashboardLayout } from 'components/common/dashboard-layout'
import { gtm } from 'lib/gtm'
import { SymbolStrengthMeter } from 'components/screener/symbol-strength-meter'
import { Option, periodOptions, Period, Instrument } from 'types/options'
import VolatilityAnalysis from 'components/screener/volatility-analysis'
import { TradingSessions } from 'components/screener/trading-sessions-panel'
import { OverviewFilter } from 'components/screener/overview-filter'
import { Screener as ScreenerTable } from 'components/screener/screener'
import { AuthGuard } from 'components/authentication/auth-guard'

const ScreenerPage: NextPage = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option<Period>[]>([periodOptions[1]])
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument>()
  const screenerTableRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    gtm.push()
  }, [])

  const handleInstrumentClick = (instrument: Instrument) => {
    setSelectedInstrument(instrument)
    if (screenerTableRef.current) {
      screenerTableRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const Charts = (
    <Grid container spacing={4}>
      {selectedOptions.map((option) => (
        <Fragment key={`${option.value}-overview`}>
          <Grid key={`strength-meter-${option.value}`} item md={6} xs={12}>
            <SymbolStrengthMeter period={option} onInstrumentClick={handleInstrumentClick} />
          </Grid>
          <Grid key={`volatility-analysis-${option.value}`} item md={6} xs={12}>
            <VolatilityAnalysis period={option} onInstrumentClick={handleInstrumentClick} />
          </Grid>
        </Fragment>
      ))}
    </Grid>
  )

  const Heading = (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant='h4'>Market Screener</Typography>
        </Grid>
        <Grid item>
          <OverviewFilter selectedOptions={selectedOptions} setOptions={setSelectedOptions} />
        </Grid>
      </Grid>
    </Box>
  )

  return (
    <>
      <Head>
        <title>Market Screener</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth='xl'>
          {Heading}
          <TradingSessions />
          {Charts}
          <div ref={screenerTableRef} />
          <ScreenerTable
            selectedInstrument={selectedInstrument}
            deselectInstrument={() => setSelectedInstrument(undefined)}
          />
        </Container>
      </Box>
    </>
  )
}

ScreenerPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default ScreenerPage
