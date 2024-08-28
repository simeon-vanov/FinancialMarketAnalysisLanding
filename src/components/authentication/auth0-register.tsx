import { useState } from 'react'
import type { FC } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, FormHelperText } from '@mui/material'
import { useMounted } from '../../hooks/use-mounted'
import { useAuth0 } from '@auth0/auth0-react'

export const Auth0Register: FC = (props) => {
  const isMounted = useMounted()
  const router = useRouter()
  const { loginWithRedirect } = useAuth0()
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async (): Promise<void> => {
    try {
      await loginWithRedirect({
        appState: {
          returnTo: (router.query.returnUrl as string | undefined) || '/'
        }
      })
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
        <Button onClick={handleRegister} variant='contained'>
          Register
        </Button>
      </Box>
    </div>
  )
}
