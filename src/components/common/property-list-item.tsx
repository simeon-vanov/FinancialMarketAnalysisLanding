import { useState, type FC } from 'react'
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  Typography
} from '@mui/material'
import type { ListItemProps } from '@mui/material'
import { Option } from 'types/options'
import InfoIcon from '@mui/icons-material/Info'

type Direction = 'horizontal' | 'vertical'

interface PropertyListItemProps extends ListItemProps {
  align?: Direction
  label: string
  value?: string
  possibleOptions?: Option<any>[]
}

export const PropertyListItem: FC<PropertyListItemProps> = (props) => {
  const { align, children, disableGutters, value, label, possibleOptions, ...other } = props

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <ListItem
      sx={{
        px: disableGutters ? 0 : 3,
        py: 1.5
      }}
      {...other}
    >
      <ListItemText
        disableTypography
        primary={
          <Typography sx={{ minWidth: align === 'vertical' ? 'inherit' : 180 }} variant='subtitle2'>
            {label}
          </Typography>
        }
        secondary={
          <Box
            sx={{
              flex: 1,
              mt: align === 'vertical' ? 0.5 : 0
            }}
          >
            {children || (
              <>
                <Typography color='textSecondary' variant='body2'>
                  {value}
                </Typography>
              </>
            )}
          </Box>
        }
        sx={{
          display: 'flex',
          flexDirection: align === 'vertical' ? 'column' : 'row',
          my: 0
        }}
      />

      {possibleOptions && (
        <ListItemSecondaryAction>
          <IconButton size='small' onClick={handleClick}>
            <InfoIcon />
          </IconButton>

          <Popover
            id={Boolean(anchorEl) ? 'simple-popover' : undefined}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <List>
              {possibleOptions.map((option) => (
                <ListItem key={option.value}>
                  <ListItemText primary={option.label} />
                </ListItem>
              ))}
            </List>
          </Popover>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
}
