import React from 'react'
import { SupportResistanceLineDto } from './models'
import { Table, TableHead, TableRow, TableCell, TableBody, Button, CircularProgress } from '@mui/material'
import { getLabel, zoneImportanceOptions } from 'types/options'

interface SupportResistanceTableProps {
  lines: SupportResistanceLineDto[]
  calcDistance: (line: SupportResistanceLineDto) => string
  onLineView: (line: SupportResistanceLineDto) => void
  selectedLines: SupportResistanceLineDto[]
  onDeselectLines: (lines: SupportResistanceLineDto[]) => void
  isLoading: boolean
}

const SupportResistanceTable: React.FC<SupportResistanceTableProps> = ({
  lines,
  calcDistance,
  onLineView,
  selectedLines,
  onDeselectLines,
  isLoading
}) => {
  const getDistanceLabel = (line: SupportResistanceLineDto) => {
    const distance = calcDistance(line)
    if (Number.parseFloat(distance) < 0) {
      return 'In zone'
    }

    return distance
  }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Pips to Reach</TableCell>
          <TableCell>Importance</TableCell>
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
              <TableCell>{getDistanceLabel(line)}</TableCell>
              <TableCell>{getLabel(line.importance, zoneImportanceOptions)}</TableCell>
              <TableCell>
                {selectedLines.some(
                  (s) => s.level == line.level && s.timeFrame == line.timeFrame && s.zoneType == line.zoneType
                ) ? (
                  <Button size='small' onClick={() => onDeselectLines([line])}>
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

export default SupportResistanceTable
