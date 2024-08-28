import { Instrument, TimeFrame } from 'types/options'
import {
  CandlesResponse,
  CompositeFilter,
  FilterMatchingCandlesResponse,
  GetCurrentMarketMoveResponse,
  GetMarketMovesResponse,
  GetMultiFrameAnalysisResponse,
  GetPriceZonesDto,
  GetTradingInsightsResponse,
  IndicatorInfoResponse,
  IndicatorsCalculation,
  IndicatorsResponse,
  PivotsResponse
} from './models'
import axiosInstance from 'configs/axios'
import { webApiConfig } from 'configs/urls'
import { get } from 'apis/api'
import { convertUnixToLocalTimeUnix } from 'utils/date-utils'

export const fetchCandlesData = async (
  symbol: Instrument,
  timeFrame: TimeFrame,
  to: Date,
  count: number,
  countAfter?: number
): Promise<CandlesResponse> => {
  const params = new URLSearchParams([
    ['timeFrame', timeFrame],
    ['to', to.toISOString()],
    ['count', count.toString()],
    ['symbol', symbol]
  ])

  if (countAfter) {
    params.append('countAfter', countAfter.toString())
  }

  const { data }: { data: CandlesResponse } = await axiosInstance.get(webApiConfig.chartCandles, {
    params: params
  })

  data.candles = data.candles.map((candle) => {
    return {
      ...candle,
      time: convertUnixToLocalTimeUnix(candle.time)
    }
  })

  data.volumes = data.volumes.map((volume) => {
    return {
      ...volume,
      time: convertUnixToLocalTimeUnix(volume.time)
    }
  })

  return data
}

export const fetchIndicatorsData = async (
  symbol: Instrument,
  timeFrame: TimeFrame,
  date: Date
): Promise<IndicatorsResponse> => {
  const params = new URLSearchParams([
    ['timeFrame', timeFrame],
    ['candleDateTime', date.toISOString()],
    ['symbol', symbol]
  ])

  const data = await get<IndicatorsResponse>(webApiConfig.chartIndicators, params)

  return data
}

export const fetchIndicatorInfo = async (id: string, isSignal: boolean): Promise<IndicatorInfoResponse> => {
  const params = new URLSearchParams([['isSignal', isSignal.toString()]])

  const data = await get<IndicatorInfoResponse>(`${webApiConfig.chartIndicatorInfo}/${id}`, params)

  return data
}

export const fetchIndicatorsCalculationData = async (
  symbol: Instrument,
  timeFrame: TimeFrame,
  start: Date,
  end: Date,
  indicatorId: string,
  signalId: string
): Promise<IndicatorsCalculation> => {
  const params = new URLSearchParams([
    ['timeFrame', timeFrame],
    ['start', start.toISOString()],
    ['end', end.toISOString()],
    ['symbol', symbol],
    ['id', indicatorId],
    ['signalId', signalId]
  ])

  const { data }: { data: IndicatorsCalculation } = await axiosInstance.get(
    `${webApiConfig.chartIndicators}/${indicatorId}`,
    {
      params: params
    }
  )

  data.signals = data.signals.map((signal) => convertUnixToLocalTimeUnix(signal))

  return data
}

export const fetchPivotsData = async (
  symbol: Instrument,
  timeFrame: TimeFrame,
  start: Date,
  end: Date
): Promise<PivotsResponse> => {
  const params = new URLSearchParams([
    ['timeFrame', timeFrame],
    ['start', start.toISOString()],
    ['end', end.toISOString()],
    ['symbol', symbol]
  ])

  const { data }: { data: PivotsResponse } = await axiosInstance.get(webApiConfig.chartIndicatorsPivots, {
    params: params
  })

  data.highs = data.highs.map((high) => {
    return {
      ...high,
      time: convertUnixToLocalTimeUnix(high.time)
    }
  })

  data.lows = data.lows.map((low) => {
    return {
      ...low,
      time: convertUnixToLocalTimeUnix(low.time)
    }
  })

  return data
}

export const fetchMarketMovesData = async (
  symbol: Instrument,
  timeFrame: TimeFrame,
  start: Date,
  end: Date
): Promise<GetMarketMovesResponse> => {
  const params = new URLSearchParams([
    ['timeFrame', timeFrame],
    ['start', start.toISOString()],
    ['end', end.toISOString()],
    ['symbol', symbol]
  ])

  const { data }: { data: GetMarketMovesResponse } = await axiosInstance.get(`${webApiConfig.chartPriceMoves}`, {
    params: params
  })

  data.marketMovesTimeOutlook = data.marketMovesTimeOutlook.map((move) => {
    return {
      ...move,
      marketMoves: move.marketMoves.map((marketMove) => {
        return {
          ...marketMove,
          endTime: convertUnixToLocalTimeUnix(marketMove.endTime),
          startTime: convertUnixToLocalTimeUnix(marketMove.startTime),
          calculationTime: convertUnixToLocalTimeUnix(marketMove.calculationTime)
        }
      })
    }
  })

  return data
}

