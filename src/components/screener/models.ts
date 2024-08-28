import { Pagination } from 'apis/models'
import { Instrument, RankIndex, TimeFrame } from 'types/options'
import { Tag } from 'types/tags'

export type StrengthMeterDetails = {
  instrument: Instrument
  change: number
}

export type StrengthMeterData = {
  series: number[]
  currencies: string[]
  lastUpdate: string
  details: { currency: string; details: StrengthMeterDetails[] }[]
}

export type VolatilityDetails = {
  instrument: Instrument
  volatilityAverage: number
  volatilityIndex: RankIndex
  volumeAverage: number
  volumeIndex: RankIndex
}

export type VolatilityData = {
  volumes: number[]
  volatilities: number[]
  currencies: string[]
  lastUpdate: string
  details: { currency: string; details: VolatilityDetails[] }[]
}

export interface IScreenerParameters extends Pagination {
  timeFrames: string[]
  instrumentSearchText: string
  momentum: string[]
  trend: string[]
  priceMove: string[]
  priceLevels: string[]
}

export type ScreenerInstrument = {
  instrument: Instrument
  timeFrame: TimeFrame
  momentum: Tag[]
  trend: Tag[]
  priceMove: Tag[]
  priceLevels: Tag[]
}
