import { SeverityPillColor } from 'components/common/severity-pill'

export type TechnicalIndicatorTag =
  | 'ExhaustionBulls'
  | 'ExhaustionBears'
  | 'BullishPressure'
  | 'BearishPressure'
  | 'Indecisive'
  | 'IsTrending'
  | 'PotentialBullishReversal'
  | 'PotentialBearishReversal'
  | 'NonTrendingMarket'
  | 'TrendStrengthWarning'
  | 'TrendEmerging'
  | 'EmergingUptrendSignal'
  | 'EmergingDowntrendSignal'
  | 'TrendStrengthPeak'
  | 'UptrendPeak'
  | 'DowntrendPeak'
  | 'BullishDivergence'
  | 'BearishDivergence'
  | 'BullishHiddenDivergence'
  | 'BearishHiddenDivergence'
  | 'BullishMomentum'
  | 'BearishMomentum'
  | 'StrongBullishMomentum'
  | 'StrongBearishMomentum'
  | 'BullishContinuationPattern'
  | 'BearishContinuationPattern'
  | 'VolatilityExpansion'
  | 'VolatilityContraction'
  | 'IncreasedMarketActivity'
  | 'DecreasedMarketActivity'
  | 'HighVolatility'
  | 'LowVolatility'
  | 'BullishLongTermTrendShift'
  | 'BearishLongTermTrendShift'
  | 'BullishTrendAccelaration'
  | 'BearishTrendAccelaration'
  | 'BullishTrendWarning'
  | 'BearishTrendWarning'
  | 'Uptrend'
  | 'Downtrend'
  | 'BuyingPressure'
  | 'SellingPressure'
  | 'BullishTrendExhaustionRisk'
  | 'BearishTrendExhaustionRisk'

export type MarketDynamicsTag =
  | 'VolatilityExpansion'
  | 'Trending'
  | 'VolatilityContraction'
  | 'ChoppyMarket'
  | 'RangingMarket'
  | 'HighVolatility'
  | 'LowVolatility'

export type TagDetails = {
  tag: Tag
  color: SeverityPillColor
  info: string
  text?: string
  direction: 'Bullish' | 'Bearish' | 'Neutral' | 'Expansion' | 'Contraction'
}

export type StructureTags =
  | 'StructureBullishContinuation'
  | 'StructureBearishContinuation'
  | 'StructureBullishReversal'
  | 'StructureBearishReversal'
  | 'StructureRangeBoundMarketSignal'
  | 'StructureWeakMove'
  | 'ImpulseHigh'
  | 'CorrectionLow'
  | 'RetestHigh'
  | 'FailedHigherHigh'
  | 'ImpulseLow'
  | 'CorrectionHigh'
  | 'RetestLow'
  | 'FailedLowerLow'
  | 'ExtendHigh'
  | 'ExtendLow'
  | 'IsHighVolumePriceMove'
  | 'IsAverageVolumePriceMove'
  | 'IsLowVolumePriceMove'
  | 'IsHighVolatilityPriceMove'
  | 'IsAverageVolatilityPriceMove'
  | 'IsLowVolatilityPriceMove'
  | 'IsBigSizePriceMove'
  | 'IsVeryBigSizePriceMove'
  | 'IsAverageSizePriceMove'
  | 'IsSmallSizePriceMove'
  | 'IsVerySmallSizePriceMove'

export type LastSignificantCandleTags =
  | 'HighVolumeBullsCouldNotDriveThePriceHigher'
  | 'HighVolumeBearsCouldNotDriveThePriceLower'
  | 'HighVolumeBigBearishCandle'
  | 'HighVolumeBigBullishCandle'
  | 'HighVolatilityButNotBigSize'
  | 'PriceReversedToBullishAfterLastHighTradingActivity'
  | 'PriceReversedToBearishAfterLastHighTradingActivity'
  | 'PriceAboveLastHighTradingActivity'
  | 'PriceBelowLastHighTradingActivity'
  | 'IndecisionAfterHighVolume'
  | 'PriceInRangeOfLastHighTradingActivity'

export type PriceLevelTags =
  | 'InVeryLowImportanceZone'
  | 'InLowImportanceZone'
  | 'InMediumImportanceZone'
  | 'InHighImportanceZone'
  | 'InVeryHighImportanceZone'
  | 'CloseToResistanceWithVeryLowImportance'
  | 'CloseToResistanceWithLowImportance'
  | 'CloseToResistanceWithMediumImportance'
  | 'CloseToResistanceWithHighImportance'
  | 'CloseToResistanceWithVeryHighImportance'
  | 'CloseToSupportWithVeryLowImportance'
  | 'CloseToSupportWithLowImportance'
  | 'CloseToSupportWithMediumImportance'
  | 'CloseToSupportWithHighImportance'
  | 'CloseToSupportWithVeryHighImportance'
  | 'NoHighRelevantSupportZone'
  | 'NoHighRelevantResistanceZone'
  | 'RatioToResistanceIsBetterThanSupport'
  | 'RatioToSupportIsBetterThanResistance'

