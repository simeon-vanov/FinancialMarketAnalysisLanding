import { MarketDynamicsTag, MarketStatusTag } from './tags'

export type Option<T extends string> = {
  label: string
  value: T
}

export type Period = 'intraday' | 'day' | 'week' | 'month'

export const periodOptions: Option<Period>[] = [
  {
    label: 'Last 4h',
    value: 'intraday'
  },
  {
    label: 'Last 24h',
    value: 'day'
  },
  {
    label: 'Last Week',
    value: 'week'
  },
  {
    label: 'Last Month',
    value: 'month'
  }
]

export type RankIndex = 'low' | 'average' | 'high'

export const indexOptions: Option<RankIndex>[] = [
  {
    label: 'Low',
    value: 'low'
  },
  {
    label: 'Average',
    value: 'average'
  },
  {
    label: 'High',
    value: 'high'
  }
]

export type VolumeIndexType = 'LowVolume' | 'AverageVolume' | 'HighVolume' | 'None'

export const volumeIndexOptions: Option<VolumeIndexType>[] = [
  {
    label: 'Low Volume',
    value: 'LowVolume'
  },
  {
    label: 'Average Volume',
    value: 'AverageVolume'
  },
  {
    label: 'High Volume',
    value: 'HighVolume'
  },
  {
    label: 'None',
    value: 'None'
  }
]

export type VolatilityIndexType = 'LowVolatility' | 'AverageVolatility' | 'HighVolatility'

export const volatilityIndexOptions: Option<VolatilityIndexType>[] = [
  {
    label: 'Low Volatility',
    value: 'LowVolatility'
  },
  {
    label: 'Average Volatility',
    value: 'AverageVolatility'
  },
  {
    label: 'High Volatility',
    value: 'HighVolatility'
  }
]

export type SizeIndexType = 'Average' | 'Small' | 'VerySmall' | 'Big' | 'VeryBig'

export const sizeIndexOptions: Option<SizeIndexType>[] = [
  {
    label: 'Average',
    value: 'Average'
  },
  {
    label: 'Small',
    value: 'Small'
  },
  {
    label: 'Very Small',
    value: 'VerySmall'
  },
  {
    label: 'Big',
    value: 'Big'
  },
  {
    label: 'Very Big',
    value: 'VeryBig'
  }
]

export type PriceMoveType =
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

export const priceMoveTypeOptions: Option<PriceMoveType>[] = [
  {
    label: 'Impulse High',
    value: 'ImpulseHigh'
  },
  {
    label: 'Correction Low',
    value: 'CorrectionLow'
  },
  {
    label: 'Retest High',
    value: 'RetestHigh'
  },
  {
    label: 'Failed Higher High',
    value: 'FailedHigherHigh'
  },
  {
    label: 'Impulse Low',
    value: 'ImpulseLow'
  },
  {
    label: 'Correction High',
    value: 'CorrectionHigh'
  },
  {
    label: 'Retest Low',
    value: 'RetestLow'
  },
  {
    label: 'Failed Lower Low',
    value: 'FailedLowerLow'
  },
  {
    label: 'Extend High',
    value: 'ExtendHigh'
  },
  {
    label: 'Extend Low',
    value: 'ExtendLow'
  }
]

export type TimeOutlookType = 'UltraShortTerm' | 'ShortTerm' | 'MediumTerm' | 'LongTerm'

export const timeOutlookOptions: Option<TimeOutlookType>[] = [
  {
    label: 'Ultra Short Time Outlook',
    value: 'UltraShortTerm'
  },
  {
    label: 'Short Time Outlook',
    value: 'ShortTerm'
  },
  {
    label: 'Medium Time Outlook',
    value: 'MediumTerm'
  },
  {
    label: 'Long Time Outlook',
    value: 'LongTerm'
  }
]

export type ZoneType = 'Resistance' | 'Support'

export const zoneTypeOptions: Option<ZoneType>[] = [
  {
    label: 'Resistance',
    value: 'Resistance'
  },
  {
    label: 'Support',
    value: 'Support'
  }
]

export type ZoneImportanceType = 'VeryLow' | 'Low' | 'Medium' | 'High' | 'VeryHigh'

export const zoneImportanceOptions: Option<ZoneImportanceType>[] = [
  {
    label: 'Very Low',
    value: 'VeryLow'
  },
  {
    label: 'Low',
    value: 'Low'
  },
  {
    label: 'Medium',
    value: 'Medium'
  },
  {
    label: 'High',
    value: 'High'
  },
  {
    label: 'Very High',
    value: 'VeryHigh'
  }
]

export type SignalDirectionType = 'Long' | 'Short'

export const signalDirectionOptions: Option<SignalDirectionType>[] = [
  {
    label: 'Bullish',
    value: 'Long'
  },
  {
    label: 'Bearish',
    value: 'Short'
  }
]

