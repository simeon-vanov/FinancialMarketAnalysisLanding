import { useContext } from 'react'
import { SubscriptionContext, SubscriptionContextValue } from 'contexts/subscription-context'

export const useSubscription = (): SubscriptionContextValue => useContext(SubscriptionContext)
