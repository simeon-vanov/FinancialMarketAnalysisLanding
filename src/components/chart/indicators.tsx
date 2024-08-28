import React, { useEffect, useState } from 'react'
import { Dialog, CircularProgress, Box, Card, CardContent, Typography } from '@mui/material'
import { Indicator, IndicatorInfoResponse } from './models'
import { useFetchIndicatorsAnalysis } from './hooks/indicator-analysis'
import TotalSignalsChart from './indicators-total-chart'
import IndicatorsSignalTable from './indicators-table'
import { fetchIndicatorInfo } from './api'
import { IndicatorCategory } from 'types/options'
import { Tag } from 'types/tags'

interface IndicatorsProps {
  onShowIndicator: (id: string, signalId: string) => void
  indicatorCategory: IndicatorCategory
}

const IndicatorsAnalysis: React.FC<IndicatorsProps> = ({ onShowIndicator, indicatorCategory }) => {
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [open, setOpen] = useState(false)
  const [dialogInfoHtml, setDialogInfoHtml] = useState<IndicatorInfoResponse>()
  const indicatorsAnalysis = useFetchIndicatorsAnalysis()
  const [searchedTag, setSearchedTag] = useState<Tag>()

  useEffect(() => {
    if (!indicatorsAnalysis) return

    setIndicators(
      indicatorsAnalysis.indicators.filter(
        (indicator) => indicator.indicatorCategory.toLowerCase() === indicatorCategory.toLowerCase()
      )
    )
  }, [indicatorsAnalysis])

  const handleTagSearch = (tag: Tag) => {
    if (tag === searchedTag) return setSearchedTag(undefined)
    setSearchedTag(tag)
  }

  const handleViewClick = (id: string, signalId: string) => {
    onShowIndicator(id, signalId)
  }

  const handleInfoClick = async (id: string, isSignal: boolean) => {
    setDialogInfoHtml(await fetchIndicatorInfo(id, isSignal))
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (!indicatorsAnalysis)
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

  if (indicators.length == 0)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <Typography variant='h6' color='textSecondary'>
          No signals found
        </Typography>
      </Box>
    )
  return (
    <>
      <TotalSignalsChart indicators={indicators} onTagSearch={handleTagSearch} searchedTag={searchedTag} />
      <IndicatorsSignalTable
        indicators={indicators.filter((indicator) => !searchedTag || indicator.tag === searchedTag)}
        onIndicatorInfoClick={(id) => handleInfoClick(id, false)}
        onSignalInfoClick={(id) => handleInfoClick(id, true)}
        onViewSignalHistoryClick={handleViewClick}
      />

      <Dialog open={open} onClose={handleClose}>
        {dialogInfoHtml && (
          <Card sx={{ overflow: 'auto' }}>
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: dialogInfoHtml.infoHtml }}></div>
            </CardContent>
          </Card>
        )}
      </Dialog>
    </>
  )
}

export default IndicatorsAnalysis
