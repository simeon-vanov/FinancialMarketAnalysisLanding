import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useSubscription } from 'hooks/use-subscription'

interface StartTrialButtonProps extends ButtonProps {
  // Add any additional props specific to StartTrialButton here
}

export const StartTrialButton: React.FC<StartTrialButtonProps> = (props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { subscription } = useSubscription()
  const handleStartTrial = () => {
    router.push('/start-trial')
  }

  if (subscription === 'premium') {
    return null
  }

  return (
    <Button variant='contained' onClick={handleStartTrial} {...props}>
      {t('Try for Free')}
    </Button>
  )
}
