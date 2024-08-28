import type { FC } from 'react'
import { Box, Drawer, IconButton, Typography } from '@mui/material'
import { X as XIcon } from 'icons/x'

interface PageDocumentationProps {
  onClose?: () => void
  open?: boolean
}

export const PageDocumentation: FC<PageDocumentationProps> = (props) => {
  const { open, onClose, ...other } = props

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      ModalProps={{ sx: { zIndex: 2000 } }}
      PaperProps={{ sx: { width: 320 } }}
      {...other}
    >
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
        <Typography color='inherit' variant='h6'>
          Page Documentation
        </Typography>
        <IconButton color='inherit' onClick={onClose}>
          <XIcon fontSize='small' />
        </IconButton>
      </Box>
      <Box
        sx={{
          py: 4,
          px: 3
        }}
      ></Box>
    </Drawer>
  )
}
