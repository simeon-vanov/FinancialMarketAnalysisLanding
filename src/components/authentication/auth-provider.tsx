import React from 'react'
import { Auth0Provider, AppState } from '@auth0/auth0-react'
import { useRouter } from 'next/router'

interface Auth0ProviderWithHistoryProps {
  children: React.ReactNode
}

const Auth0ProviderWithHistory: React.FC<Auth0ProviderWithHistoryProps> = ({ children }) => {
  const router = useRouter()

  const onRedirectCallback = (appState?: AppState) => {
    router.push(appState?.returnTo || router.pathname)
  }

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: process.env.NEXT_PUBLIC_AUTH0_CALLBACK,
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        scope: 'profile email read:screener read:insights',
        responseType: 'token id_token'
      }}
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory
