import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'

const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            screen_hint: 'signup'
          }
        })
      }
    >
      Register
    </Button>
  )
}

export default SignUpButton