export const getLabel = (value: string, options: Option<any>[]): string => {
  const option = options.find((option) => option.value === value)
  return option ? option.label : ''
}

export const marketStatusOptions: Option<MarketStatusTag>[] = [
  {
    label: 'Bullish',
    value: 'Bullish'
  },
  {
    label: 'Bearish',
    value: 'Bearish'
  },
  {
    label: 'Consolidating',
    value: 'Consolidating'
  }
]

export type IndicatorCategory = 'momentum' | 'reversal' | 'trend' | 'volume' | 'volatility'

export type TimeFrame = 'm15' | 'h1' | 'h4' | 'd1' | 'w1'

export const timeFrameOptions: Option<TimeFrame>[] = [
  {
    label: '15 minutes',
    value: 'm15'
  },
  {
    label: '1 hour',
    value: 'h1'
  },
  {
    label: '4 Hours',
    value: 'h4'
  },
  {
    label: '1 day',
    value: 'd1'
  },
  {
    label: '1 week',
    value: 'w1'
  }
]

export type Instrument =
  | 'EURUSD'
  | 'EURCHF'
  | 'EURGBP'
  | 'EURJPY'
  | 'EURCAD'
  | 'EURAUD'
  | 'EURNZD'
  | 'GBPUSD'
  | 'USDCHF'
  | 'USDJPY'
  | 'USDCAD'
  | 'AUDUSD'
  | 'NZDUSD'
  | 'GBPAUD'
  | 'GBPCAD'
  | 'GBPCHF'
  | 'GBPJPY'
  | 'GBPNZD'
  | 'CADCHF'
  | 'CADJPY'
  | 'AUDCAD'
  | 'NZDCAD'
  | 'AUDCHF'
  | 'CHFJPY'
  | 'AUDNZD'
  | 'AUDJPY'
  | 'NZDJPY'
  | 'NZDCHF'

export const instrumentOptions: Option<Instrument>[] = [
  {
    label: 'EURUSD',
    value: 'EURUSD'
  },
  {
    label: 'EURCHF',
    value: 'EURCHF'
  },
  {
    label: 'EURGBP',
    value: 'EURGBP'
  },
  {
    label: 'EURJPY',
    value: 'EURJPY'
  },
  {
    label: 'EURCAD',
    value: 'EURCAD'
  },
  {
    label: 'EURAUD',
    value: 'EURAUD'
  },
  {
    label: 'EURNZD',
    value: 'EURNZD'
  },
  {
    label: 'GBPUSD',
    value: 'GBPUSD'
  },
  {
    label: 'USDCHF',
    value: 'USDCHF'
  },
  {
    label: 'USDJPY',
    value: 'USDJPY'
  },
  {
    label: 'USDCAD',
    value: 'USDCAD'
  },
  {
    label: 'AUDUSD',
    value: 'AUDUSD'
  },
  {
    label: 'NZDUSD',
    value: 'NZDUSD'
  },
  {
    label: 'GBPAUD',
    value: 'GBPAUD'
  },
  {
    label: 'GBPCAD',
    value: 'GBPCAD'
  },
  {
    label: 'GBPCHF',
    value: 'GBPCHF'
  },
  {
    label: 'GBPJPY',
    value: 'GBPJPY'
  },
  {
    label: 'GBPNZD',
    value: 'GBPNZD'
  },
  {
    label: 'CADCHF',
    value: 'CADCHF'
  },
  {
    label: 'CADJPY',
    value: 'CADJPY'
  },
  {
    label: 'AUDCAD',
    value: 'AUDCAD'
  },
  {
    label: 'NZDCAD',
    value: 'NZDCAD'
  },
  {
    label: 'AUDCHF',
    value: 'AUDCHF'
  },
  {
    label: 'CHFJPY',
    value: 'CHFJPY'
  },
  {
    label: 'AUDNZD',
    value: 'AUDNZD'
  },
  {
    label: 'AUDJPY',
    value: 'AUDJPY'
  },
  {
    label: 'NZDJPY',
    value: 'NZDJPY'
  },
  {
    label: 'NZDCHF',
    value: 'NZDCHF'
  }
]

export const marketDynamicsTagOptions: Option<MarketDynamicsTag>[] = [
  {
    label: 'Volatility Expansion',
    value: 'VolatilityExpansion'
  },
  {
    label: 'Trending',
    value: 'Trending'
  },
  {
    label: 'Volatility Contraction',
    value: 'VolatilityContraction'
  },
  {
    label: 'Choppy Market',
    value: 'ChoppyMarket'
  },
  {
    label: 'Ranging Market',
    value: 'RangingMarket'
  },
  {
    label: 'High Volatility',
    value: 'HighVolatility'
  },
  {
    label: 'Low Volatility',
    value: 'LowVolatility'
  }
]
