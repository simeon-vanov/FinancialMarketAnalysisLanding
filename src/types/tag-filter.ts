import { Tag } from './tags'

export type TradingInsightTagGroup =
  | 'CandleVolatility'
  | 'CandleType'
  | 'CandleVolume'
  | 'CandleRecentMovement'
  | 'LastHighTradingActivity'
  | 'LastHighTradingCandle'
  | 'MarketActivity'
  | 'PricePosition'
  | 'CandleChange'
  | 'Resistance'
  | 'Support'
  | 'ZoneImportance'
  | 'SellBuyRatio'
  | 'IndicatorsVolume'
  | 'IndicatorsPattern'
  | 'IndicatorsTrend'
  | 'IndicatorsVolatility'
  | 'IndicatorsMomentum'
  | 'IndicatorsReversal'
  | 'IndicatorsContinuation'
  | 'StructurePattern'
  | 'PriceMoveType'
  | 'PriceMoveVolume'
  | 'PriceMoveVolatility'
  | 'PriceMoveChange'
  | 'StructureStrength'
  | 'CurrentPressure'
  | 'LongTermShift'
  | 'Peak'
  | 'Trending'
  | 'Strength'
  | 'Emerging'
  | 'General'
  | 'Strong'
  | 'HiddenDivergence'
  | 'ContinuationPattern'
  | 'Accelaration'
  | 'Warning'
  | 'Exhaustion'
  | 'Reversal'
  | 'Divergence'

export type TradingInsightFilter = {
  tag: Tag
  group: TradingInsightTagGroup
  uiGroup: string
}

