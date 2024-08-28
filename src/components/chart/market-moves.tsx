import { useEffect, useState } from 'react'
import { MarketMovesTimeOutlookDto, PriceMoveDto } from './models'
import { fetchCurrentMarketMoveData, fetchMarketMovesData } from './api'
import { Avatar, Box, Button, Card, CircularProgress, Grid, Typography, useTheme } from '@mui/material'
import {
  TimeOutlookType,
  getLabel,
  priceMoveTypeOptions,
  sizeIndexOptions,
  timeOutlookOptions,
  volatilityIndexOptions,
  volumeIndexOptions
} from 'types/options'
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab'
import { format } from 'date-fns'
import ArrowDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowUpIcon from '@mui/icons-material/ArrowCircleUp'
import { useInstrumentDetails } from './contexts/instrument-details-context'
import { parseToDate } from 'utils/date-utils'

interface PriceMovesProps {
  selectedTime: number | null
  startTime: number
  endTime: number
  selectedPriceMove?: PriceMoveDto
  onShowPriceMove: (priceMove: PriceMoveDto) => void
}

const PriceMoves: React.FC<PriceMovesProps> = ({
  selectedTime,
  startTime,
  endTime,
  selectedPriceMove,
  onShowPriceMove
}) => {
  const [timeOutlookPriceMoves, setTimeOutlookPriceMoves] = useState<MarketMovesTimeOutlookDto[]>([])
  const [showMoreMoves, setShowMoreMoves] = useState<number[]>([])
  const [visiblePriceMoves, setVisiblePriceMoves] = useState<MarketMovesTimeOutlookDto[]>([])
  const [selectedTimeOutlook, setSelectedTimeOutlook] = useState<TimeOutlookType>('MediumTerm')
  const instrumentDetails = useInstrumentDetails()
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)

    if (!instrumentDetails) return
    fetchMarketMovesData(
      instrumentDetails.instrument,
      instrumentDetails.timeFrame,
      parseToDate(startTime),
      parseToDate(endTime)
    ).then((response) => {
      setTimeOutlookPriceMoves(response.marketMovesTimeOutlook)
      setShowMoreMoves(new Array(response.marketMovesTimeOutlook.length).fill(1))
    })
  }, [instrumentDetails, startTime, endTime])

  useEffect(() => {
    if (!timeOutlookPriceMoves || !instrumentDetails) {
      return
    }

    setIsLoading(true)
    let visiblePriceMoves = [...timeOutlookPriceMoves]
    if (selectedTime) {
      visiblePriceMoves = visiblePriceMoves.map((timeOutlookMoves) => ({
        ...timeOutlookMoves,
        marketMoves: timeOutlookMoves.marketMoves.filter((priceMove) => priceMove.calculationTime <= selectedTime)
      }))
    }

    fetchCurrentMarketMoveData(
      instrumentDetails.instrument,
      instrumentDetails.timeFrame,
      parseToDate(selectedTime || endTime)
    ).then((response) => {
      response.marketMovesTimeOutlook.forEach((currentMove) => {
        currentMove.marketMove.isCurrent = true

        const timeOutlookVisibleMoves = visiblePriceMoves.find((x) => x.timeOutlook === currentMove.timeOutlook)
        if (!timeOutlookVisibleMoves) return

        timeOutlookVisibleMoves.marketMoves = timeOutlookVisibleMoves?.marketMoves.filter(
          (priceMove) => !priceMove.isCurrent
        )
        timeOutlookVisibleMoves?.marketMoves?.unshift(currentMove.marketMove)
      })

      setVisiblePriceMoves(visiblePriceMoves)
      setIsLoading(false)
    })
  }, [selectedTime, timeOutlookPriceMoves])

  const handleLoadMoreMoves = (index: number) => {
    setShowMoreMoves((prevShowMoreMoves) => {
      const newShowMoreMoves = [...prevShowMoreMoves]
      newShowMoreMoves[index]++
      return newShowMoreMoves
    })
  }

  const index = visiblePriceMoves.findIndex((x) => x.timeOutlook == selectedTimeOutlook)
  const selectedTimeOutlookMoves = visiblePriceMoves.find((x) => x.timeOutlook == selectedTimeOutlook)

  if (isLoading || !selectedTimeOutlookMoves) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          p: 3
        }}
      >
        <Card>
          <Grid alignItems='center' container justifyContent='space-between'>
            {visiblePriceMoves.map((priceMove, index) => (
              <Grid
                key={priceMove.timeOutlook}
                onClick={() => setSelectedTimeOutlook(priceMove.timeOutlook)}
                item
                md={4}
                sm={6}
                xs={12}
                sx={{
                  cursor: 'pointer',
                  borderRight: (theme) => ({
                    md: index !== visiblePriceMoves.length - 1 ? `1px solid ${theme.palette.divider}` : 'none'
                  }),
                  borderBottom: (theme) => ({
                    sm: 'none',
                    xs: `1px solid ${theme.palette.divider}`
                  }),
                  backgroundColor:
                    priceMove.timeOutlook == selectedTimeOutlook
                      ? theme.palette.primary.main
                      : theme.palette.background.paper,
                  p: 3,
                  textAlign: 'center'
                }}
              >
                <Box>
                  <Typography
                    color={priceMove.timeOutlook == selectedTimeOutlook ? 'white' : 'textPrimary'}
                    variant='subtitle1'
                  >
                    {getLabel(priceMove.marketMoves[0].priceMoveType, priceMoveTypeOptions)}
                  </Typography>
                  <Typography
                    color={priceMove.timeOutlook == selectedTimeOutlook ? 'white' : 'textSecondary'}
                    sx={{ mt: 1 }}
                    variant='subtitle2'
                  >
                    {getLabel(priceMove.timeOutlook, timeOutlookOptions)}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Box>{' '}
      <Timeline
        sx={{
          m: 0,
          p: 2
        }}
      >
        {selectedTimeOutlookMoves.marketMoves.slice(0, showMoreMoves[index] * 5).map((priceMove, moveIndex) => (
          <TimelineItem
            key={`${priceMove.startTime}_${priceMove.priceMoveType}_${priceMove.isCurrent}`}
            sx={{
              '&::before': {
                display: 'none'
              }
            }}
          >
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  border: 0,
                  p: 0
                }}
              >
                <Avatar>
                  {priceMove.isUpDirection ? (
                    <ArrowUpIcon fontSize='small' color='success' />
                  ) : (
                    <ArrowDownIcon fontSize='small' color='error' />
                  )}
                </Avatar>
              </TimelineDot>
              {selectedTimeOutlookMoves.marketMoves.length - 1 > moveIndex && (
                <TimelineConnector
                  sx={{
                    backgroundColor: 'divider',
                    minHeight: 30
                  }}
                />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant='body2'>
                {getLabel(priceMove.priceMoveType, priceMoveTypeOptions)} |{' '}
                {getLabel(priceMove.sizeIndexType, sizeIndexOptions)} Size |{' '}
                {getLabel(priceMove.volatilityIndexType, volatilityIndexOptions)} |{' '}
                {getLabel(priceMove.volumeIndexType, volumeIndexOptions)}
                {priceMove.id !== selectedPriceMove?.id && (
                  <>
                    {' '}
                    |{' '}
                    <span
                      style={{ cursor: 'pointer', color: theme.palette.primary.main }}
                      onClick={() => onShowPriceMove(priceMove)}
                    >
                      View
                    </span>
                  </>
                )}
              </Typography>
              <Typography color='textSecondary' sx={{ mt: 1 }} variant='caption'>
                {`${format(parseToDate(priceMove.startTime), 'MMM dd, h:mm a')} to ${format(
                  parseToDate(priceMove.endTime),
                  'MMM dd, h:mm a'
                )}`}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      {selectedTimeOutlookMoves.marketMoves.length > showMoreMoves[index] * 5 && (
        <Button onClick={() => handleLoadMoreMoves(index)}>Load More</Button>
      )}
    </>
  )
}

export default PriceMoves
