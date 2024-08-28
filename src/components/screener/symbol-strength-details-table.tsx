import React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, Tooltip, IconButton } from '@mui/material'
import { ChevronRight } from 'icons/chevron-right'
import { StrengthMeterDetails } from './models'
import { Instrument } from 'types/options'

interface SymbolStrengthDetailsTableProps {
  selectedCurrency: string
  currencyDetails: StrengthMeterDetails[]
  onInstrumentClick: (pair: Instrument) => void
}

const SymbolStrengthDetailsTable: React.FC<SymbolStrengthDetailsTableProps> = ({
  selectedCurrency,
  currencyDetails,
  onInstrumentClick
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{selectedCurrency} against</TableCell>
          <TableCell align='right'>Gain</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {currencyDetails
          ?.sort((x, y) => y.change - x.change)
          .map((detail) => (
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
                      borderColor: detail.change > 0 ? 'success.main' : 'error.main',
                      borderRadius: '50%',
                      height: 16,
                      mr: 1,
                      width: 16
                    }}
                  />
                  <Typography variant='subtitle2'>{detail.instrument.replace(selectedCurrency, '')}</Typography>
                </Box>
              </TableCell>
              <TableCell align='right'>
                <Typography color={detail.change > 0 ? 'success.main' : 'error.main'} variant='body2'>
                  {detail.change}%
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

export default SymbolStrengthDetailsTable
