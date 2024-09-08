import ReactGA from 'react-ga'
import { clarity } from 'react-microsoft-clarity'

interface GTMConfig {
  containerId?: string
}

const warn = (...args: unknown[]) => {
  console.warn(...args)
}

class GTM {
  CONTAINER_ID?: string

  initialized = false

  configure(config: GTMConfig) {
    if (!config.containerId) {
      warn('GTM requires a GTM ID to be loaded.')
      return
    }

    this.CONTAINER_ID = config.containerId
  }

  initialize() {
    if (this.initialized) {
      warn('GTM can only be initialized once.')
      return
    }

    if (process.env.NODE_ENV === 'development') {
      return
    }

    clarity.init('nzf7a3igh9')
    ReactGA.initialize('G-NFTBJWCQLY')

    // Maybe you want to load events from server side (in NextJS apps for example),
    // those can be queued.
    // SSR queued events can be loaded in the initialize script.
    // For the moment we do not implement it, but in future we might add it.
  }

  // eslint-disable-next-line class-methods-use-this
  push() {
    if (!window) {
      warn('GTM push works only on client side.')
      return
    }

    ReactGA.pageview(window.location.pathname)
  }
}

// Singleton
export const gtm = new GTM()
