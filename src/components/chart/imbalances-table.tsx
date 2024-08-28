import React from 'react'
import { ImbalanceDto, InstrumentDetails } from './models'
import { Table, TableHead, TableRow, TableCell, TableBody, Button, CircularProgress } from '@mui/material'
import { getLabel, signalDirectionOptions } from 'types/options'

interface ImbalancesTableProps {
  imbalances: ImbalanceDto[]
  selectedImbalances: ImbalanceDto[]
  onLineView: (line: ImbalanceDto) => void
  onDeselect: (line: ImbalanceDto) => void
  currentPrice: number
  isLoading: boolean
  instrumentDetails: InstrumentDetails | undefined
}

const ImbalancesTable: React.FC<ImbalancesTableProps> = ({
  imbalances: lines,
  selectedImbalances,
  onLineView,
  onDeselect,
  currentPrice,
  isLoading,
  instrumentDetails
}) => {
  const calculateDistance = (imbalance: ImbalanceDto) => {
    if (!instrumentDetails) return 0
    if (imbalance.signalDirection === 'Long') {
      return (currentPrice - imbalance.priceUpperBoundary) / instrumentDetails.minMove / 10
    }

    return (imbalance.priceBottomBoundary - currentPrice) / instrumentDetails.minMove / 10
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Direction</TableCell>
          <TableCell>Pips To Reach</TableCell>
          <TableCell>Visualize</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={4} align='center'>
              <CircularProgress />
            </TableCell>
          </TableRow>
        ) : (
          lines.map((line, index) => (
            <TableRow key={index}>
              <TableCell>{getLabel(line.signalDirection, signalDirectionOptions)}</TableCell>
              <TableCell>{calculateDistance(line).toFixed(1)}</TableCell>
              <TableCell>
                {selectedImbalances.includes(line) ? (
                  <Button size='small' onClick={() => onDeselect(line)}>
                    Remove
                  </Button>
                ) : (
                  <Button size='small' onClick={() => onLineView(line)}>
                    Add
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

export default ImbalancesTable
