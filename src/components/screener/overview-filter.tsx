import { Box, Chip } from '@mui/material'
import { MultiSelect } from 'components/common/multi-select'
import { Option, periodOptions, Period } from 'types/options'

export const OverviewFilter: React.FC<{
  setOptions: (options: Option<Period>[]) => void
  selectedOptions: Option<Period>[]
}> = ({ setOptions, selectedOptions }) => {
  const handleDelete = (option: Option<Period>) => {
    setOptions(selectedOptions.filter((selectedOption) => selectedOption.value !== option.value))
  }

  const handleOptionsChange = (options: Period[]) => {
    const filteredOptions = periodOptions.filter((option) => options.includes(option.value))
    setOptions(filteredOptions)
  }

  return (
    <>
      <MultiSelect
        label='Periods'
        options={periodOptions}
        value={selectedOptions.map((option) => option.value)}
        onChange={handleOptionsChange}
      />
      {selectedOptions.map((option) => (
        <Chip
          key={option.value}
          label={
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                '& span': {
                  fontWeight: 600
                }
              }}
            >
              <span>{option.label}</span>
            </Box>
          }
          onDelete={() => handleDelete(option)}
          sx={{ m: 1 }}
          variant='outlined'
        />
      ))}
    </>
  )
}
