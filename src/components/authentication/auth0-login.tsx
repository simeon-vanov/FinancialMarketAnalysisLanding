import { useState } from 'react'
import type { FC } from 'react'
import { Box, Button, FormHelperText } from '@mui/material'
import { useMounted } from '../../hooks/use-mounted'
import { useAuth0 } from '@auth0/auth0-react'

export const Auth0Login: FC = (props) => {
  const isMounted = useMounted()
  const { loginWithPopup } = useAuth0()
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (): Promise<void> => {
    try {
      await loginWithPopup()
    } catch (err) {
      console.error(err)

      if (isMounted()) {
        setError(err.message)
      }
    }
  }

  return (
    <div {...props}>
      {error && (
        <Box sx={{ my: 3 }}>
          <FormHelperText error>{error}</FormHelperText>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button onClick={handleLogin} variant='contained'>
          Log In
        </Button>
      </Box>
    </div>
  )
}
