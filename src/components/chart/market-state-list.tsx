import { Box, Chip, Accordion, AccordionSummary, AccordionDetails, Button, Typography, Alert } from '@mui/material'
import { useFetchTradingInsights } from './hooks/trading-insights'
import { SeverityPill } from 'components/common/severity-pill'
import { Tag, tagMap } from 'types/tags'
import { createUiGroups } from 'utils/filters-utils'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface MarketStateListProps {
  selectedTradingInsights: Tag[]
  setSelectedTradingInsights: (options: Tag[]) => void
}

export const MarketStateList = ({ selectedTradingInsights, setSelectedTradingInsights }: MarketStateListProps) => {
  const fetchTradingInsights = useFetchTradingInsights()
  const currentTags = fetchTradingInsights?.tradingInsights?.tags
  const translate = useTranslation()

  if (fetchTradingInsights?.loading || !currentTags) {
    return null
  }

  const handleSingleTagAdd = (tag: Tag) => {
    if (!selectedTradingInsights.includes(tag)) {
      setSelectedTradingInsights([...selectedTradingInsights, tag])
      return
    }
  }

  const handleMultiTagsAdd = (tags: Tag[]) => {
    setSelectedTradingInsights([
      ...selectedTradingInsights,
      ...tags.filter((tag) => !selectedTradingInsights.includes(tag))
    ])
  }

  const groupedTradingInsights = createUiGroups(currentTags)

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='body1'>{translate.t('Market State')}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Alert sx={{ mb: 2 }} severity='info'>
          Click on a state to apply as a filter
        </Alert>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          {Object.entries(groupedTradingInsights).map(([group, insights]) => (
            <React.Fragment key={group}>
              <Chip
                label={
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      '& span': {
                        fontWeight: 600
                      }
                    }}
                  >
                    <span>{translate.t(group)}</span>
                  </Box>
                }
                sx={{ m: 1, cursor: 'pointer' }}
                onClick={() => handleMultiTagsAdd(insights)}
                variant='outlined'
              />
              {insights.map((insight) => (
                <SeverityPill key={insight} color={tagMap.get(insight)?.color} sx={{ m: 1, cursor: 'pointer' }}>
                  <span onClick={() => handleSingleTagAdd(insight)}>{translate.t(insight)}</span>
                </SeverityPill>
              ))}
            </React.Fragment>
          ))}
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          <Button size='small' onClick={() => handleMultiTagsAdd(currentTags)} sx={{ ml: 'auto' }}>
            Apply all
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
