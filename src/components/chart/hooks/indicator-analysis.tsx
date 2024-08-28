import { useEffect } from 'react'
import { fetchIndicatorsData } from '../api'
import { useIndicatorsAnalysis, useSetIndicatorsAnalysis } from '../contexts/indicators-analysis-context'
import { useInstrumentDetails } from '../contexts/instrument-details-context'
import { useSelectedCandle } from '../contexts/selected-candle-context'
import { IndicatorsResponse } from '../models'
import { parseToDate } from 'utils/date-utils'

export const useFetchIndicatorsAnalysis = (): IndicatorsResponse | null => {
  const indicatorsAnalysis = useIndicatorsAnalysis()
  const setIndicatorAnalysis = useSetIndicatorsAnalysis()

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
    if (indicatorsAnalysis?.params === JSON.stringify(currentParams)) {
      return // If they match, do not fetch
    }

    const fetchData = async () => {
      const newAnalysis = await fetchIndicatorsData(
        instrumentDetails.instrument,
        instrumentDetails.timeFrame,
        parseToDate(candleDateTime)
      )

      setIndicatorAnalysis({
        params: JSON.stringify(currentParams),
        indicatorAnalysis: newAnalysis
      })
    }

    fetchData()
  }, [candleDateTime, instrumentDetails])

  return indicatorsAnalysis?.indicatorAnalysis ?? null
}
