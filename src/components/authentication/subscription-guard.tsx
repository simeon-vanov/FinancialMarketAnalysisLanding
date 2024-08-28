import { useEffect, FC, ReactNode } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { SplashScreen } from 'components/common/splash-screen'
import { useSubscription } from 'hooks/use-subscription'
import { Subscription } from 'contexts/subscription-context'

interface SubscriptionGuardProps {
  children: ReactNode
  allowedSubscriptions: Subscription[]
}

export const SubscriptionGuard: FC<SubscriptionGuardProps> = ({ children, allowedSubscriptions }) => {
  const { isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0()
  const router = useRouter()
  const { subscription } = useSubscription()

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

  if (!subscription) {
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

  if (!allowedSubscriptions.includes(subscription)) {
    router.push('/permission-required')
    return null
  }

  return <>{children}</>
}
