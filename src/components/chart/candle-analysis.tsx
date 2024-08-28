import React, { useEffect, useState } from 'react'
import { useMediaQuery, CircularProgress, Box } from '@mui/material'
import { getLabel, sizeIndexOptions, volatilityIndexOptions, volumeIndexOptions } from 'types/options'
import { CandleAnalysisDto } from './models'
import { PropertyList } from 'components/common/property-list'
import { PropertyListItem } from 'components/common/property-list-item'
import { Theme } from '@emotion/react'
import { useFetchIndicatorsAnalysis } from './hooks/indicator-analysis'

export const getChangeText = (candleAnalysis: CandleAnalysisDto) => {
  if (!candleAnalysis.changePercentile) {
    return ' - '
  }

  if (candleAnalysis.isUpDirection) {
    return `${getLabel(candleAnalysis.sizeIndexType, sizeIndexOptions)} Bullish (bigger than ${candleAnalysis.changePercentile.toFixed(
      0
    )}% in last 100)`
  }

  return `${getLabel(candleAnalysis.sizeIndexType, sizeIndexOptions)} Bearish (bigger than ${candleAnalysis.changePercentile.toFixed(
    0
  )}% in last 100)`
}

export const getPatternsText = (candleAnalysis: CandleAnalysisDto) => {
  let text = ''
  if (candleAnalysis.indecisivePatterns.length) {
    text = `${candleAnalysis.indecisivePatterns.join(', ')} - Indecisive Patterns. `
  }

  if (candleAnalysis.bullishPatterns.length) {
    text = `${text} ${candleAnalysis.bullishPatterns.join(', ')} - Bullish Patterns. `
  }

  if (candleAnalysis.bearishPatterns.length) {
    text = `${text} ${candleAnalysis.bearishPatterns.join(', ')} - Bearish Patterns.`
  }

  if (text === '') {
    return 'No patterns.'
  }

  return text
}

export const getVolatilityText = (candleAnalysis: CandleAnalysisDto) => {
  if (!candleAnalysis.volatilityPercentile) {
    return ' - '
  }

  return `${getLabel(candleAnalysis.volatilityIndexType, volatilityIndexOptions)} (higher than ${candleAnalysis.volatilityPercentile.toFixed(
    0
  )}% in last 100)`
}

export const getVolumeText = (candleAnalysis: CandleAnalysisDto) => {
  if (!candleAnalysis.volumePercentile) {
    return ' - '
  }

  return `${getLabel(candleAnalysis.volumeIndexType, volumeIndexOptions)} (higher than ${candleAnalysis.volumePercentile.toFixed(
    0
  )}% in last 100)`
}

const CandleAnalysis = () => {
  const [candleAnalysis, setCandleAnalysis] = useState<CandleAnalysisDto>()
  const indicatorsAnalysis = useFetchIndicatorsAnalysis()

  useEffect(() => {
    if (!indicatorsAnalysis) return

    setCandleAnalysis(indicatorsAnalysis.candleAnalysis)
  }, [indicatorsAnalysis])

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const align = smDown ? 'vertical' : 'horizontal'

  if (candleAnalysis === undefined)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <CircularProgress />
      </Box>
    )

  return (
    <PropertyList>
      <PropertyListItem
        divider={true}
        align={align}
        label='Volatility'
        value={getVolatilityText(candleAnalysis)}
        possibleOptions={volatilityIndexOptions}
      />
      <PropertyListItem
        divider={true}
        align={align}
        label='Volume'
        value={getVolumeText(candleAnalysis)}
        possibleOptions={volumeIndexOptions}
      />
      <PropertyListItem
        align={align}
        divider={true}
        label='Change'
        value={getChangeText(candleAnalysis)}
        possibleOptions={sizeIndexOptions}
      />
      <PropertyListItem
        align={align}
        divider={true}
        label='Recent Movement'
        value={candleAnalysis.isLastRenkoUp ? 'Bullish' : 'Bearish'}
      />
      <PropertyListItem align={align} divider={true} label='Patterns' value={getPatternsText(candleAnalysis)} />
    </PropertyList>
  )
}

export default CandleAnalysis
