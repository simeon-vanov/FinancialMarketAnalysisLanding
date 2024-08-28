import { Context, Dispatch, SetStateAction, createContext, useContext } from 'react'
import { IndicatorsResponse } from '../models'

export type IndicatorAnalysisContextType = {
  params: string | null
  indicatorAnalysis: IndicatorsResponse | null
}

export type IndicatorAnalysisContextTuple = [
  IndicatorAnalysisContextType | null,
  Dispatch<SetStateAction<IndicatorAnalysisContextType | null>>
]

// Types are broken and values don't matter here so we use [] as any
export const IndicatorAnalysisContext: Context<IndicatorAnalysisContextTuple> = createContext([] as any)

export const useIndicatorsAnalysis = (): IndicatorAnalysisContextType | null => {
  const [indicatorAnalysis] = useContext(IndicatorAnalysisContext)

  return indicatorAnalysis
}

export const useSetIndicatorsAnalysis = () => {
  const [, setIndicatorAnalysis] = useContext(IndicatorAnalysisContext)

  return setIndicatorAnalysis
}
