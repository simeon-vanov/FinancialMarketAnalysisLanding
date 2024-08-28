import { useRef, useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, FormControlLabel, Menu, MenuItem, ListSubheader } from '@mui/material'
import { ChevronDown as ChevronDownIcon } from '../../icons/chevron-down'

export interface Option {
  label: string
  value: unknown
  groupLabel?: string // Added groupLabel property
}

interface MultiSelectProps {
  label: string
  onChange?: (value: any[]) => void // Same as type as the value received above
  options: Option[] // Updated options type
  value: any[] // This should accept string[], number[] or boolean[]
}

export const MultiSelect: FC<MultiSelectProps> = (props) => {
  const { label, onChange, options, value = [], ...other } = props
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const handleOpenMenu = (): void => {
    setOpenMenu(true)
  }

  const handleCloseMenu = (): void => {
    setOpenMenu(false)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let newValue = [...value]

    if (event.target.checked) {
      newValue.push(event.target.value)
    } else {
      newValue = newValue.filter((item) => item !== event.target.value)
    }

    handleCloseMenu()

    onChange?.(newValue)
  }

  const renderOptions = (): JSX.Element[] => {
    const renderedOptions: JSX.Element[] = []
    let currentGroupLabel: string | undefined

    options.forEach((option, index) => {
      if (option.groupLabel !== currentGroupLabel) {
        currentGroupLabel = option.groupLabel
        renderedOptions.push(<ListSubheader key={`subheader-${index}`}>{option.groupLabel}</ListSubheader>)
      }

      renderedOptions.push(
        <MenuItem key={`item-${index}`}>
          <FormControlLabel
            control={<Checkbox checked={value.includes(option.value)} onChange={handleChange} value={option.value} />}
            label={option.label}
            sx={{
              flexGrow: 1,
              mr: 0
            }}
          />
        </MenuItem>
      )
    })

    return renderedOptions
  }

  return (
    <>
      <Button
        color='inherit'
        endIcon={<ChevronDownIcon fontSize='small' />}
        onClick={handleOpenMenu}
        ref={anchorRef}
        {...other}
      >
        {label}
      </Button>
      <Menu anchorEl={anchorRef.current} onClose={handleCloseMenu} open={openMenu}>
        {renderOptions()}
      </Menu>
    </>
  )
}

MultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired
}
