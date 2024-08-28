import { useEffect, type FC, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material'
import { Scrollbar } from 'components/common/scrollbar'
import { fetchStrengthMeterData } from './api'
import { SymbolStrengthMeterChart } from './symbol-strength-meter-chart'
import { formatDistanceToNow, parseISO } from 'date-fns'
import InfoIcon from '@mui/icons-material/Info'
import SymbolStrengthDetailsTable from './symbol-strength-details-table'
import { Instrument, Option, Period } from 'types/options'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { StrengthMeterData, StrengthMeterDetails } from './models'

interface SymbolStrengthMeterProps {
  period: Option<Period>
  onInstrumentClick: (pair: Instrument) => void
}

export const SymbolStrengthMeter: FC<SymbolStrengthMeterProps> = ({ period, onInstrumentClick }) => {
  const [data, setData] = useState<StrengthMeterData | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<string>('')
  const [currencyDetails, setCurrencyDetails] = useState<StrengthMeterDetails[] | null>(null)
  const [showLess, setShowLess] = useState<boolean>(false) // Added state for show/hide

  useEffect(() => {
    const fetchData = async () => {
      setData(await fetchStrengthMeterData(period.value))
    }

    fetchData()
  }, [])

  const distanceFromNow =
    data?.lastUpdate &&
    formatDistanceToNow(parseISO(data.lastUpdate), {
      addSuffix: true
    })

  const onCategorySelected = (symbol: string) => {
    const detailsResult = data?.details.find((item) => item.currency === symbol)
    setSelectedCurrency(symbol)
    setCurrencyDetails(detailsResult?.details.sort((a, b) => a.instrument.localeCompare(b.instrument)) || [])
    setShowLess(false)
  }

  const handleShowLess = () => {
    setShowLess(!showLess)
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        p: 3
      }}
    >
      <Card>
        <CardHeader
          subheader={data?.lastUpdate && `Last update ${distanceFromNow}`}
          title={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              Currency Strength Meter {period.label}
              <Tooltip title='Average change to other currencies.'>
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Box>
          }
        />
        <Divider />
        <CardContent>
          <Scrollbar>
            <Box
              sx={{
                height: 336,
                minWidth: 500,
                px: 2
              }}
            >
              {!data ? (
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
              ) : (
                <SymbolStrengthMeterChart data={data} onClickCategory={onCategorySelected} />
              )}
            </Box>
          </Scrollbar>
        </CardContent>
        {currencyDetails && (
          <>
            {selectedCurrency && !showLess && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <Button
                  endIcon={<VisibilityIcon fontSize='small' />}
                  sx={{ marginLeft: 'auto' }}
                  onClick={handleShowLess}
                >
                  Show less
                </Button>
              </Box>
            )}
            {!showLess && (
              <SymbolStrengthDetailsTable
                selectedCurrency={selectedCurrency}
                currencyDetails={currencyDetails}
                onInstrumentClick={onInstrumentClick}
              />
            )}
          </>
        )}
      </Card>
    </Box>
  )
}
