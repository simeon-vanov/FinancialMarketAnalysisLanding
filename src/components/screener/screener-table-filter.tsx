import React, { useState, useEffect } from 'react'
import { Box, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Instrument, timeFrameOptions } from 'types/options'
import { MultiSelect } from 'components/common/multi-select'
import { IScreenerParameters } from './models'
import { momentumOptions, priceLevelOptions, priceMoveOptions, trendOptions } from './screener-table-filter-options'
import { createOptions } from 'utils/tag-utils'
import { useTranslation } from 'react-i18next'
import { debounce } from 'throttle-debounce'

interface IScreenerTableFilterProps {
  reloadData: (parameters: IScreenerParameters) => void
  selectedInstrument: Instrument | undefined
  deselectInstrument: () => void
}

const ScreenerTableFilters: React.FC<IScreenerTableFilterProps> = ({
  reloadData,
  selectedInstrument,
  deselectInstrument
}) => {
  const [searchText, setSearchText] = useState<string>('')

  const [parameters, setParameters] = useState<IScreenerParameters>({
    timeFrames: [],
    instrumentSearchText: '',
    momentum: [],
    priceLevels: [],
    trend: [],
    priceMove: [],
    page: 0, // not used
    pageSize: 5 // not used
  })

  const translate = useTranslation()

  useEffect(() => {
    // Retrieve filters from local storage when the component mounts
    const savedFilters = localStorage.getItem('screenerFilters')
    if (savedFilters) {
      setParameters(JSON.parse(savedFilters))
    }
  }, [])

  useEffect(() => {
    if (selectedInstrument === undefined) return
    setSearchText(selectedInstrument)
    setParameters({ ...parameters, instrumentSearchText: selectedInstrument, page: 0 })
  }, [selectedInstrument])

  useEffect(() => {
    // Save filters to local storage whenever the parameters change
    localStorage.setItem('screenerFilters', JSON.stringify(parameters))
    reloadData({ ...parameters })
  }, [parameters])

  useEffect(() => {
    if (searchText === selectedInstrument) return
    debouncedHandleSearchChange(searchText)

    return () => {
      debouncedHandleSearchChange.cancel()
    }
  }, [searchText])

  const debouncedHandleSearchChange = debounce(500, (searchText: string) => {
    deselectInstrument()
    setParameters({ ...parameters, instrumentSearchText: searchText, page: 0 })
  })

  const handleChange = (selectedOptions: string[], attribute: string) => {
    setParameters({ ...parameters, [attribute]: selectedOptions })
  }

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        m: -1,
        p: 2
      }}
    >
      <Box
        sx={{
          m: 1,
          maxWidth: '100%',
          width: 500
        }}
      >
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon fontSize='small' />
              </InputAdornment>
            )
          }}
          placeholder='Search by instrument'
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </Box>
      <Box
        sx={{
          m: 1,
          maxWidth: '100%'
        }}
      >
        <MultiSelect
          label={`Time Frames (${parameters.timeFrames.length})`}
          options={timeFrameOptions}
          value={parameters.timeFrames}
          onChange={(options) => handleChange(options, 'timeFrames')}
        />
      </Box>
      <Box
        sx={{
          m: 1,
          maxWidth: '100%'
        }}
      >
        <MultiSelect
          label={`Trend (${parameters.trend.length})`}
          options={createOptions(trendOptions, translate.t)}
          value={parameters.trend}
          onChange={(options) => handleChange(options, 'trend')}
        />
      </Box>
      <Box
        sx={{
          m: 1,
          maxWidth: '100%'
        }}
      >
        <MultiSelect
          label={`Momentum (${parameters.momentum.length})`}
          options={createOptions(momentumOptions, translate.t)}
          value={parameters.momentum}
          onChange={(options) => handleChange(options, 'momentum')}
        />
      </Box>

      <Box
        sx={{
          m: 1,
          maxWidth: '100%'
        }}
      >
        <MultiSelect
          label={`Price Move (${parameters.priceMove.length})`}
          options={createOptions(priceMoveOptions, translate.t)}
          value={parameters.priceMove}
          onChange={(options) => handleChange(options, 'priceMove')}
        />
      </Box>
      <Box
        sx={{
          m: 1,
          maxWidth: '100%'
        }}
      >
        <MultiSelect
          label={`Price Levels (${parameters.priceLevels.length})`}
          options={createOptions(priceLevelOptions, translate.t)}
          value={parameters.priceLevels}
          onChange={(options) => handleChange(options, 'priceLevels')}
        />
      </Box>
    </Box>
  )
}

export default ScreenerTableFilters
