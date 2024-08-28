import { Tag } from 'types/tags'

export const momentumOptions: Tag[] = [
  'BullishTrendAccelaration',
  'BearishTrendAccelaration',
  'BearishMomentum',
  'BullishMomentum',
  'StrongBearishMomentum',
  'StrongBullishMomentum'
]

export const trendOptions: Tag[] = ['Uptrend', 'Downtrend', 'UptrendPeak', 'DowntrendPeak']

export const priceMoveOptions: Tag[] = [
  'ImpulseHigh',
  'CorrectionLow',
  'RetestHigh',
  'FailedHigherHigh',
  'ImpulseLow',
  'CorrectionHigh',
  'RetestLow',
  'FailedLowerLow',
  'ExtendHigh',
  'ExtendLow'
]

export const priceLevelOptions: Tag[] = [
  'CloseToResistanceWithMediumImportance',
  'CloseToResistanceWithHighImportance',
  'CloseToResistanceWithVeryHighImportance',
  'CloseToSupportWithMediumImportance',
  'CloseToSupportWithHighImportance',
  'CloseToSupportWithVeryHighImportance',
  'InMediumImportanceZone',
  'InHighImportanceZone',
  'InVeryHighImportanceZone',
  'RatioToResistanceIsBetterThanSupport',
  'RatioToSupportIsBetterThanResistance'
]