export type CandleAnalysisTags =
  | 'PriceIsAbovePreviousHigh'
  | 'PriceIsBelowPreviousLow'
  | 'IsHighVolumeCandle'
  | 'IsAverageVolumeCandle'
  | 'IsLowVolumeCandle'
  | 'IsHighVolatilityCandle'
  | 'IsAverageVolatilityCandle'
  | 'IsLowVolatilityCandle'
  | 'IsBearishPattern'
  | 'IsBullishPattern'
  | 'IsIndecisivePattern'
  | 'IsBigSizeCandle'
  | 'IsVeryBigSizeCandle'
  | 'IsAverageSizeCandle'
  | 'IsSmallSizeCandle'
  | 'IsVerySmallSizeCandle'
  | 'IsBullishCandle'
  | 'IsBearishCandle'
  | 'IsLastAtrMovementBullish'
  | 'IsLastAtrMovementBearish'

export type MarketStatusTag = 'Bullish' | 'Bearish' | 'Consolidating'

export type Tag =
  | MarketDynamicsTag
  | TechnicalIndicatorTag
  | MarketStatusTag
  | StructureTags
  | LastSignificantCandleTags
  | PriceLevelTags
  | CandleAnalysisTags

export const tagMap: Map<Tag, TagDetails> = new Map([
  [
    'StructureBullishContinuation',
    {
      tag: 'StructureBullishContinuation',
      color: 'primary',
      info: 'Market structure suggests a bullish continuation pattern.',
      text: 'Structure Bullish Continuation',
      direction: 'Bullish'
    }
  ],
  [
    'ImpulseHigh',
    {
      tag: 'ImpulseHigh',
      color: 'success',
      info: 'The price has made a strong upward move.',
      text: 'Impulse High',
      direction: 'Bullish'
    }
  ],
  [
    'CorrectionLow',
    {
      tag: 'CorrectionLow',
      color: 'error',
      info: 'The price has made a downward correction.',
      text: 'Correction Low',
      direction: 'Bearish'
    }
  ],
  [
    'RetestHigh',
    {
      tag: 'RetestHigh',
      color: 'success',
      info: 'The price is retesting a previous high level.',
      text: 'Retest High',
      direction: 'Neutral'
    }
  ],
  [
    'FailedHigherHigh',
    {
      tag: 'FailedHigherHigh',
      color: 'success',
      info: 'The price attempted to make a higher high but failed.',
      text: 'Failed Higher High',
      direction: 'Bearish'
    }
  ],
  [
    'ImpulseLow',
    {
      tag: 'ImpulseLow',
      color: 'error',
      info: 'The price has made a strong downward move.',
      text: 'Impulse Low',
      direction: 'Bearish'
    }
  ],
  [
    'CorrectionHigh',
    {
      tag: 'CorrectionHigh',
      color: 'success',
      info: 'The price has made an upward correction.',
      text: 'Correction High',
      direction: 'Bullish'
    }
  ],
  [
    'RetestLow',
    {
      tag: 'RetestLow',
      color: 'error',
      info: 'The price is retesting a previous low level.',
      text: 'Retest Low',
      direction: 'Neutral'
    }
  ],
  [
    'FailedLowerLow',
    {
      tag: 'FailedLowerLow',
      color: 'error',
      info: 'The price attempted to make a lower low but failed.',
      text: 'Failed Lower Low',
      direction: 'Bullish'
    }
  ],
  [
    'ExtendHigh',
    {
      tag: 'ExtendHigh',
      color: 'success',
      info: 'The price is extending to new high levels.',
      text: 'Extend High',
      direction: 'Bullish'
    }
  ],
  [
    'ExtendLow',
    {
      tag: 'ExtendLow',
      color: 'error',
      info: 'The price is extending to new low levels.',
      text: 'Extend Low',
      direction: 'Bearish'
    }
  ],
  [
    'IsHighVolumePriceMove',
    {
      tag: 'IsHighVolumePriceMove',
      color: 'primary',
      info: 'The price move has high volume.',
      text: 'High Volume Price Move',
      direction: 'Neutral'
    }
  ],
  [
    'IsAverageVolumePriceMove',
    {
      tag: 'IsAverageVolumePriceMove',
      color: 'primary',
      info: 'The price move has average volume.',
      text: 'Average Volume Price Move',
      direction: 'Neutral'
    }
  ],
  [
    'IsLowVolumePriceMove',
    {
      tag: 'IsLowVolumePriceMove',
      color: 'primary',
      info: 'The price move has low volume.',
      text: 'Low Volume Price Move',
      direction: 'Neutral'
    }
  ],
  [
    'IsHighVolatilityPriceMove',
    {
      tag: 'IsHighVolatilityPriceMove',
      color: 'primary',
      info: 'The price move has high volatility.',
      text: 'High Volatility Price Move',
      direction: 'Neutral'
    }
  ],
  [
    'IsAverageVolatilityPriceMove',
    {
      tag: 'IsAverageVolatilityPriceMove',
      color: 'primary',
      info: 'The price move has average volatility.',
      text: 'Average Volatility Price Move',
      direction: 'Neutral'
    }
  ],
  [
    'IsLowVolatilityPriceMove',
    {
      tag: 'IsLowVolatilityPriceMove',
      color: 'primary',
      info: 'The price move has low volatility.',
      text: 'Low Volatility Price Move',
      direction: 'Neutral'
    }
  ],
  [
    'IsBigSizePriceMove',
    {
      tag: 'IsBigSizePriceMove',
      color: 'primary',
      info: 'The price move has a big size.',
      text: 'Big Size Price Move',
      direction: 'Neutral'
    }
  ],
  [
    'IsVeryBigSizePriceMove',
    {
      tag: 'IsVeryBigSizePriceMove',
      color: 'primary',
      info: 'The price move has a very big size.',
      text: 'Very Big Size Price Move',
      direction: 'Neutral'
    }
  ],
  [
    'IsAverageSizePriceMove',
    {
      tag: 'IsAverageSizePriceMove',
      color: 'primary',
      info: 'The price move has an average size.',
      text: 'Average Size Price Move',
      direction: 'Neutral'
    }
  ],
  [
    'IsSmallSizePriceMove',
    {
      tag: 'IsSmallSizePriceMove',
      color: 'primary',
      info: 'The price move has a small size.',
      text: 'Small Size Price Move',
      direction: 'Neutral'
    }
  ],
  [
    'IsVerySmallSizePriceMove',
    {
      tag: 'IsVerySmallSizePriceMove',
      color: 'primary',
      info: 'The price move has a very small size.',
      text: 'Very Small Size Price Move',
      direction: 'Neutral'
    }
  ],
  [
    'StructureBullishReversal',
    {
      tag: 'StructureBullishReversal',
      color: 'success',
      info: 'Market structure suggests bulls might be getting control.',
      text: 'Structure Bullish Reversal',
      direction: 'Bullish'
    }
  ],
  [
    'StructureBearishReversal',
    {
      tag: 'StructureBearishReversal',
      color: 'error',
      info: 'Market structure suggests bears might be getting control.',
      text: 'Structure Bearish Reversal',
      direction: 'Bearish'
    }
  ],
  [
    'StructureRangeBoundMarketSignal',
    {
      tag: 'StructureRangeBoundMarketSignal',
      color: 'primary',
      info: 'Market structure suggests a range-bound market signal.',
      text: 'Structure Range Bound Market Signal',
      direction: 'Neutral'
    }
  ],
  [
    'StructureWeakMove',
    {
      tag: 'StructureWeakMove',
      color: 'primary',
      info: 'Market structure suggests a weak move.',
      text: 'Structure Weak Move',
      direction: 'Neutral'
    }
  ],
  [
    'IsTrending',
    {
      tag: 'IsTrending',
      color: 'primary',
      info: 'The market is trending.',
      text: 'Trending Market',
      direction: 'Neutral'
    }
  ],
  [
    'PriceIsAbovePreviousHigh',
    {
      tag: 'PriceIsAbovePreviousHigh',
      color: 'primary',
      info: 'The price is above the previous high.',
      text: 'Price is above previous high',
      direction: 'Bullish'
    }
  ],
  [
    'PriceIsBelowPreviousLow',
    {
      tag: 'PriceIsBelowPreviousLow',
      color: 'primary',
      info: 'The price is below the previous low.',
      text: 'Price is below previous low',
      direction: 'Bearish'
    }
  ],
  [
    'IsVerySmallSizeCandle',
    {
      tag: 'IsVerySmallSizeCandle',
      color: 'primary',
      info: 'The candle size is very small.',
      text: 'Very Small Size Candle',
      direction: 'Neutral'
    }
  ],
  [
    'IsLowVolatilityCandle',
    {
      tag: 'IsLowVolatilityCandle',
      color: 'primary',
      info: 'The candle has low volatility.',
      text: 'Low Volatility Candle',
      direction: 'Neutral'
    }
  ],
  [
    'IsAverageVolatilityCandle',
    {
      tag: 'IsAverageVolatilityCandle',
      color: 'primary',
      info: 'The candle has average volatility.',
      text: 'Average Volatility Candle',
      direction: 'Neutral'
    }
  ],
  [
    'IsHighVolatilityCandle',
    {
      tag: 'IsHighVolatilityCandle',
      color: 'primary',
      info: 'The candle has high volatility.',
      text: 'High Volatility Candle',
      direction: 'Neutral'
    }
  ],
  [
    'IsBigSizeCandle',
    {
      tag: 'IsBigSizeCandle',
      color: 'primary',
      info: 'The candle size is big.',
      text: 'Big Size Candle',
      direction: 'Neutral'
    }
  ],
  [
    'IsVeryBigSizeCandle',
    {
      tag: 'IsVeryBigSizeCandle',
      color: 'primary',
      info: 'The candle size is very big.',
      text: 'Very Big Size Candle',
      direction: 'Neutral'
    }
  ],
  [
    'IsAverageSizeCandle',
    {
      tag: 'IsAverageSizeCandle',
      color: 'primary',
      info: 'The candle size is average.',
      text: 'Average Size Candle',
      direction: 'Neutral'
    }
  ],
  [
    'IsSmallSizeCandle',
    {
      tag: 'IsSmallSizeCandle',
      color: 'primary',
      info: 'The candle size is small.',
      text: 'Small Size Candle',
      direction: 'Neutral'
    }
  ],
  [
    'HighVolumeBullsCouldNotDriveThePriceHigher',
    {
      tag: 'HighVolumeBullsCouldNotDriveThePriceHigher',
      color: 'primary',
      info: 'High volume of bulls could not drive the price higher.',
      text: 'High Volume Bulls Could Not Drive The Price Higher',
      direction: 'Bearish'
    }
  ],
  [
    'HighVolumeBearsCouldNotDriveThePriceLower',
    {
      tag: 'HighVolumeBearsCouldNotDriveThePriceLower',
      color: 'primary',
      info: 'High volume of bears could not drive the price lower.',
      text: 'High Volume Bears Could Not Drive The Price Lower',
      direction: 'Bullish'
    }
  ],
  [
    'HighVolumeBigBearishCandle',
    {
      tag: 'HighVolumeBigBearishCandle',
      color: 'primary',
      info: 'High volume with a big bearish candle.',
      text: 'High Volume Big Bearish Candle',
      direction: 'Bearish'
    }
  ],
  [
    'HighVolumeBigBullishCandle',
    {
      tag: 'HighVolumeBigBullishCandle',
      color: 'primary',
      info: 'High volume with a big bullish candle.',
      text: 'High Volume Big Bullish Candle',
      direction: 'Bullish'
    }
  ],
  [
    'HighVolatilityButNotBigSize',
    {
      tag: 'HighVolatilityButNotBigSize',
      color: 'primary',
      info: 'High volatility but not big size.',
      text: 'High Volatility But Not Big Size',
      direction: 'Neutral'
    }
  ],
  [
    'IsHighVolumeCandle',
    {
      tag: 'IsHighVolumeCandle',
      color: 'primary',
      info: 'The candle has high volume.',
      text: 'High Volume Candle',
      direction: 'Neutral'
    }
  ],
  [
    'IsAverageVolumeCandle',
    {
      tag: 'IsAverageVolumeCandle',
      color: 'primary',
      info: 'The candle has average volume.',
      text: 'Average Volume Candle',
      direction: 'Neutral'
    }
  ],
  [
    'IsLowVolumeCandle',
    {
      tag: 'IsLowVolumeCandle',
      color: 'primary',
      info: 'The candle has low volume.',
      text: 'Low Volume Candle',
      direction: 'Neutral'
    }
  ],
  [
    'StructureBearishContinuation',
    {
      tag: 'StructureBearishContinuation',
      color: 'error',
      info: 'Market structure suggests a bearish continuation pattern.',
      text: 'Structure Bearish Continuation',
      direction: 'Bearish'
    }
  ],
  [
    'VolatilityExpansion',
    {
      tag: 'VolatilityExpansion',
      color: 'primary',
      info: 'Volatility is expanding, this might be a sign for a trading opportunity.',
      text: 'Volatility Expansion',
      direction: 'Expansion'
    }
  ],
  [
    'Trending',
    { tag: 'Trending', color: 'primary', info: 'Market is trending.', text: 'Trending', direction: 'Neutral' }
  ],
  [
    'VolatilityContraction',
    {
      tag: 'VolatilityContraction',
      color: 'warning',
      info: 'Volatility is contracting, this might be a sign of market starting consolidating.',
      text: 'Volatility Contraction',
      direction: 'Contraction'
    }
  ],
  [
    'ChoppyMarket',
    { tag: 'ChoppyMarket', color: 'primary', info: 'No clear direction.', text: 'Choppy Market', direction: 'Neutral' }
  ],
  [
    'RangingMarket',
    {
      tag: 'RangingMarket',
      color: 'primary',
      info: 'Clear upper and lower boundary.',
      text: 'Ranging Market',
      direction: 'Neutral'
    }
  ],
  [
    'ExhaustionBears',
    {
      tag: 'ExhaustionBears',
      color: 'success',
      info: 'An indicator showing a bullish divergence signals the price might rise.',
      text: 'Divergence Bullish',
      direction: 'Bullish'
    }
  ],
  [
    'ExhaustionBulls',
    {
      tag: 'ExhaustionBulls',
      color: 'error',
      info: 'An indicator showing a bearish divergence signals the price might fall.',
      text: 'Divergence Bearish',
      direction: 'Bearish'
    }
  ],
  [
    'BullishPressure',
    {
      tag: 'BullishPressure',
      color: 'success',
      info: 'A candle formation signs bulls are in control.',
      text: 'Bullish Candle Pattern',
      direction: 'Bullish'
    }
  ],
  [
    'BearishPressure',
    {
      tag: 'BearishPressure',
      color: 'error',
      info: 'A candle formation signs bears are in control.',
      text: 'Bearish Candle Pattern',
      direction: 'Bearish'
    }
  ],
  [
    'Indecisive',
    {
      tag: 'Indecisive',
      color: 'primary',
      info: 'No clear decision whether bulls or bears are in control.',
      text: 'Indecisive Candle Pattern',
      direction: 'Neutral'
    }
  ],
  [
    'PotentialBullishReversal',
    {
      tag: 'PotentialBullishReversal',
      color: 'success',
      info: 'The price might  .',
      text: 'Potential Bullish Reversal',
      direction: 'Bullish'
    }
  ],
  [
    'PotentialBearishReversal',
    {
      tag: 'PotentialBearishReversal',
      color: 'error',
      info: 'A candle formation signs bears are in control.',
      text: 'Potential Bearish Reversal',
      direction: 'Bearish'
    }
  ],
  [
    'Bullish',
    { tag: 'Bullish', color: 'success', info: 'Market is making higher highs.', text: 'Bullish', direction: 'Bullish' }
  ],
  [
    'Bearish',
    { tag: 'Bearish', color: 'error', info: 'Market is making lower lows.', text: 'Bearish', direction: 'Bearish' }
  ],
  [
    'Consolidating',
    {
      tag: 'Consolidating',
      color: 'primary',
      info: 'The market is not making highs or lows.',
      text: 'Consolidating',
      direction: 'Neutral'
    }
  ],
  [
    'NonTrendingMarket',
    {
      tag: 'NonTrendingMarket',
      color: 'primary',
      info: 'The market trend is weak.',
      text: 'Weak Trend',
      direction: 'Neutral'
    }
  ],
  [
    'TrendStrengthWarning',
    {
      tag: 'TrendStrengthWarning',
      color: 'warning',
      info: 'The market trend might be losing strength.',
      text: 'Trend Strength Weakening',
      direction: 'Neutral'
    }
  ],
  [
    'TrendEmerging',
    {
      tag: 'TrendEmerging',
      color: 'primary',
      info: 'A market trend is emerging.',
      text: 'Trend Emerging',
      direction: 'Neutral'
    }
  ],
  [
    'BullishHiddenDivergence',
    {
      tag: 'BullishHiddenDivergence',
      color: 'success',
      info: 'A hidden bullish divergence indicates potential upward price movement.',
      text: 'Bullish Hidden Divergence',
      direction: 'Bullish'
    }
  ],
  [
    'BearishHiddenDivergence',
    {
      tag: 'BearishHiddenDivergence',
      color: 'error',
      info: 'A hidden bearish divergence indicates potential downward price movement.',
      text: 'Bearish Hidden Divergence',
      direction: 'Bearish'
    }
  ],
  [
    'BearishMomentum',
    {
      tag: 'BearishMomentum',
      color: 'error',
      info: 'Indicates strong downward price movement.',
      text: 'Bearish Momentum',
      direction: 'Bearish'
    }
  ],
  [
    'BullishMomentum',
    {
      tag: 'BullishMomentum',
      color: 'success',
      info: 'Indicates strong upward price movement.',
      text: 'Bullish Momentum',
      direction: 'Bullish'
    }
  ],
  [
    'StrongBullishMomentum',
    {
      tag: 'StrongBullishMomentum',
      color: 'success',
      info: 'Indicates very strong upward price movement.',
      text: 'Strong Bullish Momentum',
      direction: 'Bullish'
    }
  ],
  [
    'StrongBearishMomentum',
    {
      tag: 'StrongBearishMomentum',
      color: 'error',
      info: 'Indicates very strong downward price movement.',
      text: 'Strong Bearish Momentum',
      direction: 'Bearish'
    }
  ],
  [
    'BearishContinuationPattern',
    {
      tag: 'BearishContinuationPattern',
      color: 'error',
      info: 'A bearish continuation pattern suggests that the downward trend is likely to continue.',
      text: 'Bearish Continuation Pattern',
      direction: 'Bearish'
    }
  ],
  [
    'BullishContinuationPattern',
    {
      tag: 'BullishContinuationPattern',
      color: 'success',
      info: 'A bullish continuation pattern suggests that the upward trend is likely to continue.',
      text: 'Bullish Continuation Pattern',
      direction: 'Bullish'
    }
  ],
  [
    'BullishDivergence',
    {
      tag: 'BullishDivergence',
      color: 'success',
      info: 'A bullish divergence indicates potential upward price movement.',
      text: 'Bullish Divergence',
      direction: 'Bullish'
    }
  ],
  [
    'BearishDivergence',
    {
      tag: 'BearishDivergence',
      color: 'error',
      info: 'A bearish divergence indicates potential downward price movement.',
      text: 'Bearish Divergence',
      direction: 'Bearish'
    }
  ],
  [
    'IncreasedMarketActivity',
    {
      tag: 'IncreasedMarketActivity',
      color: 'primary',
      info: 'Suggest that activity in the market increased and a bigger move might be expected.',
      text: 'Increased Market Activity',
      direction: 'Neutral'
    }
  ],
  [
    'DecreasedMarketActivity',
    {
      tag: 'DecreasedMarketActivity',
      color: 'warning',
      info: 'Suggest that activity in the market decreased.',
      text: 'Decreased Market Activity',
      direction: 'Neutral'
    }
  ],
  [
    'BuyingPressure',
    {
      tag: 'BuyingPressure',
      color: 'success',
      info: 'Suggest that buying activity in the market increased.',
      text: 'Buying Pressure',
      direction: 'Bullish'
    }
  ],
  [
    'SellingPressure',
    {
      tag: 'SellingPressure',
      color: 'error',
      info: 'Suggest that selling activity in the market decreased.',
      text: 'Selling Pressure',
      direction: 'Bearish'
    }
  ],
  [
    'HighVolatility',
    {
      tag: 'HighVolatility',
      color: 'primary',
      info: 'Higher volatility in the market detected.',
      text: 'High Volatility',
      direction: 'Expansion'
    }
  ],
  [
    'LowVolatility',
    {
      tag: 'LowVolatility',
      color: 'warning',
      info: 'Lower volatility in the market detected.',
      text: 'Low Volatility',
      direction: 'Contraction'
    }
  ],
  [
    'Uptrend',
    {
      tag: 'Uptrend',
      color: 'success',
      info: 'The market is an uptrend.',
      text: 'Uptrend',
      direction: 'Bullish'
    }
  ],
  [
    'Downtrend',
    {
      tag: 'Downtrend',
      color: 'error',
      info: 'The market is an downtrend.',
      text: 'Downtrend',
      direction: 'Bearish'
    }
  ],
  [
    'EmergingUptrendSignal',
    {
      tag: 'EmergingUptrendSignal',
      color: 'success',
      info: 'The market is an uptrend.',
      text: 'An uptrend is emerging',
      direction: 'Bullish'
    }
  ],
  [
    'EmergingDowntrendSignal',
    {
      tag: 'EmergingDowntrendSignal',
      color: 'error',
      info: 'A downtrend is emerging.',
      text: 'A downtrend is emerging.',
      direction: 'Bearish'
    }
  ],
  [
    'TrendStrengthPeak',
    {
      tag: 'TrendStrengthPeak',
      color: 'primary',
      info: 'Trend is strong but possibly reaching its peak.',
      text: 'Trend is reaching peak',
      direction: 'Neutral'
    }
  ],
  [
    'UptrendPeak',
    {
      tag: 'UptrendPeak',
      color: 'success',
      info: 'Uptrend is possibly reaching its peak.',
      text: 'Uptrend is reaching peak',
      direction: 'Neutral'
    }
  ],
  [
    'DowntrendPeak',
    {
      tag: 'DowntrendPeak',
      color: 'success',
      info: 'Downtred is possibly reaching a bottom.',
      text: 'Downtred is reaching bottom',
      direction: 'Neutral'
    }
  ],
  [
    'BullishLongTermTrendShift',
    {
      tag: 'BullishLongTermTrendShift',
      color: 'success',
      info: 'The market looks bullish in the long term.',
      text: 'Shift to bullish trend',
      direction: 'Bullish'
    }
  ],
  [
    'BearishLongTermTrendShift',
    {
      tag: 'BearishLongTermTrendShift',
      color: 'error',
      info: 'The market looks bearish in the long term.',
      text: 'Shift to bearish trend',
      direction: 'Bearish'
    }
  ],
  [
    'BullishTrendAccelaration',
    {
      tag: 'BullishTrendAccelaration',
      color: 'success',
      info: 'The market is in bullish momentum and accelerating.',
      text: 'Bullish Trend Accelerating',
      direction: 'Bullish'
    }
  ],
  [
    'BearishTrendAccelaration',
    {
      tag: 'BearishTrendAccelaration',
      color: 'error',
      info: 'The market is in bearish momentum and accelerating.',
      text: 'Bearish Trend Accelerating',
      direction: 'Bearish'
    }
  ],
  [
    'BullishTrendWarning',
    {
      tag: 'BullishTrendWarning',
      color: 'success',
      info: 'A warning that the market might be turning bullish soon.',
      text: 'Bullish Trend Warning',
      direction: 'Bullish'
    }
  ],
  [
    'BearishTrendWarning',
    {
      tag: 'BearishTrendWarning',
      color: 'error',
      info: 'A warning that the market might be turning bearish soon.',
      text: 'Bearish Trend Warning',
      direction: 'Bearish'
    }
  ],
  [
    'BullishTrendExhaustionRisk',
    {
      tag: 'BullishTrendExhaustionRisk',
      color: 'warning',
      info: 'A warning that the bullish trend might be exhausted.',
      text: 'Bullish Trend Exhaustion Risk',
      direction: 'Bearish'
    }
  ],
  [
    'BearishTrendExhaustionRisk',
    {
      tag: 'BearishTrendExhaustionRisk',
      color: 'warning',
      info: 'A warning that the bearish trend might be exhausted.',
      text: 'Bearish Trend Exhaustion Risk',
      direction: 'Bullish'
    }
  ],
  [
    'IsLastAtrMovementBearish',
    {
      tag: 'IsLastAtrMovementBearish',
      color: 'error',
      info: 'The last ATR movement is bearish.',
      text: 'Last ATR Movement is Bearish',
      direction: 'Bearish'
    }
  ],
  [
    'IsLastAtrMovementBullish',
    {
      tag: 'IsLastAtrMovementBullish',
      color: 'success',
      info: 'The last ATR movement is bullish.',
      text: 'Last ATR Movement is Bullish',
      direction: 'Bullish'
    }
  ],
  [
    'PriceReversedToBearishAfterLastHighTradingActivity',
    {
      tag: 'PriceReversedToBearishAfterLastHighTradingActivity',
      color: 'error',
      info: 'After last high bullish trading activity price has declined.',
      text: 'Price below last high bullish trading activity',
      direction: 'Bearish'
    }
  ],
  [
    'PriceReversedToBullishAfterLastHighTradingActivity',
    {
      tag: 'PriceReversedToBullishAfterLastHighTradingActivity',
      color: 'success',
      info: 'After last high bearish trading activity price has rised.',
      text: 'Price above last high bearish trading activity',
      direction: 'Bullish'
    }
  ],
  [
    'PriceInRangeOfLastHighTradingActivity',
    {
      tag: 'PriceInRangeOfLastHighTradingActivity',
      color: 'primary',
      info: 'After the last high trading the price is indecisive.',
      text: 'Price in range of last high trading activity',
      direction: 'Neutral'
    }
  ],
  [
    'IsBullishCandle',
    {
      tag: 'IsBullishCandle',
      color: 'success',
      info: 'Candle is bullish',
      text: 'Bullish Candle',
      direction: 'Bullish'
    }
  ],
  [
    'IsBearishCandle',
    {
      tag: 'IsBearishCandle',
      color: 'error',
      info: 'Candle is bearish',
      text: 'Bearish Candle',
      direction: 'Bearish'
    }
  ],
  [
    'RatioToSupportIsBetterThanResistance',
    {
      tag: 'RatioToSupportIsBetterThanResistance',
      color: 'error',
      info: 'The price has longer distance to resistance than to support',
      text: 'Next support is further away than resistance',
      direction: 'Bearish'
    }
  ],
  [
    'RatioToResistanceIsBetterThanSupport',
    {
      tag: 'RatioToResistanceIsBetterThanSupport',
      color: 'success',
      info: 'The price has longer distance to resistance than to support',
      text: 'Next resistance is further away than support',
      direction: 'Bullish'
    }
  ],
  [
    'InVeryLowImportanceZone',
    {
      tag: 'InVeryLowImportanceZone',
      color: 'primary',
      info: 'The price is in a very low importance zone.',
      text: 'In Very Low Importance Zone',
      direction: 'Neutral'
    }
  ],
  [
    'InLowImportanceZone',
    {
      tag: 'InLowImportanceZone',
      color: 'primary',
      info: 'The price is in a low importance zone.',
      text: 'In Low Importance Zone',
      direction: 'Neutral'
    }
  ],
  [
    'InMediumImportanceZone',
    {
      tag: 'InMediumImportanceZone',
      color: 'primary',
      info: 'The price is in a medium importance zone.',
      text: 'In Medium Importance Zone',
      direction: 'Neutral'
    }
  ],
  [
    'InHighImportanceZone',
    {
      tag: 'InHighImportanceZone',
      color: 'primary',
      info: 'The price is in a high importance zone.',
      text: 'In High Importance Zone',
      direction: 'Neutral'
    }
  ],
  [
    'InVeryHighImportanceZone',
    {
      tag: 'InVeryHighImportanceZone',
      color: 'primary',
      info: 'The price is in a very high importance zone.',
      text: 'In Very High Importance Zone',
      direction: 'Neutral'
    }
  ],
  [
    'CloseToResistanceWithVeryLowImportance',
    {
      tag: 'CloseToResistanceWithVeryLowImportance',
      color: 'primary',
      info: 'The price is close to resistance with very low importance.',
      text: 'Close to Resistance with Very Low Importance',
      direction: 'Neutral'
    }
  ],
  [
    'CloseToResistanceWithLowImportance',
    {
      tag: 'CloseToResistanceWithLowImportance',
      color: 'primary',
      info: 'The price is close to resistance with low importance.',
      text: 'Close to Resistance with Low Importance',
      direction: 'Neutral'
    }
  ],
  [
    'CloseToResistanceWithMediumImportance',
    {
      tag: 'CloseToResistanceWithMediumImportance',
      color: 'primary',
      info: 'The price is close to resistance with medium importance.',
      text: 'Close to Resistance with Medium Importance',
      direction: 'Neutral'
    }
  ],
  [
    'CloseToResistanceWithHighImportance',
    {
      tag: 'CloseToResistanceWithHighImportance',
      color: 'primary',
      info: 'The price is close to resistance with high importance.',
      text: 'Close to Resistance with High Importance',
      direction: 'Neutral'
    }
  ],
  [
    'CloseToResistanceWithVeryHighImportance',
    {
      tag: 'CloseToResistanceWithVeryHighImportance',
      color: 'primary',
      info: 'The price is close to resistance with very high importance.',
      text: 'Close to Resistance with Very High Importance',
      direction: 'Neutral'
    }
  ],
  [
    'CloseToSupportWithVeryLowImportance',
    {
      tag: 'CloseToSupportWithVeryLowImportance',
      color: 'primary',
      info: 'The price is close to support with very low importance.',
      text: 'Close to Support with Very Low Importance',
      direction: 'Neutral'
    }
  ],
  [
    'CloseToSupportWithLowImportance',
    {
      tag: 'CloseToSupportWithLowImportance',
      color: 'primary',
      info: 'The price is close to support with low importance.',
      text: 'Close to Support with Low Importance',
      direction: 'Neutral'
    }
  ],
  [
    'CloseToSupportWithMediumImportance',
    {
      tag: 'CloseToSupportWithMediumImportance',
      color: 'primary',
      info: 'The price is close to support with medium importance.',
      text: 'Close to Support with Medium Importance',
      direction: 'Neutral'
    }
  ],
  [
    'CloseToSupportWithHighImportance',
    {
      tag: 'CloseToSupportWithHighImportance',
      color: 'primary',
      info: 'The price is close to support with high importance.',
      text: 'Close to Support with High Importance',
      direction: 'Neutral'
    }
  ],
  [
    'CloseToSupportWithVeryHighImportance',
    {
      tag: 'CloseToSupportWithVeryHighImportance',
      color: 'primary',
      info: 'The price is close to support with very high importance.',
      text: 'Close to Support with Very High Importance',
      direction: 'Neutral'
    }
  ],
  [
    'NoHighRelevantSupportZone',
    {
      tag: 'NoHighRelevantSupportZone',
      color: 'primary',
      info: 'There is no high relevant support zone.',
      text: 'No High Relevant Support Zone',
      direction: 'Neutral'
    }
  ],
  [
    'NoHighRelevantResistanceZone',
    {
      tag: 'NoHighRelevantResistanceZone',
      color: 'primary',
      info: 'There is no high relevant resistance zone.',
      text: 'No High Relevant Resistance Zone',
      direction: 'Neutral'
    }
  ]
])
