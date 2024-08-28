import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip // Added import
} from '@mui/material'
import { Scrollbar } from 'components/common/scrollbar'
import { fetchVolatilityData } from './api'
import { formatDistanceToNow, parseISO } from 'date-fns'
import InfoIcon from '@mui/icons-material/Info'
import { Instrument, Option, Period } from 'types/options'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VolatilityAnalysisChart from './volatility-analysis-chart'
import { VolatilityData, VolatilityDetails } from './models'
import VolatilityAnalysisDetailsTable from './volatility-analysis-details-tables'

interface VolatilityAnalysisProps {
  period: Option<Period>
  onInstrumentClick: (pair: Instrument) => void
}

const VolatilityAnalysis: React.FC<VolatilityAnalysisProps> = ({ period, onInstrumentClick }) => {
  const [data, setData] = useState<VolatilityData | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<string>('')
  const [currencyDetails, setCurrencyDetails] = useState<VolatilityDetails[] | null>(null)
  const [showLess, setShowLess] = useState<boolean>(false) // Added state for show/hide

  useEffect(() => {
    const fetchData = async () => {
      setData(await fetchVolatilityData(period.value))
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
              Volatility Meter {period.label}
              <Tooltip title='Average volatility and volume for the currency.'>
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
                <VolatilityAnalysisChart data={data} onClickCategory={onCategorySelected} />
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
              <VolatilityAnalysisDetailsTable
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

export default VolatilityAnalysis
