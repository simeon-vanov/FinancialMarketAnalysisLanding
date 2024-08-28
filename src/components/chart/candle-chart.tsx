import { useEffect, useRef, useState, ReactNode } from 'react'
import { ColorType, LineStyle, createChart } from 'lightweight-charts'
import {
  Candle,
  ImbalanceDto,
  IndicatorsCalculation,
  PivotsResponse,
  PriceMoveDto,
  SupportResistanceLineDto,
  Volume
} from './models'
import { useTheme, Theme, css } from '@emotion/react'
import { IconButton, Box, Divider, Typography, Tooltip, Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { ContentSearchDialog } from 'components/common/content-search-dialog'
import {
  Instrument,
  TimeFrame,
  getLabel,
  priceMoveTypeOptions,
  sizeIndexOptions,
  timeFrameOptions,
  volatilityIndexOptions,
  volumeIndexOptions,
  zoneImportanceOptions
} from 'types/options'
import CloseIcon from '@mui/icons-material/Close'
import { useInstrumentDetails } from './contexts/instrument-details-context'
import { fetchPivotsData } from './api'
import { tagMap } from 'types/tags'
import { useSettings } from 'hooks/use-settings'
import { parseToDate } from 'utils/date-utils'

interface CandleChartProps {
  candles: Candle[]
  volumes: Volume[]
  selectedCandleTime: number | null
  onSelectedCandleTime: (time: number | null) => void
  onInstrumentChange: (instrument: Instrument, timeFrame: TimeFrame) => void
  indicatorCalculation?: IndicatorsCalculation
  priceMove?: PriceMoveDto
  priceZones?: SupportResistanceLineDto[]
  imbalances?: ImbalanceDto[]
  markedCandles: MarkedCandle[]
  deselectPriceMove: () => void
  deselectIndicator: () => void
  loadMoreCandles: (instrument: Instrument, timeFrame: TimeFrame, lastCandleTime: number) => Promise<void>
  loadNextCandles: (instrument: Instrument, timeFrame: TimeFrame, newestCandleTime: number) => Promise<void>
  isLastBatch: boolean
  allowNextButtons: boolean
  onNextButtonClick: () => void
  onPreviousButtonClick: () => void
  visibleRange?: { from: number; to: number }
}

export type MarkedCandle = { time: number; color?: string }

const CandleChart = ({
  candles,
  volumes,
  selectedCandleTime,
  onSelectedCandleTime,
  onInstrumentChange,
  indicatorCalculation,
  priceMove,
  priceZones,
  imbalances,
  markedCandles,
  deselectPriceMove,
  deselectIndicator,
  loadMoreCandles,
  loadNextCandles,
  isLastBatch,
  allowNextButtons,
  onNextButtonClick,
  onPreviousButtonClick,
  visibleRange
}: CandleChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const candleSeriesRef = useRef<any>(null)
  const volumeSeriesRef = useRef<any>(null)
  const [priceLines, setPriceLines] = useState<any[]>([])
  const [imbalancesLines, setImbalances] = useState<any[]>([])
  const chartRef = useRef<any>(null) // Add chart as a ref
  const theme = useTheme() as Theme
  const instrumentDetails = useInstrumentDetails()
  const [pivotsAreVisible, setPivotsAreVisible] = useState(false)
  const [pivots, setPivots] = useState<PivotsResponse>()
  const isFetchingHistoricalCandlesRef = useRef(true)
  const { settings } = useSettings()

  const togglePivots = async () => {
    if (!instrumentDetails?.instrument || !instrumentDetails?.timeFrame) {
      return
    }

    if (!pivotsAreVisible) {
      const results = await fetchPivotsData(
        instrumentDetails?.instrument,
        instrumentDetails?.timeFrame,
        parseToDate(candles[0].time),
        parseToDate(candles[candles.length - 1].time)
      )

      setPivots(results)
    } else {
      setPivots(undefined)
    }

    setPivotsAreVisible(!pivotsAreVisible)
  }

  const candleClickHandler = (param: any) => {
    if (
      isNaN(Number(param.time)) ||
      Number(param.time) == selectedCandleTime ||
      Number(param.time) == candles[candles.length - 1].time
    ) {
      return onSelectedCandleTime(null)
    }

    onSelectedCandleTime(Number(param.time))
  }

  useEffect(() => {
    if (!instrumentDetails || !chartContainerRef.current) {
      return
    }

    setImbalances([])

    const chart = createChart(chartContainerRef.current!, {
      width: 0,
      height: 600,
      layout: {
        background: { type: ColorType.Solid, color: theme.palette.background.paper },
        textColor: theme.palette.text.primary
      },
      grid: {
        vertLines: {
          color: settings.theme === 'dark' ? '#303030' : '#E6E6E6',
          visible: true
        },
        horzLines: {
          color: settings.theme === 'dark' ? '#303030' : '#E6E6E6',
          visible: true
        }
      },
      timeScale: {
        timeVisible: instrumentDetails.timeFrame != 'w1' && instrumentDetails.timeFrame != 'd1',
        secondsVisible: false
      }
    })

    candleSeriesRef.current = chart.addCandlestickSeries({
      priceFormat: {
        type: 'price',
        precision: instrumentDetails.precision,
        minMove: instrumentDetails.minMove
      }
    })

    candleSeriesRef.current.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1, // highest point of the series will be 10% away from the top
        bottom: 0.2 // lowest point will be 40% away from the bottom
      },
      autoScale: true,
      mode: 1
    })

    volumeSeriesRef.current = chart.addHistogramSeries({
      priceFormat: {
        type: 'volume'
      },
      priceScaleId: '',
      lastValueVisible: false,
      priceLineVisible: false
    })

    volumeSeriesRef.current.priceScale().applyOptions({
      // set the positioning of the volume series
      visible: false,
      scaleMargins: {
        top: 0.8,
        bottom: 0
      }
    })

    chartRef.current = chart // Assign chart to the ref

    return () => chart.remove()
  }, [instrumentDetails, settings.theme])

  useEffect(() => {
    if (!chartRef.current || !candleSeriesRef.current || !volumeSeriesRef.current || !instrumentDetails) return

    const selectedEndTime = priceMove?.endTime || selectedCandleTime
    const selectedStartTime = priceMove?.startTime
    const isOutOfRange = (time: number) =>
      (selectedEndTime && time > selectedEndTime) || (selectedStartTime && time < selectedStartTime)

    if (candleSeriesRef.current && instrumentDetails) {
      candleSeriesRef.current.setData(
        candles.map((candle) => ({
          ...candle,
          color: isOutOfRange(candle.time)
            ? settings.theme == 'light'
              ? 'rgba(255,255,255, 0.2)'
              : 'rgba(0,0,0, 0.2)'
            : undefined
        }))
      )
      isFetchingHistoricalCandlesRef.current = false
    }

    if (volumeSeriesRef.current && instrumentDetails) {
      volumeSeriesRef.current.setData(
        volumes.map((volume) => ({
          ...volume,
          color: isOutOfRange(volume.time) ? `rgba(${volume.color.slice(5, -6)}, 0.1)` : volume.color
        }))
      )
    }

    const onVisibleLogicalRangeChanged = async (newVisibleLogicalRange: any) => {
      const barsInfo = candleSeriesRef.current.barsInLogicalRange(newVisibleLogicalRange)
      // if there less than 50 bars to the left of the visible area
      if (
        barsInfo !== null &&
        barsInfo.barsBefore < 50 &&
        !isFetchingHistoricalCandlesRef.current &&
        instrumentDetails
      ) {
        isFetchingHistoricalCandlesRef.current = true
        await loadMoreCandles(instrumentDetails?.instrument, instrumentDetails?.timeFrame, candles[0].time)
      }

      if (
        barsInfo !== null &&
        barsInfo.barsAfter < 50 &&
        !isFetchingHistoricalCandlesRef.current &&
        instrumentDetails &&
        !isLastBatch
      ) {
        isFetchingHistoricalCandlesRef.current = true
        await loadNextCandles(
          instrumentDetails?.instrument,
          instrumentDetails?.timeFrame,
          candles[candles.length - 1].time
        )
      }
    }

    if (visibleRange) {
      chartRef.current.timeScale().setVisibleRange({
        from: visibleRange.from,
        to: visibleRange.to
      })
    }

    chartRef.current.timeScale().subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged)

    return () => chartRef.current.timeScale().unsubscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged)
  }, [
    candles,
    selectedCandleTime,
    volumes,
    volumeSeriesRef.current,
    priceMove,
    chartRef.current,
    candleSeriesRef.current,
    instrumentDetails,
    isLastBatch,
    visibleRange
  ])

  useEffect(() => {
    if (!chartRef.current) return

    chartRef.current.subscribeClick(candleClickHandler)

    return () => {
      chartRef.current.unsubscribeClick(candleClickHandler)
    }
  }, [chartRef.current, selectedCandleTime])

  useEffect(() => {
    if (!candleSeriesRef.current) {
      return
    }

    const markers = candleSeriesRef.current
      .markers()
      .filter((x: any) => !x.id?.startsWith('marked') && !x.id?.startsWith('signal'))
    markers.sort((a: any, b: any) => a.time - b.time)
    candleSeriesRef.current.setMarkers(markers)

    if (indicatorCalculation) {
      const markers = candleSeriesRef.current.markers().filter((x: any) => !x.id?.startsWith('signal'))
      markers.push(
        ...indicatorCalculation.signals.map((signalTime) => ({
          time: signalTime,
          position: 'aboveBar',
          shape: 'circle',
          color: theme.palette.success.main,
          id: `signal-${signalTime.toString()}`
        }))
      )
      markers.sort((a: any, b: any) => a.time - b.time)
      candleSeriesRef.current.setMarkers(markers)
    }

    if (markedCandles) {
      const markers = candleSeriesRef.current.markers().filter((x: any) => !x.id?.startsWith('marked'))
      markers.push(
        ...markedCandles.map((marked) => ({
          time: marked.time,
          position: 'belowBar',
          shape: 'arrowUp',
          color: marked.color ?? 'blue',
          id: `marked-${marked.time.toString()}`
        }))
      )
      markers.sort((a: any, b: any) => a.time - b.time)
      candleSeriesRef.current.setMarkers(markers)
    }
  }, [candleSeriesRef.current, indicatorCalculation, markedCandles])

  useEffect(() => {
    if (!candleSeriesRef.current) {
      return
    }

    if (pivots) {
      const markers = candleSeriesRef.current.markers().filter((x: any) => !x.id?.startsWith('pivots'))

      markers.push(
        ...pivots.highs.map((pivot) => ({
          time: pivot.time,
          position: 'aboveBar',
          text: pivot.value.toString(),
          color: settings.theme === 'dark' ? 'white' : 'black',
          id: `pivots-high-${pivot.time.toString()}`
        }))
      )

      markers.push(
        ...pivots.lows.map((pivot) => ({
          time: pivot.time,
          position: 'belowBar',
          text: pivot.value.toString(),
          color: settings.theme === 'dark' ? 'white' : 'black',
          id: `pivots-low-${pivot.time.toString()}`
        }))
      )

      markers.sort((a: any, b: any) => a.time - b.time)

      candleSeriesRef.current.setMarkers(markers)
    } else {
      candleSeriesRef.current.setMarkers(
        candleSeriesRef.current.markers().filter((x: any) => !x.id?.startsWith('pivots'))
      )
    }
  }, [candleSeriesRef.current, pivots])

  useEffect(() => {
    if (!candleSeriesRef.current || !priceZones) {
      return
    }

    priceLines.forEach((priceLine) => {
      candleSeriesRef.current.removePriceLine(priceLine)
    })

    const bottomPriceLines = priceZones.map((priceZone) =>
      candleSeriesRef.current.createPriceLine({
        price: priceZone.priceBottomBoundary,
        color: priceZone.zoneType == 'Support' ? theme.palette.error.main : theme.palette.success.main,
        axisLabelVisible: true,
        lineWidth: 2,
        lineStyle: LineStyle.Solid,
        title: `${priceZone.timeFrame} Bottom ${priceZone.level} - ${getLabel(priceZone.importance, zoneImportanceOptions)}`
      })
    )

    const topPriceLines = priceZones.map((priceZone) =>
      candleSeriesRef.current.createPriceLine({
        price: priceZone.priceUpperBoundary,
        color: priceZone.zoneType == 'Support' ? theme.palette.error.main : theme.palette.success.main,
        axisLabelVisible: true,
        lineWidth: 2,
        lineStyle: LineStyle.Solid,
        title: `${priceZone.timeFrame} Upper ${priceZone.level} - ${getLabel(priceZone.importance, zoneImportanceOptions)}`
      })
    )

    setPriceLines([...bottomPriceLines, ...topPriceLines])
  }, [candleSeriesRef.current, priceZones])

  useEffect(() => {
    if (!candleSeriesRef.current || !imbalances || !instrumentDetails || !chartRef.current) {
      return
    }

    imbalancesLines.forEach((lineSerie) => {
      chartRef.current.removeSeries(lineSerie)
    })

    const imbalancesSeries: any[] = []
    imbalances.forEach((imbalance) => {
      const lineSerieBottom = chartRef.current.addLineSeries({
        priceFormat: {
          type: 'price',
          precision: instrumentDetails.precision,
          minMove: instrumentDetails.minMove
        },
        lineWidth: 2,
        color: imbalance.signalDirection == 'Long' ? theme.palette.error.main : theme.palette.success.main
      })

      lineSerieBottom.setData(
        candles
          .filter((candle) => candle.time >= imbalance.candleTime)
          .map((candle) => ({
            time: candle.time,
            value: imbalance.priceBottomBoundary
          }))
      )

      const lineSerieTop = chartRef.current.addLineSeries({
        priceFormat: {
          type: 'price',
          precision: instrumentDetails.precision,
          minMove: instrumentDetails.minMove
        },
        lineWidth: 2,
        color: imbalance.signalDirection == 'Long' ? theme.palette.error.main : theme.palette.success.main
      })

      lineSerieTop.setData(
        candles
          .filter((candle) => candle.time >= imbalance.candleTime)
          .map((candle) => ({
            time: candle.time,
            value: imbalance.priceUpperBoundary
          }))
      )

      imbalancesSeries.push(lineSerieBottom)
      imbalancesSeries.push(lineSerieTop)
    })

    setImbalances(imbalancesSeries)
  }, [candleSeriesRef.current, imbalances])

  const renderButtons = (
    text: string,
    tooltipText: string,
    onClick: () => void,
    highlight: boolean,
    icon?: ReactNode
  ) => {
    return (
      <Tooltip title={tooltipText} key={text}>
        <IconButton
          size='small'
          sx={{ background: 'transparent', border: 'none', '&:hover': { background: 'lightgray' } }}
          onClick={onClick}
        >
          {icon}
          <Typography variant='subtitle1' sx={{ color: highlight ? theme.palette.info.main : undefined }}>
            {text}
          </Typography>
        </IconButton>
      </Tooltip>
    )
  }

  const timeFrames = ['m15', 'h1', 'h4', 'd1', 'w1']
  const shownTimeFrames = timeFrameOptions.filter((timeFrame) => timeFrames.includes(timeFrame.value))

  return (
    <Box sx={{ background: theme.palette.background.paper }}>
      <Box sx={{ display: 'flex' }}>
        <ContentSearchDialog onClose={() => setOpenDialog(false)} open={openDialog} onRowSelect={onInstrumentChange} />
        <Grid container spacing={1}>
          <Grid item>
            {renderButtons(
              instrumentDetails?.instrument ?? '',
              'Instrument Search',
              () => setOpenDialog(true),
              false,
              <SearchIcon />
            )}
          </Grid>

          <Grid item sx={{ display: 'flex', paddingBottom: 1 }}>
            <Divider orientation='vertical' flexItem />
          </Grid>
          {shownTimeFrames.map((timeFrame) => (
            <Grid item key={timeFrame.value}>
              {renderButtons(
                timeFrame.value,
                timeFrame.label,
                () => onInstrumentChange(instrumentDetails?.instrument ?? 'EURUSD', timeFrame.value),
                timeFrame.value == instrumentDetails?.timeFrame
              )}
            </Grid>
          ))}
          <Grid item sx={{ display: 'flex', paddingBottom: 1 }}>
            <Divider orientation='vertical' flexItem />
          </Grid>
          <Grid item>
            {renderButtons(
              'Pivots',
              pivotsAreVisible ? 'Remove Pivots' : 'Show Pivots',
              togglePivots,
              pivotsAreVisible
            )}
          </Grid>
          <Grid item sx={{ display: 'flex', paddingBottom: 1 }}>
            <Divider orientation='vertical' flexItem />
          </Grid>
          {allowNextButtons && (
            <>
              <Grid item>
                {renderButtons('', 'Previous Match', onNextButtonClick, allowNextButtons, <ChevronLeftIcon />)}
              </Grid>
              <Grid item>
                {renderButtons('', 'Next Match', onPreviousButtonClick, allowNextButtons, <ChevronRightIcon />)}
              </Grid>
            </>
          )}
        </Grid>
      </Box>
      <Divider />
      <div css={chartCss} ref={chartContainerRef} style={{ position: 'relative' }}>
        {indicatorCalculation && (
          <div className='legend'>
            <div>
              {indicatorCalculation.indicatorName} signals {tagMap.get(indicatorCalculation.tag)?.text}
              <IconButton size='small' onClick={deselectIndicator}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        )}
        {priceMove && (
          <div className='legend'>
            <div>
              {getLabel(priceMove.priceMoveType, priceMoveTypeOptions)} |{' '}
              {getLabel(priceMove.sizeIndexType, sizeIndexOptions)} Size |{' '}
              {getLabel(priceMove.volatilityIndexType, volatilityIndexOptions)} |{' '}
              {getLabel(priceMove.volumeIndexType, volumeIndexOptions)}
              <IconButton size='small' onClick={deselectPriceMove}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    </Box>
  )
}

const chartCss = css`
  .legend {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    line-height: 18px;
    font-weight: 300;
  }
`

export default CandleChart
