import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Tab,
  Tabs,
  Alert,
  useMediaQuery
} from '@mui/material'
import { DashboardLayout } from 'components/common/dashboard-layout'
import { gtm } from 'lib/gtm'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import CandleChart, { MarkedCandle } from 'components/chart/candle-chart'
import {
  Candle,
  CandleReceivedSignalR,
  CandlesResponse,
  CompositeFilter,
  FilterMatchingCandlesResponse,
  ImbalanceDto,
  IndicatorsCalculation,
  InstrumentDetails,
  PriceMoveDto,
  SupportResistanceLineDto,
  Volume
} from 'components/chart/models'
import {
  fetchCandlesData,
  fetchIndicatorsCalculationData,
  fetchMatchingConditionsData,
  fetchPriceZonesData
} from 'components/chart/api'
import { Instrument, TimeFrame } from 'types/options'
import IndicatorsAnalysis from 'components/chart/indicators'
import PriceMoves from 'components/chart/market-moves'
import PriceZones from 'components/chart/risk-assessment'
import TradingInsights from 'components/chart/trading-insights'
import { Theme, useTheme } from '@emotion/react'
import { InstrumentDetailsContext } from 'components/chart/contexts/instrument-details-context'
import { SelectedCandleContext } from 'components/chart/contexts/selected-candle-context'
import { PriceZonesContext, PriceZonesContextType } from 'components/chart/contexts/price-zone-context'
import CandleAnalysis from 'components/chart/candle-analysis'
import {
  IndicatorAnalysisContext,
  IndicatorAnalysisContextType
} from 'components/chart/contexts/indicators-analysis-context'
import TagFilter from 'components/chart/tag-filter'
import { createCompositeFilter, createGroups } from 'utils/filters-utils'
import MultiFrameAnalysis from 'components/chart/multi-frame-insights'
import { Tag } from 'types/tags'
import { MarketStateList } from 'components/chart/market-state-list'
import { TradingInsightsContext, TradingInsightsContextType } from 'components/chart/contexts/trading-insights-context'
import { initNotificationHub, stopNotificationHub } from 'src/services/notifications'
import { SubscriptionGuard } from 'components/authentication/subscription-guard'
import { calculateDistance } from 'utils/price-levels-utils'
import { parseToDate } from 'utils/date-utils'

