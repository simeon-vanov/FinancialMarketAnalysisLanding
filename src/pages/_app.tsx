import { useEffect } from 'react'
import type { FC, JSXElementConstructor, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { Toaster } from 'react-hot-toast'
import nProgress from 'nprogress'
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { RTL } from '../components/common/rtl'
import { SettingsConsumer, SettingsProvider } from '../contexts/settings-context'
import { gtmConfig } from 'configs/urls'
import { gtm } from '../lib/gtm'
import { createTheme } from '../theme'
import { createEmotionCache } from '../utils/create-emotion-cache'
import '../i18n'
import 'styles/global.css'
import Auth0ProviderWithHistory from 'components/authentication/auth-provider'
import { useAxiosInterceptor } from 'configs/axios'
import { SubscriptionProvider } from 'contexts/subscription-context'

type EnhancedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

const clientSideEmotionCache = createEmotionCache()

const App: FC<EnhancedAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    gtm.initialize(gtmConfig)
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Decode The Trade</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Auth0ProviderWithHistory>
        <SubscriptionProvider>
          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => (
                <ThemeProvider
                  theme={createTheme({
                    direction: settings.direction,
                    responsiveFontSizes: settings.responsiveFontSizes,
                    mode: settings.theme
                  })}
                >
                  <RTL direction={settings.direction}>
                    <CssBaseline />
                    <Toaster position='top-center' />
                    <AppLayoutComponent Component={Component} pageProps={pageProps} getLayout={getLayout} />
                  </RTL>
                </ThemeProvider>
              )}
            </SettingsConsumer>
          </SettingsProvider>
        </SubscriptionProvider>
      </Auth0ProviderWithHistory>
    </CacheProvider>
  )
}

const AppLayoutComponent: FC<{
  Component: NextPage
  pageProps: any
  getLayout: (page: ReactElement<any, string | JSXElementConstructor<any>>) => React.ReactNode
}> = ({ Component, pageProps, getLayout }) => {
  useAxiosInterceptor()
  return getLayout(<Component {...pageProps} />)
}

export default App
