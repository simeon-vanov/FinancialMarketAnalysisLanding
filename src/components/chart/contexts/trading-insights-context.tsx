import { Context, Dispatch, SetStateAction, createContext, useContext } from 'react'
import { GetTradingInsightsResponse } from '../models'

export type TradingInsightsContextType = {
  params: string | null
  tradingInsights: GetTradingInsightsResponse | null
  loading: boolean | null
}

export type TradingInsightsResponseContextTuple = [
  TradingInsightsContextType | null,
  Dispatch<SetStateAction<TradingInsightsContextType | null>>
]

export const TradingInsightsContext: Context<TradingInsightsResponseContextTuple> = createContext([] as any)

export const useTradingInsights = (): TradingInsightsContextType | null => {
  const [tradingInsights] = useContext(TradingInsightsContext)

  return tradingInsights
}

export const useSetTradingInsights = () => {
  const [, setTradingInsights] = useContext(TradingInsightsContext)

  return setTradingInsights
}
