import type { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'

interface GuestGuardProps {
  children: ReactNode
}

export const GuestGuard: FC<GuestGuardProps> = (props) => {
  const { children } = props
  const { isAuthenticated } = useAuth0()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      if (isAuthenticated) {
        router.push('/').catch(console.error)
      } else {
        setChecked(true)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]
  )

  if (!checked) {
    return null
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // not authenticated / authorized.

  return <>{children}</>
}

GuestGuard.propTypes = {
  children: PropTypes.node
}
