import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { Scrollbar } from 'components/common/scrollbar'
import { Indicator } from './models'
import { ChevronDown as ChevronDownIcon } from 'icons/chevron-down'
import { ChevronRight as ChevronRightIcon } from 'icons/chevron-right'
import { Fragment, useState } from 'react'
import IndicatorsSignalList from './indicators-signals-list'
import InfoIcon from '@mui/icons-material/Info'
import { countLeadingZeroes } from 'utils/number-utils'

export interface IndicatorsSignalTableProps {
  indicators: Indicator[]
  onSignalInfoClick: (id: string) => void
  onIndicatorInfoClick: (id: string) => void
  onViewSignalHistoryClick: (id: string, signalId: string) => void
}

const IndicatorsTable = ({
  indicators,
  onSignalInfoClick,
  onIndicatorInfoClick,
  onViewSignalHistoryClick
}: IndicatorsSignalTableProps) => {
  const [indicatorOpen, setIndicatorOpen] = useState<string>('')
  const handleOpenProduct = (id: string) => {
    setIndicatorOpen(indicatorOpen === id ? '' : id)
  }

  const groupedSignalsByIndicator = Object.entries(
    indicators.reduce(
      (acc, indicator) => {
        const key = indicator.id
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(indicator)
        return acc
      },
      {} as { [key: string]: Indicator[] }
    )
  )

  return (
    <Scrollbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Indicator</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupedSignalsByIndicator.map(([key, groupdSignals]) => (
            <Fragment key={key}>
              <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  padding='checkbox'
                  sx={{
                    ...(indicatorOpen == key && {
                      position: 'relative',
                      '&:after': {
                        position: 'absolute',
                        content: '" "',
                        top: 0,
                        left: 0,
                        backgroundColor: 'primary.main',
                        width: 3,
                        height: 'calc(100% + 1px)'
                      }
                    })
                  }}
                  width='25%'
                >
                  <Tooltip title='Show signals' placement='top'>
                    <IconButton onClick={() => handleOpenProduct(key)}>
                      {indicatorOpen == key ? (
                        <ChevronDownIcon fontSize='small' />
                      ) : (
                        <ChevronRightIcon fontSize='small' />
                      )}
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='subtitle2'>{groupdSignals[0].indicatorName}</Typography>
                    <IconButton onClick={() => onIndicatorInfoClick(key)}>
                      <InfoIcon fontSize='small' />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant='body2'>
                    {isNaN(parseFloat(groupdSignals[0].value)) || groupdSignals[0].isAlreadyFormatted
                      ? groupdSignals[0].value
                      : parseFloat(groupdSignals[0].value).toFixed(countLeadingZeroes(groupdSignals[0].value) + 2)}
                  </Typography>
                </TableCell>
              </TableRow>
              {indicatorOpen == key && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    sx={{
                      p: 0,
                      position: 'relative',
                      '&:after': {
                        position: 'absolute',
                        content: '" "',
                        top: 0,
                        left: 0,
                        backgroundColor: 'primary.main',
                        width: 3,
                        height: 'calc(100% + 1px)'
                      }
                    }}
                  >
                    <IndicatorsSignalList
                      signals={groupdSignals}
                      onSignalInfoClick={onSignalInfoClick}
                      onViewSignalHistoryClick={onViewSignalHistoryClick}
                    />
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  )
}

export default IndicatorsTable