const ChartAnalysis: NextPage = () => {
  const router = useRouter()
  const [instrument, setInstrument] = useState<Instrument | undefined>()
  const [timeFrame, setTimeFrame] = useState<TimeFrame | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [candles, setCandles] = useState<Candle[]>([])
  const [volumes, setVolumes] = useState<Volume[]>([])
  const [isLastBatch, setIsLastBatch] = useState<boolean>(false)
  const [indicatorCalculation, setIndicatorCalclation] = useState<IndicatorsCalculation>()
  const [currentTab, setCurrentTab] = useState('insights')
  const [currentTabBelowChart, setCurrentTabBelowChart] = useState('multi-frame')
  const [markedCandles, setMarkedCandles] = useState<MarkedCandle[]>([])
  const [filterMatch, setFilterMatch] = useState<FilterMatchingCandlesResponse | null>(null)
  const [selectedPriceMove, setSelectedPriceMove] = useState<PriceMoveDto>()
  const [selectedPriceZones, setSelectedPriceZones] = useState<SupportResistanceLineDto[]>()
  const [selectedImbalances, setSelectedImbalances] = useState<ImbalanceDto[]>()
  const [selectedCandleTime, setSelectedCandleTime] = useState<number | null>(null)
  const theme = useTheme()
  const [instrumentDetails, setInstrumentDetails] = useState<InstrumentDetails>()
  const [priceZones, setPriceZones] = useState<PriceZonesContextType | null>(null)
  const [indicatorAnalysis, setIndicatorAnalysis] = useState<IndicatorAnalysisContextType | null>(null)
  const [selectedInsightsTags, setSelectedInsightsTags] = useState<Tag[]>([])
  const [tradingInsights, setTradingInsights] = useState<TradingInsightsContextType | null>(null)
  const [visibleRange, setVisibleRange] = useState<{ from: number; to: number }>()
  const isScreenXl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'))

  useEffect(() => {
    if (!instrumentDetails || !candles) {
      setMarkedCandles([])
      setFilterMatch(null)
      return
    }

    const groups = createGroups(selectedInsightsTags)
    const compositeFilter = createCompositeFilter(groups)
    readMatchingConditions(compositeFilter)
  }, [instrumentDetails, selectedInsightsTags])

  useEffect(() => {
    initNotificationHub((candleSignal) => setCandleReceived(candleSignal, instrumentDetails!, isLastBatch))

    return stopNotificationHub
  }, [instrumentDetails, isLastBatch])

  const readMatchingConditions = async (filter: CompositeFilter) => {
    if (!instrument || !timeFrame || !selectedInsightsTags.length || !candles[0]) {
      setFilterMatch(null)
      return setMarkedCandles([])
    }

    const response = await fetchMatchingConditionsData(
      instrument,
      timeFrame,
      parseToDate(candles[0].time),
      parseToDate(candles[candles.length - 1].time),
      filter
    )

    response.matches = response.matches.sort((x, y) => y.candleTime - x.candleTime)
    setFilterMatch(response)

    setMarkedCandles(
      response.matches
        .map((match) => ({ time: match.candleTime, color: theme.palette.warning.light }))
        .sort((x, y) => x.time - y.time)
    )
  }

  useEffect(() => {
    setIsLoading(true)
    gtm.push()

    let queryInstrument = router.query.instrument as Instrument
    let queryTimeFrame = router.query.timeFrame as TimeFrame

    if (queryInstrument && queryTimeFrame) {
      setInstrument(queryInstrument)
      setTimeFrame(queryTimeFrame)
    } else {
      const localStorageInstrument = localStorage.getItem('instrument') as Instrument
      const localStorageTimeFrame = localStorage.getItem('timeFrame') as TimeFrame

      if (localStorageInstrument && localStorageTimeFrame) {
        setInstrument(localStorageInstrument)
        setTimeFrame(localStorageTimeFrame)

        queryInstrument = localStorageInstrument
        queryTimeFrame = localStorageTimeFrame
      } else {
        setInstrument('EURUSD')
        setTimeFrame('d1')

        queryInstrument = 'EURUSD'
        queryTimeFrame = 'd1'
      }
    }

    setInstrument(queryInstrument)
    setTimeFrame(queryTimeFrame)
    setIsLoading(false)
  }, [router.query])

  useEffect(() => {
    if (!instrument || !timeFrame) {
      return
    }

    localStorage.setItem('instrument', instrument)
    localStorage.setItem('timeFrame', timeFrame)

    setInstrumentDetails({
      instrument: instrument,
      timeFrame: timeFrame,
      minMove: instrument.includes('JPY') ? 0.001 : 0.00001,
      precision: instrument.includes('JPY') ? 3 : 5
    })

    readCandles()
  }, [instrument, timeFrame])

  const setCandleReceived = (
    params: CandleReceivedSignalR,
    instrumentDetails: InstrumentDetails,
    isLastBatch: boolean
  ) => {
    if (
      params.symbol !== instrumentDetails?.instrument ||
      params.timeFrame !== instrumentDetails?.timeFrame ||
      !isLastBatch
    ) {
      return
    }

    setCandles((previousState) => {
      if (previousState.some((x) => x.time == params.candle.time)) {
        return previousState
      }

      toast.success('New candle received')
      const lastTime = previousState[previousState.length - 1].time
      if (selectedCandleTime == lastTime) {
        setMarkedCandles(lastTime ? [{ time: lastTime, color: theme.palette.warning.light }] : [])
      }

      return [...previousState, params.candle].sort((x, y) => x.time - y.time)
    })

    setVolumes((previousState) => {
      if (previousState.some((x) => x.time == params.volume.time)) {
        return previousState
      }

      return [...previousState, params.volume].sort((x, y) => x.time - y.time)
    })
  }

  const readCandles = async () => {
    if (!instrument || !timeFrame) {
      return
    }

    const response = await fetchCandlesData(instrument, timeFrame, new Date(), 500)
    setCandles(response.candles)
    setVolumes(response.volumes)
    setSelectedCandleTime(response.candles.length && response.candles[response.candles.length - 1].time)
  }

  const loadMoreCandles = async (instrument: Instrument, timeFrame: TimeFrame, lastCandleTime: number) => {
    if (!instrument || !timeFrame || !lastCandleTime) {
      return
    }

    const response = await fetchCandlesData(instrument, timeFrame, parseToDate(lastCandleTime), 500)
    setStateFromCandles(response)
  }

  const loadNextCandles = async (instrument: Instrument, timeFrame: TimeFrame, newestCandleTime: number) => {
    if (!instrument || !timeFrame || !newestCandleTime) {
      return
    }

    if (isLastBatch) return console.log('No more candles to load')
    const response = await fetchCandlesData(instrument, timeFrame, parseToDate(newestCandleTime), 0, 250)
    setStateFromCandles(response)
  }

  const setStateFromCandles = (response: CandlesResponse) => {
    setCandles((previousState) =>
      [...response.candles.filter((x) => !previousState.some((s) => s.time == x.time)), ...previousState].sort(
        (x, y) => x.time - y.time
      )
    )
    setVolumes((previousState) =>
      [...response.volumes.filter((x) => !previousState.some((s) => s.time == x.time)), ...previousState].sort(
        (x, y) => x.time - y.time
      )
    )

    setIsLastBatch(response.isLastBatch)
  }

  const handleInstrumentChange = (newInstrument: Instrument, newTimeFrame: TimeFrame) => {
    if (newInstrument === instrument && newTimeFrame === timeFrame) return

    setSelectedCandleTime(null)
    setIndicatorCalclation(undefined)
    setSelectedPriceMove(undefined)
    setSelectedInsightsTags([])
    setFilterMatch(null)
    setIndicatorAnalysis(null)
    setInstrument(newInstrument)
    setTimeFrame(newTimeFrame)
  }

  const renderLoading = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <CircularProgress />
    </Box>
  )

  const loadIndicator = useCallback(
    async (id: string, signalId: string) => {
      if (!instrument || !timeFrame || !candles.length) {
        return
      }

      const indicatorResult = await fetchIndicatorsCalculationData(
        instrument,
        timeFrame,
        parseToDate(candles[0].time),
        parseToDate(candles[candles.length - 1].time),
        id,
        signalId
      )

      setIndicatorCalclation(indicatorResult)
    },
    [candles, instrument, timeFrame]
  )

  useEffect(() => {
    if (indicatorCalculation) {
      loadIndicator(indicatorCalculation.indicatorId, indicatorCalculation.signalId)
    }
  }, [candles])

  const tabs = [
    { label: 'Summary', value: 'insights' },
    { label: 'Price Moves', value: 'moves' },
    { label: 'Resistance Lines', value: 'resistance' },
    { label: 'Support Lines', value: 'support' },
    { label: 'Imbalances', value: 'imbalances' }
  ]

  let tabsBelowChart = [
    { label: 'Multiple Time Frame', value: 'multi-frame' },
    { label: 'Momentum', value: 'momentum' },
    { label: 'Volatility', value: 'volatility' },
    { label: 'Volume', value: 'volume' },
    { label: 'Trend', value: 'trend' },
    { label: 'Reversal', value: 'reversal' },
    { label: 'Candle Analysis', value: 'candle' }
  ]

  if (!isScreenXl) {
    tabsBelowChart = [...tabs, ...tabsBelowChart]
  }

  useEffect(() => {
    if (isScreenXl) {
      if (!tabsBelowChart.some((x) => x.value === currentTabBelowChart)) {
        setCurrentTabBelowChart('multi-frame')
      }

      return
    }

    setCurrentTabBelowChart('insights')
  }, [isScreenXl])

  const onSelectedCandle = (time: number | null) => {
    setSelectedPriceMove(undefined)
    setSelectedCandleTime(time ?? (candles.length && candles[candles.length - 1].time))
    setSelectedImbalances(undefined)
    setSelectedPriceZones([])

    let defaultMarkedCandles: MarkedCandle[] = []
    if (!time && filterMatch) {
      defaultMarkedCandles = filterMatch.matches
        .map((match) => ({ time: match.candleTime, color: theme.palette.warning.light }))
        .sort((x, y) => x.time - y.time)
    }

    setMarkedCandles(time ? [{ time, color: theme.palette.warning.light }] : defaultMarkedCandles)
  }

  const onSelectedPriceMove = (priceMove: PriceMoveDto) => {
    setSelectedPriceMove(priceMove)
    setSelectedImbalances(undefined)
  }

  const onSelectedPriceZones = (priceZones: SupportResistanceLineDto[]) => {
    if (!selectedPriceZones) return setSelectedPriceZones(priceZones)

    setSelectedPriceZones(
      selectedPriceZones
        .filter(
          (x) => !priceZones.some((s) => s.level == x.level && s.timeFrame == x.timeFrame && s.zoneType == x.zoneType)
        )
        .concat(priceZones)
    )
  }

  const onDeselectZones = (priceZones: SupportResistanceLineDto[]) => {
    setSelectedPriceZones(
      selectedPriceZones?.filter(
        (x) => !priceZones.some((s) => s.level == x.level && s.timeFrame == x.timeFrame && x.zoneType == s.zoneType)
      )
    )
  }

  const onSelectedImbalance = (imbalances: ImbalanceDto[]) => {
    if (!selectedImbalances) return setSelectedImbalances(imbalances)
    setSelectedImbalances(
      selectedImbalances
        .filter(
          (x) =>
            !imbalances.some(
              (s) =>
                s.priceUpperBoundary == x.priceUpperBoundary &&
                s.priceBottomBoundary == x.priceBottomBoundary &&
                s.timeFrame == x.timeFrame
            )
        )
        .concat(imbalances)
    )
  }

  const deselectImbalance = (imbalances: ImbalanceDto[]) => {
    setSelectedImbalances(
      selectedImbalances?.filter(
        (x) =>
          !imbalances.some(
            (s) =>
              s.priceUpperBoundary == x.priceUpperBoundary &&
              s.priceBottomBoundary == x.priceBottomBoundary &&
              s.timeFrame == x.timeFrame
          )
      )
    )
  }

  const deselectPriceMove = () => {
    setSelectedPriceMove(undefined)
  }

  const deselectIndicator = () => {
    setIndicatorCalclation(undefined)
  }

  const onMarkLastSignificantCandle = (candleDateTime: number) => {
    setMarkedCandles(
      [
        ...markedCandles.filter((x) => x.time == selectedCandleTime && x.color == theme.palette.warning.light),
        { time: candleDateTime }
      ].sort((x, y) => x.time - y.time)
    )
  }

  const showFilteredResultCandle = async (candleTime: number, instrumentDetails: InstrumentDetails) => {
    let filteredCandle = candles.find((x) => x.time == candleTime)
    let currentCandles = candles

    if (!filteredCandle) {
      const response = await fetchCandlesData(
        instrumentDetails.instrument,
        instrumentDetails.timeFrame,
        parseToDate(candleTime),
        250,
        250
      )
      currentCandles = response.candles
      setCandles(response.candles)
      setVolumes(response.volumes)
      setIsLastBatch(response.isLastBatch)

      filteredCandle = response.candles.find((x) => x.time == candleTime)
    }

    if (filteredCandle) {
      const selectedCandleIndex = currentCandles.findIndex((candle) => candle.time == filteredCandle?.time)
      setVisibleRange({
        from: currentCandles[selectedCandleIndex - 100 < 0 ? 0 : selectedCandleIndex - 100].time,
        to: currentCandles[
          selectedCandleIndex + 50 >= currentCandles.length ? currentCandles.length - 1 : selectedCandleIndex + 50
        ].time
      })
    }

    onSelectedCandle(filteredCandle!.time)
  }

  const loadResistancePriceZone = async (
    timeFrame: TimeFrame,
    symbol: Instrument,
    dateTime: number,
    currentPrice: number,
    instrumentDetails: InstrumentDetails
  ) => {
    const response = await fetchPriceZonesData(symbol, timeFrame, parseToDate(dateTime))
    visualizeRelevantLines(response.resistanceLines, timeFrame, (line) =>
      calculateDistance(line.priceBottomBoundary, currentPrice, instrumentDetails.minMove)
    )
  }

  const loadSupportPriceZone = async (
    timeFrame: TimeFrame,
    symbol: Instrument,
    dateTime: number,
    currentPrice: number,
    instrumentDetails: InstrumentDetails
  ) => {
    const response = await fetchPriceZonesData(symbol, timeFrame, parseToDate(dateTime))

    visualizeRelevantLines(response.supportLines, timeFrame, (line) =>
      calculateDistance(currentPrice, line.priceUpperBoundary, instrumentDetails.minMove)
    )
  }

  const visualizeRelevantLines = (
    lines: SupportResistanceLineDto[],
    timeFrame: TimeFrame,
    calcDistance: (linePrice: SupportResistanceLineDto) => number
  ) => {
    const nextSupport = lines.find((x) => x.level == 1)

    if (!nextSupport) {
      return
    }

    const supportZonesToShow = [nextSupport]
    const distance = calcDistance(nextSupport)
    if (distance < 0) {
      const nextNextSupport = lines.find((x) => x.level == 2)

      if (nextNextSupport) {
        supportZonesToShow.push(nextNextSupport)
      }
    }

    onSelectedPriceZones(supportZonesToShow.map((x) => ({ ...x, timeFrame })))
  }

  const insightsPanel = (tab: string) => {
    if (tab === 'moves') {
      return (
        <PriceMoves
          selectedTime={selectedCandleTime}
          startTime={candles[0].time}
          endTime={candles[candles.length - 1].time}
          selectedPriceMove={selectedPriceMove}
          onShowPriceMove={onSelectedPriceMove}
        />
      )
    }

    if (tab === 'resistance' || tab === 'support' || tab === 'imbalances') {
      return (
        <PriceZonesContext.Provider value={[priceZones, setPriceZones]}>
          {tab === 'resistance' && currentCandle && (
            <PriceZones
              currentPrice={currentCandle!.close}
              onShowResistanceZones={(priceZones) => onSelectedPriceZones(priceZones)}
              onShowSupportZones={(priceZones) => onSelectedPriceZones(priceZones)}
              onShowImbalances={onSelectedImbalance}
              onDeselectZones={onDeselectZones}
              selectedPriceZones={selectedPriceZones ?? []}
              selectedImbalances={selectedImbalances ?? []}
              onDeselectImbalances={deselectImbalance}
              type='resistance'
            />
          )}
          {tab === 'support' && currentCandle && (
            <PriceZones
              currentPrice={currentCandle.close}
              onShowResistanceZones={(priceZones) => onSelectedPriceZones(priceZones)}
              onShowSupportZones={(priceZones) => onSelectedPriceZones(priceZones)}
              onShowImbalances={onSelectedImbalance}
              onDeselectZones={onDeselectZones}
              selectedPriceZones={selectedPriceZones ?? []}
              selectedImbalances={selectedImbalances ?? []}
              onDeselectImbalances={deselectImbalance}
              type='support'
            />
          )}
          {tab === 'imbalances' && currentCandle && (
            <PriceZones
              currentPrice={currentCandle.close}
              onShowResistanceZones={(priceZones) => onSelectedPriceZones(priceZones)}
              onShowSupportZones={(priceZones) => onSelectedPriceZones(priceZones)}
              onShowImbalances={onSelectedImbalance}
              onDeselectZones={onDeselectZones}
              selectedPriceZones={selectedPriceZones ?? []}
              selectedImbalances={selectedImbalances ?? []}
              onDeselectImbalances={deselectImbalance}
              type='imbalances'
            />
          )}
        </PriceZonesContext.Provider>
      )
    }

    if (tab === 'insights') {
      return <TradingInsights onMarkLastSignificantCandle={onMarkLastSignificantCandle} />
    }
  }

  const renderMessage =
    candles[candles.length - 1] && selectedCandleTime == candles[candles.length - 1].time ? (
      <Alert sx={{ mb: 1 }} severity='info'>
        Click on a candle to see a historical view
      </Alert>
    ) : (
      <Alert sx={{ mb: 1 }} severity='warning'>
        You are currently in historic view. Click again on the candle to return to the latest data
      </Alert>
    )

  const onNextButtonClick = () => {
    if (!filterMatch) {
      return
    }

    const currentSelectedIndex = filterMatch.matches.findIndex((x) => x.candleTime == selectedCandleTime)
    if (currentSelectedIndex === filterMatch.matches.length - 1) {
      return
    }

    let nextIndex = currentSelectedIndex + 1
    if (currentSelectedIndex === -1) {
      nextIndex = filterMatch.matches.length - 1
    }

    showFilteredResultCandle(filterMatch.matches[nextIndex].candleTime, instrumentDetails!)
  }

  const onPreviousButtonClick = () => {
    if (!filterMatch) {
      return
    }

    const currentSelectedIndex = filterMatch.matches.findIndex((x) => x.candleTime == selectedCandleTime)
    if (currentSelectedIndex === 0) {
      return
    }

    let previousIndex = currentSelectedIndex - 1
    if (currentSelectedIndex === -1) {
      previousIndex = 0
    }

    showFilteredResultCandle(filterMatch.matches[previousIndex].candleTime, instrumentDetails!)
  }

  const currentCandle = !selectedCandleTime
    ? candles[candles.length - 1]
    : candles.find((x) => x.time == selectedCandleTime)

  const renderMain = (
    <InstrumentDetailsContext.Provider value={[instrumentDetails, setInstrumentDetails]}>
      <SelectedCandleContext.Provider value={[selectedCandleTime, setSelectedCandleTime]}>
        <TradingInsightsContext.Provider value={[tradingInsights, setTradingInsights]}>
          <Container maxWidth={false}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TagFilter
                  selectedTradingInsights={selectedInsightsTags}
                  setSelectedTradingInsights={setSelectedInsightsTags}
                  matchedResults={filterMatch}
                  onFilterResultClick={showFilteredResultCandle}
                />
              </Grid>
              <Grid item xs={12}>
                <MarketStateList
                  selectedTradingInsights={selectedInsightsTags}
                  setSelectedTradingInsights={setSelectedInsightsTags}
                />
              </Grid>
              <Grid item xs={12}>
                {renderMessage}
              </Grid>
              <Grid item container xl={7} lg={12}>
                <Card sx={{ width: '100%' }}>
                  <CardContent sx={{ width: '100%' }}>
                    <Grid item xs={12}>
                      <CandleChart
                        onInstrumentChange={handleInstrumentChange}
                        candles={candles}
                        volumes={volumes}
                        onSelectedCandleTime={onSelectedCandle}
                        selectedCandleTime={selectedCandleTime}
                        priceMove={selectedPriceMove}
                        indicatorCalculation={indicatorCalculation}
                        priceZones={selectedPriceZones}
                        imbalances={selectedImbalances}
                        deselectPriceMove={deselectPriceMove}
                        deselectIndicator={deselectIndicator}
                        markedCandles={markedCandles}
                        loadMoreCandles={loadMoreCandles}
                        loadNextCandles={loadNextCandles}
                        isLastBatch={isLastBatch}
                        allowNextButtons={(filterMatch?.matches?.length ?? 0) > 0}
                        onNextButtonClick={onNextButtonClick}
                        onPreviousButtonClick={onPreviousButtonClick}
                        visibleRange={visibleRange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {selectedCandleTime && (
                        <>
                          <Box sx={{ mt: 3, width: '100%', overflowX: 'auto' }}>
                            <Tabs
                              indicatorColor='primary'
                              onChange={(event: any, value: string): void => setCurrentTabBelowChart(value)}
                              scrollButtons='auto'
                              sx={{ mt: 3, width: '100%' }}
                              textColor='primary'
                              value={currentTabBelowChart}
                              variant='scrollable'
                              css={{
                                '& .MuiTabs-flexContainer': { justifyContent: 'space-between' },
                                '& .MuiTab-root': { flexGrow: 1, minWidth: 0 }
                              }}
                            >
                              {tabsBelowChart.map((tab) => (
                                <Tab key={tab.value} label={tab.label} value={tab.value} sx={{ flexGrow: 1 }} />
                              ))}
                            </Tabs>
                          </Box>
                          <Divider sx={{ mb: 3 }} />
                          <Box>
                            <IndicatorAnalysisContext.Provider value={[indicatorAnalysis, setIndicatorAnalysis]}>
                              {currentTabBelowChart === 'momentum' && (
                                <IndicatorsAnalysis onShowIndicator={loadIndicator} indicatorCategory='momentum' />
                              )}
                              {currentTabBelowChart === 'reversal' && (
                                <IndicatorsAnalysis onShowIndicator={loadIndicator} indicatorCategory='reversal' />
                              )}
                              {currentTabBelowChart === 'trend' && (
                                <IndicatorsAnalysis onShowIndicator={loadIndicator} indicatorCategory='trend' />
                              )}
                              {currentTabBelowChart === 'volatility' && (
                                <IndicatorsAnalysis onShowIndicator={loadIndicator} indicatorCategory='volatility' />
                              )}
                              {currentTabBelowChart === 'volume' && (
                                <IndicatorsAnalysis onShowIndicator={loadIndicator} indicatorCategory='volume' />
                              )}
                              {currentTabBelowChart === 'candle' && <CandleAnalysis />}
                              {currentTabBelowChart === 'multi-frame' && (
                                <MultiFrameAnalysis
                                  currentZones={selectedPriceZones}
                                  currentPrice={currentCandle!.close}
                                  onDeselectZones={onDeselectZones}
                                  showResistancePriceLevel={loadResistancePriceZone}
                                  showSupportPriceLevel={loadSupportPriceZone}
                                />
                              )}
                            </IndicatorAnalysisContext.Provider>
                            {insightsPanel(currentTabBelowChart)}
                          </Box>
                        </>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xl={5} xs={12} sx={{ display: !isScreenXl ? 'none' : 'block' }}>
                <Card>
                  <CardContent sx={{ pt: 0 }}>
                    {selectedCandleTime && (
                      <>
                        <Tabs
                          indicatorColor='primary'
                          onChange={(event: any, value: string): void => setCurrentTab(value)}
                          scrollButtons='auto'
                          sx={{ mt: 3, maxWidth: '100%' }}
                          textColor='primary'
                          value={currentTab}
                          variant='scrollable'
                          css={{
                            '& .MuiTabs-flexContainer': { justifyContent: 'space-between' },
                            '& .MuiTab-root': { flexGrow: 1 }
                          }}
                        >
                          {tabs.map((tab) => (
                            <Tab key={tab.value} label={tab.label} value={tab.value} />
                          ))}
                        </Tabs>
                        <Divider sx={{ mb: 3 }} />
                        <Box>{insightsPanel(currentTab)}</Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </TradingInsightsContext.Provider>
      </SelectedCandleContext.Provider>
    </InstrumentDetailsContext.Provider>
  )

  return (
    <>
      <Head>
        <title>Chart</title>
      </Head>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        {isLoading ? renderLoading : renderMain}
      </Box>
    </>
  )
}

ChartAnalysis.getLayout = (page) => (
  <SubscriptionGuard allowedSubscriptions={['ultimate', 'premium']}>
    <DashboardLayout>{page}</DashboardLayout>
  </SubscriptionGuard>
)

export default ChartAnalysis
