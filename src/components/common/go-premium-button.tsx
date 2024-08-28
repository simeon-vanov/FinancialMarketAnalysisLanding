import { Button, Tooltip, Box, Typography, useTheme } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { styled } from '@mui/system'
import { useAuth0 } from '@auth0/auth0-react'

export const PremiumButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.warning.main,
  color: 'black',
  textTransform: 'none',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  '&:focus': {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  '&:active': {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  '&:hover, &:active': {
    backgroundColor: 'transparent'
  }
}))

const TooltipContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  textAlign: 'center',
  borderRadius: 0
}))

const GoPremiumButton = () => {
  const theme = useTheme()
  const { user } = useAuth0()

  const handleGoPremium = () => {
    if (!user) return
    window.open(`${process.env.NEXT_PUBLIC_STRIPE_PAYMENT_MONTHLY}?prefilled_email=${user.email}`, '_blank')
  }

  return (
    <Tooltip
      title={
        <TooltipContent>
          <Typography variant='h6' gutterBottom>
            Go Premium
          </Typography>
          <Typography variant='body2'>Skyrocket your trading with actionable insights on market conditions.</Typography>
          <Typography variant='body2' fontWeight='bold'>
            Only for EUR 12.99/month.
          </Typography>
        </TooltipContent>
      }
      placement='bottom'
      arrow
    >
      <PremiumButton startIcon={<StarIcon />} theme={theme} onClick={handleGoPremium}>
        Go Premium
      </PremiumButton>
    </Tooltip>
  )
}

export default GoPremiumButton
