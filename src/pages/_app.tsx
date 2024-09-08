import { useEffect } from 'react'
import type { FC, JSXElementConstructor, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { Toaster } from 'react-hot-toast'
import nProgress from 'nprogress'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { RTL } from '../components/common/rtl'
import { SettingsConsumer, SettingsProvider } from '../contexts/settings-context'
import { gtm } from '../lib/gtm'
import '../i18n'
import 'styles/global.css'
import Auth0ProviderWithHistory from 'components/authentication/auth-provider'
import { useAxiosInterceptor } from 'configs/axios'
import { SubscriptionProvider } from 'contexts/subscription-context'
import getMPTheme from 'src/theme/getMPTheme'

type EnhancedAppProps = AppProps & {
  Component: NextPage
}

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

const App: FC<EnhancedAppProps> = (props) => {
  const { Component, pageProps } = props
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    gtm.initialize()
  }, [])

  return (
    <Auth0ProviderWithHistory>
      <Head>
        <title>Decode The Trade</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <SubscriptionProvider>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => (
              <ThemeProvider theme={createTheme(getMPTheme(settings.theme))}>
                <Head>
                  <title>Decode The Trade</title>
                  <meta name='viewport' content='initial-scale=1, width=device-width' />
                </Head>
                <RTL direction={settings.direction}>
                  <CssBaseline enableColorScheme />
                  <Toaster position='top-center' />
                  <AppLayoutComponent Component={Component} pageProps={pageProps} getLayout={getLayout} />
                </RTL>
              </ThemeProvider>
            )}
          </SettingsConsumer>
        </SettingsProvider>
      </SubscriptionProvider>
    </Auth0ProviderWithHistory>
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
