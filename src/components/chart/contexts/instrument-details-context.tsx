import { Context, Dispatch, SetStateAction, createContext, useContext } from 'react'
import { InstrumentDetails } from '../models'

export type InstrumentDetailsContextTuple = [
  InstrumentDetails | undefined,
  Dispatch<SetStateAction<InstrumentDetails | undefined>>
]

// Types are broken and values don't matter here so we use [] as any
export const InstrumentDetailsContext: Context<InstrumentDetailsContextTuple> = createContext([] as any)

export const useInstrumentDetails = (): InstrumentDetails | undefined => {
  const [instrumentDetails] = useContext(InstrumentDetailsContext)

  return instrumentDetails
}

export const useSetInstrumentDetails = () => {
  const [, setInstrumentDetails] = useContext(InstrumentDetailsContext)

  return setInstrumentDetails
}