export const tradingInsightTagValues: TradingInsightFilter[] = [
  { tag: 'StructureBullishContinuation', group: 'StructurePattern', uiGroup: 'PriceMoves' },
  { tag: 'StructureBearishContinuation', group: 'StructurePattern', uiGroup: 'PriceMoves' },
  { tag: 'StructureBullishReversal', group: 'StructurePattern', uiGroup: 'PriceMoves' },
  { tag: 'StructureBearishReversal', group: 'StructurePattern', uiGroup: 'PriceMoves' },
  { tag: 'StructureRangeBoundMarketSignal', group: 'StructurePattern', uiGroup: 'PriceMoves' },
  { tag: 'StructureWeakMove', group: 'StructureStrength', uiGroup: 'PriceMoves' },

  { tag: 'ImpulseHigh', group: 'PriceMoveType', uiGroup: 'PriceMoves' },
  { tag: 'CorrectionLow', group: 'PriceMoveType', uiGroup: 'PriceMoves' },
  { tag: 'RetestHigh', group: 'PriceMoveType', uiGroup: 'PriceMoves' },
  { tag: 'FailedHigherHigh', group: 'PriceMoveType', uiGroup: 'PriceMoves' },
  { tag: 'ImpulseLow', group: 'PriceMoveType', uiGroup: 'PriceMoves' },
  { tag: 'CorrectionHigh', group: 'PriceMoveType', uiGroup: 'PriceMoves' },
  { tag: 'RetestLow', group: 'PriceMoveType', uiGroup: 'PriceMoves' },
  { tag: 'FailedLowerLow', group: 'PriceMoveType', uiGroup: 'PriceMoves' },
  { tag: 'ExtendHigh', group: 'PriceMoveType', uiGroup: 'PriceMoves' },
  { tag: 'ExtendLow', group: 'PriceMoveType', uiGroup: 'PriceMoves' },
  { tag: 'IsHighVolumePriceMove', group: 'PriceMoveVolume', uiGroup: 'PriceMoves' },
  { tag: 'IsAverageVolumePriceMove', group: 'PriceMoveVolume', uiGroup: 'PriceMoves' },
  { tag: 'IsLowVolumePriceMove', group: 'PriceMoveVolume', uiGroup: 'PriceMoves' },
  { tag: 'IsHighVolatilityPriceMove', group: 'PriceMoveVolatility', uiGroup: 'PriceMoves' },
  { tag: 'IsAverageVolatilityPriceMove', group: 'PriceMoveVolatility', uiGroup: 'PriceMoves' },
  { tag: 'IsLowVolatilityPriceMove', group: 'PriceMoveVolatility', uiGroup: 'PriceMoves' },
  { tag: 'IsBigSizePriceMove', group: 'PriceMoveChange', uiGroup: 'PriceMoves' },
  { tag: 'IsVeryBigSizePriceMove', group: 'PriceMoveChange', uiGroup: 'PriceMoves' },
  { tag: 'IsAverageSizePriceMove', group: 'PriceMoveChange', uiGroup: 'PriceMoves' },
  { tag: 'IsSmallSizePriceMove', group: 'PriceMoveChange', uiGroup: 'PriceMoves' },
  { tag: 'IsVerySmallSizePriceMove', group: 'PriceMoveChange', uiGroup: 'PriceMoves' },

  { tag: 'IsTrending', group: 'Trending', uiGroup: 'Trend' },
  { tag: 'NonTrendingMarket', group: 'Trending', uiGroup: 'Trend' },
  { tag: 'TrendStrengthWarning', group: 'Strength', uiGroup: 'Trend' },
  { tag: 'TrendStrengthPeak', group: 'Strength', uiGroup: 'Trend' },
  { tag: 'TrendEmerging', group: 'Emerging', uiGroup: 'Trend' },
  { tag: 'EmergingUptrendSignal', group: 'Emerging', uiGroup: 'Trend' },
  { tag: 'EmergingDowntrendSignal', group: 'Emerging', uiGroup: 'Trend' },
  { tag: 'UptrendPeak', group: 'Peak', uiGroup: 'Trend' },
  { tag: 'DowntrendPeak', group: 'Peak', uiGroup: 'Trend' },
  { tag: 'Uptrend', group: 'General', uiGroup: 'Trend' },
  { tag: 'Downtrend', group: 'General', uiGroup: 'Trend' },
  { tag: 'BullishLongTermTrendShift', group: 'LongTermShift', uiGroup: 'Trend' },
  { tag: 'BearishLongTermTrendShift', group: 'LongTermShift', uiGroup: 'Trend' },
  { tag: 'PriceIsAbovePreviousHigh', group: 'StructurePattern', uiGroup: 'Trend' },
  { tag: 'PriceIsBelowPreviousLow', group: 'StructurePattern', uiGroup: 'Trend' },

  { tag: 'VolatilityExpansion', group: 'IndicatorsVolatility', uiGroup: 'Volatility' },
  { tag: 'VolatilityContraction', group: 'IndicatorsVolatility', uiGroup: 'Volatility' },
  { tag: 'HighVolatility', group: 'IndicatorsVolatility', uiGroup: 'Volatility' },
  { tag: 'LowVolatility', group: 'IndicatorsVolatility', uiGroup: 'Volatility' },
  { tag: 'IsVerySmallSizeCandle', group: 'CandleVolatility', uiGroup: 'Volatility' },
  { tag: 'IsLowVolatilityCandle', group: 'CandleVolatility', uiGroup: 'Volatility' },
  { tag: 'IsAverageVolatilityCandle', group: 'CandleVolatility', uiGroup: 'Volatility' },
  { tag: 'IsHighVolatilityCandle', group: 'CandleVolatility', uiGroup: 'Volatility' },
  { tag: 'IsBigSizeCandle', group: 'CandleChange', uiGroup: 'Volatility' },
  { tag: 'IsVeryBigSizeCandle', group: 'CandleChange', uiGroup: 'Volatility' },
  { tag: 'IsAverageSizeCandle', group: 'CandleChange', uiGroup: 'Volatility' },
  { tag: 'IsSmallSizeCandle', group: 'CandleChange', uiGroup: 'Volatility' },

  { tag: 'HighVolumeBullsCouldNotDriveThePriceHigher', group: 'LastHighTradingActivity', uiGroup: 'Volume' },
  { tag: 'HighVolumeBearsCouldNotDriveThePriceLower', group: 'LastHighTradingActivity', uiGroup: 'Volume' },
  { tag: 'HighVolumeBigBearishCandle', group: 'LastHighTradingCandle', uiGroup: 'Volume' },
  { tag: 'HighVolumeBigBullishCandle', group: 'LastHighTradingCandle', uiGroup: 'Volume' },
  { tag: 'HighVolatilityButNotBigSize', group: 'LastHighTradingCandle', uiGroup: 'Volume' },
  { tag: 'IncreasedMarketActivity', group: 'MarketActivity', uiGroup: 'Volume' },
  { tag: 'DecreasedMarketActivity', group: 'MarketActivity', uiGroup: 'Volume' },
  { tag: 'BuyingPressure', group: 'CurrentPressure', uiGroup: 'Volume' },
  { tag: 'SellingPressure', group: 'CurrentPressure', uiGroup: 'Volume' },
  { tag: 'IsHighVolumeCandle', group: 'CandleVolume', uiGroup: 'Volume' },
  { tag: 'IsAverageVolumeCandle', group: 'CandleVolume', uiGroup: 'Volume' },
  { tag: 'IsLowVolumeCandle', group: 'CandleVolume', uiGroup: 'Volume' },

  { tag: 'BullishHiddenDivergence', group: 'HiddenDivergence', uiGroup: 'Momentum' },
  { tag: 'BearishHiddenDivergence', group: 'HiddenDivergence', uiGroup: 'Momentum' },
  { tag: 'BullishMomentum', group: 'General', uiGroup: 'Momentum' },
  { tag: 'BearishMomentum', group: 'General', uiGroup: 'Momentum' },
  { tag: 'StrongBullishMomentum', group: 'Strong', uiGroup: 'Momentum' },
  { tag: 'StrongBearishMomentum', group: 'Strong', uiGroup: 'Momentum' },
  { tag: 'BullishContinuationPattern', group: 'ContinuationPattern', uiGroup: 'Momentum' },
  { tag: 'BearishContinuationPattern', group: 'ContinuationPattern', uiGroup: 'Momentum' },
  { tag: 'BullishTrendAccelaration', group: 'Accelaration', uiGroup: 'Momentum' },
  { tag: 'BearishTrendAccelaration', group: 'Accelaration', uiGroup: 'Momentum' },
  { tag: 'BullishTrendWarning', group: 'Warning', uiGroup: 'Momentum' },
  { tag: 'BearishTrendWarning', group: 'Warning', uiGroup: 'Momentum' },
  { tag: 'IsLastAtrMovementBullish', group: 'CandleRecentMovement', uiGroup: 'Momentum' },
  { tag: 'IsLastAtrMovementBearish', group: 'CandleRecentMovement', uiGroup: 'Momentum' },
  { tag: 'IsBullishCandle', group: 'CandleType', uiGroup: 'Momentum' },
  { tag: 'IsBearishCandle', group: 'CandleType', uiGroup: 'Momentum' },

  { tag: 'InVeryLowImportanceZone', group: 'ZoneImportance', uiGroup: 'PricePosition' },
  { tag: 'InLowImportanceZone', group: 'ZoneImportance', uiGroup: 'PricePosition' },
  { tag: 'InMediumImportanceZone', group: 'ZoneImportance', uiGroup: 'PricePosition' },
  { tag: 'InHighImportanceZone', group: 'ZoneImportance', uiGroup: 'PricePosition' },
  { tag: 'InVeryHighImportanceZone', group: 'ZoneImportance', uiGroup: 'PricePosition' },
  { tag: 'PriceIsAbovePreviousHigh', group: 'PricePosition', uiGroup: 'PricePosition' },
  { tag: 'PriceIsBelowPreviousLow', group: 'PricePosition', uiGroup: 'PricePosition' },
  { tag: 'PriceAboveLastHighTradingActivity', group: 'LastHighTradingActivity', uiGroup: 'PricePosition' },
  { tag: 'PriceBelowLastHighTradingActivity', group: 'LastHighTradingActivity', uiGroup: 'PricePosition' },
  {
    tag: 'PriceReversedToBearishAfterLastHighTradingActivity',
    group: 'LastHighTradingActivity',
    uiGroup: 'PricePosition'
  },
  {
    tag: 'PriceReversedToBullishAfterLastHighTradingActivity',
    group: 'LastHighTradingActivity',
    uiGroup: 'PricePosition'
  },
  {
    tag: 'PriceInRangeOfLastHighTradingActivity',
    group: 'LastHighTradingActivity',
    uiGroup: 'PricePosition'
  },

  //   { tag: 'IsBearishPattern', group: 'IndicatorsPattern', uiGroup: 'Candle' },
  //   { tag: 'IsBullishPattern', group: 'IndicatorsPattern', uiGroup: 'Candle' },
  //   { tag: 'IsIndecisivePattern', group: 'IndicatorsPattern', uiGroup: 'Candle' },

  { tag: 'CloseToResistanceWithVeryLowImportance', group: 'Resistance', uiGroup: 'Resistance' },
  { tag: 'CloseToResistanceWithLowImportance', group: 'Resistance', uiGroup: 'Resistance' },
  { tag: 'CloseToResistanceWithMediumImportance', group: 'Resistance', uiGroup: 'Resistance' },
  { tag: 'CloseToResistanceWithHighImportance', group: 'Resistance', uiGroup: 'Resistance' },
  { tag: 'CloseToResistanceWithVeryHighImportance', group: 'Resistance', uiGroup: 'Resistance' },
  { tag: 'NoHighRelevantResistanceZone', group: 'Resistance', uiGroup: 'Resistance' },
  { tag: 'RatioToResistanceIsBetterThanSupport', group: 'SellBuyRatio', uiGroup: 'Resistance' },

  { tag: 'CloseToSupportWithVeryLowImportance', group: 'Support', uiGroup: 'Support' },
  { tag: 'CloseToSupportWithLowImportance', group: 'Support', uiGroup: 'Support' },
  { tag: 'CloseToSupportWithMediumImportance', group: 'Support', uiGroup: 'Support' },
  { tag: 'CloseToSupportWithHighImportance', group: 'Support', uiGroup: 'Support' },
  { tag: 'CloseToSupportWithVeryHighImportance', group: 'Support', uiGroup: 'Support' },
  { tag: 'NoHighRelevantSupportZone', group: 'Support', uiGroup: 'Support' },
  { tag: 'RatioToSupportIsBetterThanResistance', group: 'SellBuyRatio', uiGroup: 'Support' },

  { tag: 'PotentialBullishReversal', group: 'Reversal', uiGroup: 'Reversal' },
  { tag: 'PotentialBearishReversal', group: 'Reversal', uiGroup: 'Reversal' },
  { tag: 'BullishDivergence', group: 'Divergence', uiGroup: 'Reversal' },
  { tag: 'BearishDivergence', group: 'Divergence', uiGroup: 'Reversal' },
  { tag: 'BearishTrendExhaustionRisk', group: 'Exhaustion', uiGroup: 'Reversal' },
  { tag: 'BullishTrendExhaustionRisk', group: 'Exhaustion', uiGroup: 'Reversal' }
]
