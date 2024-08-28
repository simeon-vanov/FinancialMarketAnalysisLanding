import { useEffect } from 'react'
import { fetchInsightsData } from '../api'
import { useInstrumentDetails } from '../contexts/instrument-details-context'
import { useSelectedCandle } from '../contexts/selected-candle-context'
import {
  TradingInsightsContextType,
  useSetTradingInsights,
  useTradingInsights
} from '../contexts/trading-insights-context'
import { parseToDate } from 'utils/date-utils'

export const useFetchTradingInsights = (): TradingInsightsContextType | null => {
  const tradingInsights = useTradingInsights()
  const setTradingInsights = useSetTradingInsights()
  const instrumentDetails = useInstrumentDetails()
  const candleDateTime = useSelectedCandle()

  useEffect(() => {
    if (!instrumentDetails || !candleDateTime) {
      return
    }

    const currentParams = {
      instrument: instrumentDetails.instrument,
      timeFrame: instrumentDetails.timeFrame,
      candleDateTime: parseToDate(candleDateTime)
    }

    // Check if the current parameters match the last used ones
    if (tradingInsights?.params === JSON.stringify(currentParams)) {
      return // If they match, do not fetch
    }

    const fetchData = async () => {
      setTradingInsights({
        params: JSON.stringify(currentParams),
        tradingInsights: null,
        loading: true
      })

      const newPriceZones = await fetchInsightsData(
        instrumentDetails.instrument,
        instrumentDetails.timeFrame,
        parseToDate(candleDateTime)
      )

      setTradingInsights({
        params: JSON.stringify(currentParams),
        tradingInsights: newPriceZones,
        loading: false
      })
    }

    fetchData()
  }, [candleDateTime, instrumentDetails])

  return tradingInsights ?? null
}
