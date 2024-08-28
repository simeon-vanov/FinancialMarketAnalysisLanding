import React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, Tooltip, IconButton } from '@mui/material'
import { ChevronRight } from 'icons/chevron-right'
import { VolatilityDetails } from './models'
import { Instrument } from 'types/options'

interface VolatilityAnalysisDetailsTableProps {
  selectedCurrency: string
  currencyDetails: VolatilityDetails[]
  onInstrumentClick: (pair: Instrument) => void
}

const VolatilityAnalysisDetailsTable: React.FC<VolatilityAnalysisDetailsTableProps> = ({
  currencyDetails,
  onInstrumentClick
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Pair</TableCell>
          <TableCell align='right'>Volatility</TableCell>
          <TableCell align='right'>Volume</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {currencyDetails?.map((detail) => (
          <TableRow key={detail.instrument}>
            <TableCell>
              <Box
                key={detail.instrument}
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <Box
                  sx={{
                    border: 3,
                    borderRadius: '50%',
                    height: 16,
                    mr: 1,
                    width: 16
                  }}
                />
                <Typography variant='subtitle2'>{detail.instrument}</Typography>
              </Box>
            </TableCell>
            <TableCell align='right'>
              <Typography variant='body2'>{detail.volatilityAverage} pips</Typography>
            </TableCell>
            <TableCell align='right'>
              <Typography variant='body2'>
                {detail.volumeAverage.toFixed(1)} points
                <Tooltip title='View'>
                  <IconButton edge='end' onClick={() => onInstrumentClick(detail.instrument)}>
                    <ChevronRight fontSize='small' />
                  </IconButton>
                </Tooltip>
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default VolatilityAnalysisDetailsTable
