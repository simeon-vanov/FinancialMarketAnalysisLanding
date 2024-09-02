import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface StartTrialButtonProps extends ButtonProps {
  // Add any additional props specific to StartTrialButton here
}

export const StartTrialButton: React.FC<StartTrialButtonProps> = (props) => {
  const { t } = useTranslation()
  const handleStartTrial = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    })
  }

  return (
    <Button variant='contained' onClick={handleStartTrial} {...props}>
      {t('Join the waitlist')}
    </Button>
  )
}
