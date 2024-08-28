import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CircularProgress } from '@mui/material'
import { useFetchTradingInsights } from './hooks/trading-insights'

interface TradingInsightsProps {
  onMarkLastSignificantCandle: (candleDateTime: number) => void
}

const TradingInsights = ({ onMarkLastSignificantCandle }: TradingInsightsProps) => {
  const { t } = useTranslation()
  const insightsFetch = useFetchTradingInsights()

  if (insightsFetch?.loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
        <CircularProgress />
      </Box>
    )
  }

  const insights = insightsFetch?.tradingInsights

  return (
    <Box>
      <Typography gutterBottom variant='subtitle2'>
        Price Move Insights
      </Typography>
      <Typography color='textSecondary' variant='body2' sx={{ mb: 2 }}>
        {insights?.structureInsights.sequence.map((s) => t(s)).join(' + ')}. {insights?.structureInsights.message}
      </Typography>
      <Typography gutterBottom variant='subtitle2'>
        Volatility Insights
      </Typography>
      <Typography color='textSecondary' variant='body2' sx={{ mb: 2 }}>
        {insights?.volatilityInsights}
      </Typography>
      <Typography gutterBottom variant='subtitle2'>
        Volume Insights
      </Typography>
      <Typography color='textSecondary' variant='body2' sx={{ mb: 2 }}>
        {insights?.volumeInsights}
      </Typography>
      <Typography gutterBottom variant='subtitle2'>
        Trend Insights
      </Typography>
      <Typography color='textSecondary' variant='body2' sx={{ mb: 2 }}>
        {`${insights?.trendInsights.bullish.toFixed(1)}% bullish, ${insights?.trendInsights.bearish.toFixed(
          1
        )}% bearish. ${insights?.trendInsights.message}`}
      </Typography>
      <Typography gutterBottom variant='subtitle2'>
        Momentum Insights
      </Typography>
      <Typography color='textSecondary' variant='body2' sx={{ mb: 2 }}>
        {`${insights?.momentumInsights.bullish.toFixed(1)}% bullish, ${insights?.momentumInsights.bearish.toFixed(
          1
        )}% bearish. ${insights?.momentumInsights.message}`}
      </Typography>
      <Typography gutterBottom variant='subtitle2'>
        Reversal Insights
      </Typography>
      <Typography color='textSecondary' variant='body2' sx={{ mb: 2 }}>
        {insights?.reversalInsights}
      </Typography>
      <Typography gutterBottom variant='subtitle2'>
        Current Candle Insights
      </Typography>
      <Typography color='textSecondary' variant='body2' sx={{ mb: 2 }}>
        {insights?.candleInsights?.message}
      </Typography>
      <Box display='flex' alignItems='center'>
        <Typography gutterBottom variant='subtitle2' style={{ flexGrow: 1 }}>
          Last High Trading Activity Insights
        </Typography>
        <Box display='flex' justifyContent='flex-end'>
          <Button
            size='small'
            variant='text'
            onClick={() => onMarkLastSignificantCandle(insights!.lastSignificantCandleInsights!.candleDateTime)}
          >
            Mark on chart
          </Button>
        </Box>
      </Box>
      <Typography color='textSecondary' variant='body2' sx={{ mb: 2 }}>
        {insights?.lastSignificantCandleInsights.message}
      </Typography>
      <Typography gutterBottom variant='subtitle2'>
        Price Levels Insights
      </Typography>
      <Typography color='textSecondary' variant='body2'>
        {insights?.priceLevelsInsights?.message}
      </Typography>
    </Box>
  )
}

export default TradingInsights
