import { Fab, Tooltip } from '@mui/material'
import { HelpOutline as HelpIcon } from '@mui/icons-material'
import { useRouter } from 'next/router'

export const DocumentationButton = () => {
  const router = useRouter()

  return (
    <>
      <Tooltip title='How to Use Guide'>
        <Fab
          color='primary'
          onClick={() => router.push('/learning/40')}
          size='medium'
          sx={{
            bottom: 0,
            margin: (theme) => theme.spacing(4),
            position: 'fixed',
            right: 0,
            zIndex: 1900
          }}
        >
          <HelpIcon fontSize='small' />
        </Fab>
      </Tooltip>
    </>
  )
}
