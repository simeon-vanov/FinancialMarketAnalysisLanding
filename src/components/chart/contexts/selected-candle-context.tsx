import { Context, Dispatch, SetStateAction, createContext, useContext } from 'react'

export type SelectedCandleContextTuple = [number | null, Dispatch<SetStateAction<number | null>>]

// Types are broken and values don't matter here so we use [] as any
export const SelectedCandleContext: Context<SelectedCandleContextTuple> = createContext({} as any)

export const useSelectedCandle = (): number | null => {
  const [selectedCandle] = useContext(SelectedCandleContext)

  return selectedCandle
}

export const useSetSelectedCandle = () => {
  const [, setSelectedCandle] = useContext(SelectedCandleContext)

  return setSelectedCandle
}
