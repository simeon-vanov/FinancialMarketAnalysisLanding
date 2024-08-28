import { createContext, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import { jwtDecode, JwtPayload } from 'jwt-decode'

export type Subscription = 'basic' | 'premium' | 'ultimate'

export interface SubscriptionContextValue {
  subscription: Subscription | null
  isLoading: boolean
  premiumAllowedSubscriptions: Subscription[]
  ultimateAllowedSubscriptions: Subscription[]
  basicAllowedSubscriptions: Subscription[]
}

interface SubscriptionProviderProps {
  children: ReactNode
}

type Auth0AccessToken = JwtPayload & {
  permissions: string[]
}

export const SubscriptionContext = createContext<SubscriptionContextValue>({
  subscription: null,
  isLoading: true,
  premiumAllowedSubscriptions: ['premium', 'ultimate'],
  ultimateAllowedSubscriptions: ['ultimate'],
  basicAllowedSubscriptions: ['basic']
})

export const SubscriptionProvider: FC<SubscriptionProviderProps> = (props) => {
  const { children } = props
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchSubscription = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently()
          const decodedToken = decodeToken(accessToken)
          const permissions = decodedToken?.permissions || []
          const subscription = getSubscriptionFromPermissions(permissions)

          setSubscription(subscription)
          setIsLoading(false)
        } catch (error) {
          console.error(error)
          setSubscription(null)
          setIsLoading(false)
        }
      } else {
        setSubscription(null)
      }
    }

    fetchSubscription()
  }, [isAuthenticated, getAccessTokenSilently])

  const decodeToken = (token: string): Auth0AccessToken => {
    return jwtDecode(token) as Auth0AccessToken
  }

  const getSubscriptionFromPermissions = (permissions: string[]): Subscription => {
    if (permissions?.length) {
      if (permissions.includes('read:insights')) {
        return 'premium'
      }

      if (permissions.includes('ultimate')) {
        return 'ultimate'
      }
    }

    return 'basic'
  }

  return (
    <SubscriptionContext.Provider
      value={{
        isLoading,
        subscription,
        premiumAllowedSubscriptions: ['premium', 'ultimate'],
        ultimateAllowedSubscriptions: ['ultimate'],
        basicAllowedSubscriptions: ['basic']
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

SubscriptionProvider.propTypes = {
  children: PropTypes.node.isRequired
}
