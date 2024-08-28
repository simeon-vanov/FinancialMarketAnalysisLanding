import { Context, Dispatch, SetStateAction, createContext, useContext } from 'react'
import { GetPriceZonesDto } from '../models'

export type PriceZonesContextType = {
  params: string | null
  priceZones: GetPriceZonesDto | null
}
export type PriceZonesContextTuple = [
  PriceZonesContextType | null,
  Dispatch<SetStateAction<PriceZonesContextType | null>>
]

// Types are broken and values don't matter here so we use [] as any
export const PriceZonesContext: Context<PriceZonesContextTuple> = createContext({} as any)

export const usePriceZones = (): PriceZonesContextType | null => {
  const [priceZones] = useContext(PriceZonesContext)

  return priceZones
}

export const useSetPriceZones = () => {
  const [, setPriceZones] = useContext(PriceZonesContext)

  return setPriceZones
}
