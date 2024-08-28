import React from 'react'
import { useRouter } from 'next/router'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material'
import { ChevronRight } from '@mui/icons-material'
import { ScreenerInstrument } from './models'
import { SeverityPill } from 'components/common/severity-pill'
import { Instrument, TimeFrame } from 'types/options'
import { Tag, tagMap } from 'types/tags'
import { Box } from '@mui/system'
import { useSubscription } from 'hooks/use-subscription'

interface ScreenerTableProps {
  data: ScreenerInstrument[] | undefined
  mini?: boolean
  onClick?: (instrument: Instrument, timeFrame: TimeFrame) => void
}

const ScreenerTable: React.FC<ScreenerTableProps> = ({ data, mini, onClick }) => {
  const router = useRouter()
  const { subscription } = useSubscription()

  const renderTag = (tag: Tag, i: number) => {
    const tagDetails = tagMap.get(tag)
    return (
      <Box key={`${tag}-${i}-pill`}>
        <SeverityPill color={tagDetails?.color ?? 'primary'} sx={{ mr: 1, mb: 1 }}>
          {tagDetails?.text ?? tag}
        </SeverityPill>
      </Box>
    )
  }

  const renderTags = (tags: Tag[]) => tags.map(renderTag)

  const handleRowClick = (instrument: Instrument, timeFrame: TimeFrame) => {
    if (subscription === 'basic') {
      return // Disable navigation for basic subscription
    }

    if (onClick) {
      return onClick(instrument, timeFrame)
    }

    router.push(`/chart?instrument=${instrument}&timeFrame=${timeFrame}`)
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Instrument</TableCell>
          <TableCell>Time Frame</TableCell>
          <TableCell>Trend</TableCell>
          <TableCell>Momentum</TableCell>
          {!mini && <TableCell>Price Move</TableCell>}
          <TableCell>Price Levels</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!data ? (
          <TableRow>
            <TableCell colSpan={6} align='center'>
              <CircularProgress />
            </TableCell>
          </TableRow>
        ) : (
          data.map((row) => (
            <Tooltip
              key={`${row.instrument}${row.timeFrame}-tooltip`}
              title={subscription === 'basic' ? 'Go Premium to navigate to insights' : ''}
            >
              <TableRow
                key={`${row.instrument}${row.timeFrame}`}
                onClick={() => handleRowClick(row.instrument, row.timeFrame)}
                style={{ cursor: subscription === 'basic' ? 'not-allowed' : 'pointer' }}
                hover // Add hover property to enable hover effect
              >
                <TableCell>
                  <Typography variant='subtitle2'>{row.instrument}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2'>{row.timeFrame}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2'>{renderTags(row.trend)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2'>{renderTags(row.momentum)}</Typography>
                </TableCell>
                {!mini && (
                  <TableCell>
                    <Typography variant='subtitle2'>{renderTags(row.priceMove)}</Typography>
                  </TableCell>
                )}
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle2'>{renderTags(row.priceLevels)}</Typography>
                    {!mini && (
                      <span>
                        <IconButton disabled={subscription === 'basic'}>
                          <ChevronRight />
                        </IconButton>
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            </Tooltip>
          ))
        )}
      </TableBody>
    </Table>
  )
}

export default ScreenerTable
