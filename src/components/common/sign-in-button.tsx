import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'

const SignInButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button sx={{ ml: 2 }} onClick={() => loginWithRedirect()}>
      Login
    </Button>
  )
}

export default SignInButton