export const fetchCurrentMarketMoveData = async (
  symbol: Instrument,
  timeFrame: TimeFrame,
  candleDateTime: Date
): Promise<GetCurrentMarketMoveResponse> => {
  const params = new URLSearchParams([
    ['timeFrame', timeFrame],
    ['candleDateTime', candleDateTime.toISOString()],
    ['symbol', symbol]
  ])

  const { data }: { data: GetCurrentMarketMoveResponse } = await axiosInstance.get(
    `${webApiConfig.chartCurrentPriceMove}`,
    {
      params: params
    }
  )

  data.marketMovesTimeOutlook = data.marketMovesTimeOutlook.map((move) => {
    return {
      ...move,
      marketMove: {
        ...move.marketMove,
        endTime: convertUnixToLocalTimeUnix(move.marketMove.endTime),
        startTime: convertUnixToLocalTimeUnix(move.marketMove.startTime),
        calculationTime: convertUnixToLocalTimeUnix(move.marketMove.calculationTime)
      }
    }
  })

  return data
}

export const fetchPriceZonesData = async (
  symbol: Instrument,
  timeFrame: TimeFrame,
  candleDateTime: Date
): Promise<GetPriceZonesDto> => {
  const params = new URLSearchParams([
    ['timeFrame', timeFrame],
    ['candleDateTime', candleDateTime.toISOString()],
    ['symbol', symbol]
  ])

  const { data }: { data: GetPriceZonesDto } = await axiosInstance.get(`${webApiConfig.chartAssessment}`, {
    params: params
  })

  data.imbalances = data.imbalances.map((imbalance) => {
    return {
      ...imbalance,
      candleTime: convertUnixToLocalTimeUnix(imbalance.candleTime)
    }
  })

  return data
}

export const fetchInsightsData = async (
  symbol: Instrument,
  timeFrame: TimeFrame,
  candleDateTime: Date
): Promise<GetTradingInsightsResponse> => {
  const params = new URLSearchParams([
    ['timeFrame', timeFrame],
    ['candleDateTime', candleDateTime.toISOString()],
    ['symbol', symbol]
  ])

  const { data }: { data: GetTradingInsightsResponse } = await axiosInstance.get(`${webApiConfig.chartInsights}`, {
    params: params
  })

  data.lastSignificantCandleInsights.candleDateTime = convertUnixToLocalTimeUnix(
    data.lastSignificantCandleInsights.candleDateTime
  )

  return data
}

export const fetchMatchingConditionsData = async (
  symbol: Instrument,
  timeFrame: TimeFrame,
  start: Date,
  end: Date,
  filter: CompositeFilter
): Promise<FilterMatchingCandlesResponse> => {
  const request = {
    filter,
    symbol,
    timeFrame,
    start,
    end
  }
  const { data }: { data: FilterMatchingCandlesResponse } = await axiosInstance.post(
    webApiConfig.chartConditions,
    request,
    {}
  )

  data.matches = data.matches.map((match) => {
    return {
      ...match,
      candleTime: convertUnixToLocalTimeUnix(match.candleTime)
    }
  })

  return data
}

export const fetchMultiFrameAnalysisData = async (
  symbol: Instrument,
  timeFrame: TimeFrame,
  candleDateTime: Date
): Promise<GetMultiFrameAnalysisResponse> => {
  const params = new URLSearchParams([
    ['timeFrame', timeFrame],
    ['candleDateTime', candleDateTime.toISOString()],
    ['symbol', symbol]
  ])

  const { data }: { data: GetMultiFrameAnalysisResponse } = await axiosInstance.get(
    webApiConfig.chartMultiFrameAnalysis,
    {
      params: params
    }
  )

  data.timeFramesAnalysis = data.timeFramesAnalysis.map((analysis) => {
    return {
      ...analysis,
      resistance: { ...analysis.resistance, dateTime: convertUnixToLocalTimeUnix(analysis.resistance.dateTime) },
      support: { ...analysis.support, dateTime: convertUnixToLocalTimeUnix(analysis.support.dateTime) }
    }
  })

  return data
}
