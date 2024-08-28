import { useEffect, type FC, type ReactNode } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { SplashScreen } from 'components/common/splash-screen'

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0()
  const router = useRouter()

  useEffect(() => {
    if (error) {
      console.log(error)
    }

    if (!router.isReady || error) {
      return
    }

    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: {
          returnTo: router.asPath
        }
      })
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, router, error])

  if (isLoading || !isAuthenticated) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <SplashScreen />
      </Box>
    )
  }

  return <>{children}</>
}
