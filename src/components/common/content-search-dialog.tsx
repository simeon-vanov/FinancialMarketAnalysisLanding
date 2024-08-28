import { useEffect, useState } from 'react'
import type { FC } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import { Search as SearchIcon } from 'icons/search'
import { X as XIcon } from 'icons/x'
import { Tip } from './tip'
import { fetchScreenerData } from '../screener/api'
import { ScreenerInstrument } from '../screener/models'
import ScreenerTable from '../screener/screener-table'
import { debounce } from 'throttle-debounce'
import { useRouter } from 'next/router'
import { Instrument, TimeFrame } from 'types/options'

interface ContentSearchProps {
  onClose?: () => void
  open?: boolean
  onRowSelect?: (instrument: Instrument, timeFrame: TimeFrame) => void
}

export const ContentSearchDialog: FC<ContentSearchProps> = (props) => {
  const { onClose, open, onRowSelect, ...other } = props
  const [value, setValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [screenerResults, setScreenerResults] = useState<ScreenerInstrument[] | null>(null)

  const router = useRouter()
  const handleSearch = async (searchedText: string) => {
    setIsLoading(true)
    setScreenerResults(null)
    setValue(searchedText)
  }

  useEffect(() => {
    debouncedReloadDataRequest(value)
    return () => {
      debouncedReloadDataRequest.cancel()
    }
  }, [value])

  const reloadData = async (searchedText: string) => {
    if (searchedText) {
      const results = await fetchScreenerData({
        instrumentSearchText: searchedText,
        timeFrames: [],
        momentum: [],
        priceLevels: [],
        trend: [],
        priceMove: [],
        page: 0,
        pageSize: 100
      })

      setScreenerResults(results.items)
    }

    setIsLoading(false)
  }

  const debouncedReloadDataRequest = debounce(500, reloadData)

  const handleClose = () => {
    setValue('')
    setScreenerResults(null)
    onClose && onClose()
  }

  const handleSelect = (instrument: Instrument, timeFrame: TimeFrame) => {
    handleClose()
    if (onRowSelect) {
      onRowSelect(instrument, timeFrame)
    } else {
      router.push(`/chart?instrument=${instrument}&timeFrame=${timeFrame}`)
    }
  }

  return (
    <Dialog fullWidth maxWidth='lg' onClose={handleClose} open={!!open} {...other}>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2
        }}
      >
        <Typography variant='h6'>Search</Typography>
        <IconButton color='inherit' onClick={handleClose}>
          <XIcon fontSize='small' />
        </IconButton>
      </Box>
      <DialogContent>
        <Tip message='Search by just typing the instrument' />
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon fontSize='small' />
              </InputAdornment>
            )
          }}
          label='Search'
          onChange={(event) => handleSearch(event.target.value)}
          placeholder='Search...'
          sx={{ mt: 3 }}
          value={value}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3
          }}
        >
          {isLoading && <CircularProgress />}
        </Box>
        {screenerResults && <ScreenerTable data={screenerResults} mini={true} onClick={handleSelect} />}
      </DialogContent>
    </Dialog>
  )
}

ContentSearchDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
}
