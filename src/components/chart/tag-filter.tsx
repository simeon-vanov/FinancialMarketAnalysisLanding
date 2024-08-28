import {
  Box,
  Chip,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Link,
  CircularProgress
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { MultiSelect } from 'components/common/multi-select'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { createGroups } from 'utils/filters-utils'
import { Tag } from 'types/tags'
import { tradingInsightTagValues } from 'types/tag-filter'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ConditionMatchInstanceDto, FilterMatchingCandlesResponse, InstrumentDetails } from './models'
import ArrowDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowUpIcon from '@mui/icons-material/ArrowCircleUp'
import { format, formatDistance } from 'date-fns'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { useSelectedCandle } from './contexts/selected-candle-context'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import { useInstrumentDetails } from './contexts/instrument-details-context'
import { parseToDate } from 'utils/date-utils'

interface TagFilterProps {
  selectedTradingInsights: Tag[]
  setSelectedTradingInsights: (options: Tag[]) => void
  matchedResults: FilterMatchingCandlesResponse | null
  onFilterResultClick: (candleTime: number, instrumentDetails: InstrumentDetails) => void
}

const TagFilter = ({
  selectedTradingInsights,
  setSelectedTradingInsights,
  matchedResults,
  onFilterResultClick
}: TagFilterProps) => {
  const translate = useTranslation()
  const theme = useTheme()
  const candleDateTime = useSelectedCandle()
  const instrumentDetails = useInstrumentDetails()
  const [expanded, setExpanded] = useState(false)
  const [resultOpen, setResultOpen] = useState(false)

  const handleResultOpen = () => {
    setResultOpen(true)
  }

  const handleResultClose = () => {
    setResultOpen(false)
  }

  const handleDelete = (option: Tag) => {
    setSelectedTradingInsights(selectedTradingInsights.filter((selectedOption) => selectedOption !== option))
  }

  const handleAccordionChange = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    setExpanded(selectedTradingInsights.length > 0)
  }, [selectedTradingInsights])

  const groupedTradingInsights = createGroups(selectedTradingInsights)

  const renderGroupedTradingInsights = (
    <div>
      {Object.entries(groupedTradingInsights).map(([group, insights]) => (
        <React.Fragment key={group}>
          {group !== Object.keys(groupedTradingInsights)[0] && <span> & </span>}
          <span>
            {insights.length > 1 && '('}
            {insights.map((insight, index) => (
              <React.Fragment key={insight}>
                {index !== 0 && <span> | </span>}
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
                      <span>{translate.t(group.split('/')[0])}</span>: {translate.t(insight)}
                    </Box>
                  }
                  onDelete={() => handleDelete(insight)}
                  sx={{ m: 1 }}
                  variant='outlined'
                />
              </React.Fragment>
            ))}
            {insights.length > 1 && ')'}
          </span>
        </React.Fragment>
      ))}
    </div>
  )

  const uiGroups = [...new Set(tradingInsightTagValues.map((value) => value.uiGroup))]

  const renderTagGroup = (uiGroup: string) => {
    const groupInsightsOptions = tradingInsightTagValues
      .filter((x) => x.uiGroup == uiGroup)
      .map((value) => ({ value: value.tag, label: translate.t(value.tag), groupLabel: translate.t(value.group) }))

    return (
      <MultiSelect
        key={uiGroup}
        label={translate.t(uiGroup)}
        options={groupInsightsOptions.map((option) => ({ ...option }))}
        value={selectedTradingInsights.filter((option) =>
          groupInsightsOptions.some((insight) => insight.value === option)
        )}
        onChange={(options) => {
          const filteredOptions = selectedTradingInsights.filter(
            (option) => !groupInsightsOptions.some((insight) => insight.value === option)
          )

          setSelectedTradingInsights([...filteredOptions, ...options])
        }}
      />
    )
  }

  const renderNoFilters = (
    <Box sx={{ p: 3 }}>
      <Typography color='textSecondary' variant='subtitle2'>
        No filters applied
      </Typography>
    </Box>
  )

  const resultIcon = (match: ConditionMatchInstanceDto) => {
    if (match.moveUpPips != null && match.moveDownPips != null && match?.moveUpPips > match.moveDownPips) {
      return <ArrowUpIcon fontSize='small' color='success' />
    } else if (match.moveUpPips != null && match.moveDownPips != null && match?.moveUpPips < match.moveDownPips) {
      return <ArrowDownIcon fontSize='small' color='error' />
    }

    return <HourglassEmptyIcon fontSize='small' />
  }

  const description = (match: ConditionMatchInstanceDto) => {
    if (match.moveUpPips == null || match.moveDownPips == null) {
      return (
        <Typography color='textSecondary' variant='body2'>
          Move is not yet complete
        </Typography>
      )
    }
    return (
      <Typography color='textSecondary' variant='body2'>
        <ArrowUpwardIcon style={{ color: theme.palette.success.main }} />
        {match.moveUpPips?.toFixed(2)} Pips Up |
        <ArrowDownwardIcon style={{ color: theme.palette.error.main }} />
        {match.moveDownPips?.toFixed(2)} Pips Down
      </Typography>
    )
  }

  const handleOnFilterResultClick = (candleTime: number, instrumentDetails: InstrumentDetails) => {
    handleResultClose()
    onFilterResultClick(candleTime, instrumentDetails)
  }

  const Row = ({ index, style, data }: ListChildComponentProps<ConditionMatchInstanceDto[]>) => {
    const match = data[index]
    return (
      <ListItem
        style={style}
        divider={index < data.length - 1}
        key={match.candleTime}
        sx={{
          backgroundColor: match.candleTime === candleDateTime ? theme.palette.action.selected : 'transparent'
        }}
      >
        <ListItemAvatar>
          <Avatar>{resultIcon(match)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Link
              onClick={() => handleOnFilterResultClick(match.candleTime, instrumentDetails!)}
              color='textPrimary'
              sx={{ cursor: 'pointer' }}
              underline='none'
              variant='subtitle2'
            >
              {format(parseToDate(match.candleTime), 'MMM dd, h:mm a')}
            </Link>
          }
          secondary={description(match)}
        />
        <Typography color='textSecondary' noWrap variant='caption'>
          {new Date() &&
            `${formatDistance(parseToDate(match.candleTime), new Date(), {
              addSuffix: true
            })}`}
        </Typography>
      </ListItem>
    )
  }

  const results = (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            '&:first-of-type': {
              borderRight: (theme) => `1px solid ${theme.palette.divider}`
            }
          }}
        >
          <Typography align='center' color='textPrimary' variant='h5'>
            {matchedResults?.totalBullish}
          </Typography>
          <Typography align='center' color='textSecondary' component='h4' variant='overline'>
            {translate.t('Bullish')}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            '&:first-of-type': {
              borderRight: (theme) => `1px solid ${theme.palette.divider}`
            }
          }}
        >
          <Typography align='center' color='textPrimary' variant='h5'>
            {matchedResults?.totalBearish}
          </Typography>
          <Typography align='center' color='textSecondary' component='h4' variant='overline'>
            {translate.t('Bearish')}
          </Typography>
        </Box>
      </Box>
      <Divider />
      {matchedResults && (
        <FixedSizeList
          height={400}
          width='500px'
          itemSize={100} // Adjust based on your ListItem height
          itemCount={matchedResults.matches.length}
          itemData={matchedResults.matches}
        >
          {Row}
        </FixedSizeList>
      )}
    </>
  )

  const percentageOfBullish = () => {
    if (matchedResults?.totalBearish == null && matchedResults?.totalBullish != null) {
      return '100%'
    }

    if (matchedResults?.totalBullish == null) {
      return '0%'
    }

    const allMatches = matchedResults.totalBullish + matchedResults.totalBearish

    return `${((matchedResults.totalBullish / allMatches) * 100).toFixed(2)}%`
  }

  const percentageOfBearish = () => {
    if (matchedResults?.totalBearish != null && matchedResults?.totalBullish == null) {
      return '100%'
    }

    if (matchedResults?.totalBearish == null) {
      return '0%'
    }

    const allMatches = matchedResults.totalBullish + matchedResults.totalBearish

    return `${((matchedResults.totalBearish / allMatches) * 100).toFixed(2)}%`
  }

  const profitFactorDescription = () => {
    if (matchedResults?.bullBearRatio == null) {
      return null
    }

    if (matchedResults?.bullBearRatio > 0.5) {
      return `Profit Factor Bullish ${matchedResults?.profitFactor.toFixed(1)}`
    }

    return `Profit Factor Bearish ${matchedResults?.profitFactor.toFixed(1)}`
  }

  return (
    <>
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          {selectedTradingInsights.length == 0 || matchedResults ? (
            <Typography variant='body1'>
              Market State Filters{' '}
              {selectedTradingInsights.length > 0 &&
                ` - ${matchedResults?.matches.length} Matches, ${matchedResults?.totalBullish} Unique Bullish (${percentageOfBullish()}), ${matchedResults?.totalBearish} Unique Bearish (${percentageOfBearish()}) ${profitFactorDescription()}`}
            </Typography>
          ) : (
            <CircularProgress />
          )}
        </AccordionSummary>
        <AccordionDetails>
          {selectedTradingInsights.length ? renderGroupedTradingInsights : renderNoFilters}
          <Divider />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              p: 1
            }}
          >
            {uiGroups.map(renderTagGroup)}
          </Box>
        </AccordionDetails>
        {selectedTradingInsights.length > 0 && (
          <AccordionActions>
            <Button onClick={handleResultOpen}>See Results</Button>
            <Button onClick={() => setSelectedTradingInsights([])}>Clear all</Button>
          </AccordionActions>
        )}
      </Accordion>
      <Dialog open={resultOpen} onClose={handleResultClose}>
        <DialogTitle>{'Results'}</DialogTitle>
        <DialogContent>{results}</DialogContent>
        <DialogActions>
          <Button onClick={handleResultClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TagFilter
