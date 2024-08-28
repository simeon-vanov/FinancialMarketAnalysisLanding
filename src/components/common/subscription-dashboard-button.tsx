import GoPremiumButton from './go-premium-button'
import { useSubscription } from 'hooks/use-subscription'

export const SubscriptionDashboardButton = () => {
  const { subscription } = useSubscription() // Replace useSubscription with your actual subscription hook
  if (subscription === 'basic') {
    return <GoPremiumButton />
  } else {
    return null
  }
}
