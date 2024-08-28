import { useEffect, useState } from 'react'
import {
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material'
import { fetchMultiFrameAnalysisData } from './api'
import { useInstrumentDetails } from './contexts/instrument-details-context'
import { useSelectedCandle } from './contexts/selected-candle-context'
import { GetMultiFrameAnalysisItem, InstrumentDetails, SupportResistanceLineDto } from './models'
import { useTheme } from '@emotion/react'
import { transformToPalette } from 'components/common/severity-pill'
import { tagMap } from 'types/tags'
import { useTranslation } from 'react-i18next'
import { getChangeText, getPatternsText, getVolatilityText, getVolumeText } from './candle-analysis'
import { Instrument, TimeFrame, ZoneType } from 'types/options'
import { parseToDate } from 'utils/date-utils'

interface MultiFrameAnalysisProps {
  currentPrice: number
  currentZones: SupportResistanceLineDto[] | undefined
  onDeselectZones: (priceZones: SupportResistanceLineDto[]) => void
  showResistancePriceLevel: (
    timeFrame: TimeFrame,
    symbol: Instrument,
    dateTime: number,
    currentPrice: number,
    instrumentDetails: InstrumentDetails
  ) => void
  showSupportPriceLevel: (
    timeFrame: TimeFrame,
    symbol: Instrument,
    dateTime: number,
    currentPrice: number,
    instrumentDetails: InstrumentDetails
  ) => void
}

const MultiFrameAnalysis = ({
  currentZones,
  currentPrice,
  onDeselectZones,
  showResistancePriceLevel,
  showSupportPriceLevel
}: MultiFrameAnalysisProps) => {
  const instrumentDetails = useInstrumentDetails()
  const candleDateTime = useSelectedCandle()
  const translate = useTranslation()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [multiFrameAnalysis, setMultiFrameAnalysis] = useState<GetMultiFrameAnalysisItem[]>()
  const theme = useTheme()
  const timeFrameCounter = (timeFrame: string) => {
    switch (timeFrame) {
      case 'm15':
        return 0.15
      case 'h1':
        return 1
      case 'h4':
        return 4
      case 'd1':
        return 24
      case 'w1':
        return 168
      default:
        return 1
    }
  }

  useEffect(() => {
    setIsLoading(true)

    if (!instrumentDetails || !candleDateTime) {
      return
    }

    fetchMultiFrameAnalysisData(
      instrumentDetails.instrument,
      instrumentDetails.timeFrame,
      parseToDate(candleDateTime)
    ).then((response) => {
      setIsLoading(false)
      setMultiFrameAnalysis(
        response.timeFramesAnalysis.sort((a, b) => timeFrameCounter(a.timeFrame) - timeFrameCounter(b.timeFrame))
      )
    })
  }, [instrumentDetails, candleDateTime])

  if (isLoading || !instrumentDetails)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <CircularProgress />
      </Box>
    )

  const rows = [
    { label: 'Trend', key: 'trend' },
    { label: 'Momentum', key: 'momentum' },
    { label: 'Support', key: 'support' },
    { label: 'Resistance', key: 'resistance' },
    { label: 'Structure', key: 'structure' },
    { label: 'Volatility', key: 'volatility' },
    { label: 'Volume', key: 'volume' },
    { label: 'Candle', key: 'candle' }
  ]

  const getZoneSelected = (timeFrame: TimeFrame, zoneType: ZoneType) => {
    return currentZones?.filter((s) => s.timeFrame == timeFrame && s.zoneType == zoneType) ?? []
  }

  const isZoneSelected = (timeFrame: TimeFrame, zoneType: ZoneType) => {
    return getZoneSelected(timeFrame, zoneType)?.length > 0
  }

  const getCellData = (analysis: GetMultiFrameAnalysisItem, key: string) => {
    switch (key) {
      case 'trend':
        const trendBullish = analysis.trend.bullish.toFixed(1)
        const trendBearish = analysis.trend.bearish.toFixed(1)
        const trendColor = trendBullish > trendBearish ? theme.palette.success.main : theme.palette.error.main
        return <span style={{ color: trendColor }}>{`${trendBullish}% bullish, ${trendBearish}% bearish`}</span>
      case 'momentum':
        const momentumBullish = analysis.momentum.bullish.toFixed(1)
        const momentumBearish = analysis.momentum.bearish.toFixed(1)
        const momentumColor = momentumBullish > momentumBearish ? theme.palette.success.main : theme.palette.error.main
        return (
          <span style={{ color: momentumColor }}>{`${momentumBullish}% bullish, ${momentumBearish}% bearish`}</span>
        )
      case 'volatility':
        return (
          <>
            {analysis.volatilityTags?.map((insight) => (
              <Box key={insight} sx={{ mb: 0.5 }}>
                <span style={{ color: transformToPalette(tagMap.get(insight)?.color, theme) }}>
                  {translate.t(insight)}
                </span>
              </Box>
            ))}
          </>
        )
      case 'volume':
        return (
          <>
            {analysis.volumeTags?.map((insight) => (
              <Box key={insight} sx={{ mb: 0.5 }}>
                <span style={{ color: transformToPalette(tagMap.get(insight)?.color, theme) }}>
                  {translate.t(insight)}
                </span>
              </Box>
            ))}
          </>
        )
      case 'support':
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              {analysis.support ? (
                <>
                  <div>Next Level: {analysis.support.importanceOfNextLevel}</div>
                  <div>Pips to Next Level: {analysis.support.pipsToNextLevel}</div>
                  {analysis.support.currentZoneImportance && (
                    <div>Current Zone: {analysis.support.currentZoneImportance}</div>
                  )}
                </>
              ) : (
                '-'
              )}
            </Box>
            <Box sx={{ mt: 1 }}>
              {!isZoneSelected(analysis.timeFrame, 'Support') ? (
                <Button
                  variant='outlined'
                  fullWidth={true}
                  size='small'
                  onClick={() =>
                    showSupportPriceLevel(
                      analysis.timeFrame,
                      instrumentDetails.instrument,
                      analysis.support.dateTime,
                      currentPrice,
                      instrumentDetails
                    )
                  }
                >
                  Show
                </Button>
              ) : (
                <Button
                  variant='outlined'
                  fullWidth={true}
                  size='small'
                  onClick={() => onDeselectZones(getZoneSelected(analysis.timeFrame, 'Support'))}
                >
                  Remove
                </Button>
              )}
            </Box>
          </Box>
        )
      case 'resistance':
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              {analysis.resistance ? (
                <>
                  <div>Next Level: {analysis.resistance.importanceOfNextLevel}</div>
                  <div>Pips to Next Level: {analysis.resistance.pipsToNextLevel}</div>
                  {analysis.resistance.currentZoneImportance && (
                    <div>Current Zone: {analysis.resistance.currentZoneImportance}</div>
                  )}
                </>
              ) : (
                '-'
              )}
            </Box>
            <Box sx={{ mt: 1 }}>
              {!isZoneSelected(analysis.timeFrame, 'Resistance') ? (
                <Button
                  variant='outlined'
                  fullWidth={true}
                  size='small'
                  onClick={() =>
                    showResistancePriceLevel(
                      analysis.timeFrame,
                      instrumentDetails.instrument,
                      analysis.resistance.dateTime,
                      currentPrice,
                      instrumentDetails
                    )
                  }
                >
                  Show
                </Button>
              ) : (
                <Button
                  variant='outlined'
                  fullWidth={true}
                  size='small'
                  onClick={() => onDeselectZones(getZoneSelected(analysis.timeFrame, 'Resistance'))}
                >
                  Remove
                </Button>
              )}
            </Box>
          </Box>
        )
      case 'candle':
        return (
          <>
            <Box sx={{ mb: 1 }}>Change: {getChangeText(analysis.candleAnalysis)}</Box>
            <Box sx={{ mb: 1 }}>Volume: {getVolumeText(analysis.candleAnalysis)}</Box>
            <Box sx={{ mb: 1 }}>Volatility: {getVolatilityText(analysis.candleAnalysis)}</Box>
            <Box sx={{ mb: 1 }}>Recent Move: {analysis.candleAnalysis.isLastRenkoUp ? 'Bullish' : 'Bearish'}</Box>
            <Box> Patterns: {getPatternsText(analysis.candleAnalysis)}</Box>
          </>
        )
      case 'structure':
        return (
          <>
            {analysis.structure.direction === 'Long' || analysis.structure.direction === 'Short' ? (
              <div
                style={{
                  color: analysis.structure.direction === 'Long' ? theme.palette.success.main : theme.palette.error.main
                }}
              >
                {analysis.structure.priceMoveSequence.map((s) => translate.t(s)).join(' + ')}
              </div>
            ) : (
              <div>{analysis.structure.priceMoveSequence.map((s) => translate.t(s)).join(' + ')}</div>
            )}
            {analysis.structure.tags?.map((insight) => (
              <Box key={insight} sx={{ mb: 0.5 }}>
                <span>{translate.t(insight)}</span>
              </Box>
            ))}
          </>
        )
      default:
        return '-'
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Analysis</TableCell>
            {multiFrameAnalysis?.map((item) => <TableCell key={item.timeFrame}>{item.timeFrame}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key} sx={{ height: 'auto' }}>
              <TableCell component='th' scope='row' sx={{ height: '100%' }}>
                {row.label}
              </TableCell>
              {multiFrameAnalysis?.map((item) => (
                <TableCell sx={{ height: '100%' }} key={`${item.timeFrame}-${row.key}`}>
                  {getCellData(item, row.key)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MultiFrameAnalysis
