import { SplashScreen } from 'components/common/splash-screen'
import { useSubscription } from 'hooks/use-subscription'
import { useAuth0 } from '@auth0/auth0-react'
import { NextPage } from 'next'
import { DashboardLayout } from 'components/common/dashboard-layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const StartTrial: NextPage = () => {
  const { subscription, isLoading: subscriptionIsLoading } = useSubscription()
  const { isLoading, user, isAuthenticated, loginWithRedirect } = useAuth0()
  const router = useRouter()

  useEffect(() => {
    if (!user || subscriptionIsLoading) {
      return
    }

    if (subscription === 'premium') {
      router.push('/')
    } else {
      window.open(`${process.env.NEXT_PUBLIC_STRIPE_PAYMENT_MONTHLY}?prefilled_email=${user.email}`, '_blank')
    }
  }, [subscription, subscriptionIsLoading, user])

  if (isLoading || !subscriptionIsLoading) {
    return <SplashScreen />
  }

  if (!isAuthenticated) {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
        redirect_uri: `${process.env.NEXT_PUBLIC_AUTH0_CALLBACK}/start-trial`
      }
    })
  }

  return <SplashScreen />
}

StartTrial.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default StartTrial
