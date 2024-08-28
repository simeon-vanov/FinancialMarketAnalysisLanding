import type { Direction, Theme as MuiTheme } from '@mui/material'
import { createTheme as createMuiTheme, responsiveFontSizes } from '@mui/material/styles'
import { baseThemeOptions } from './base-theme-options'
import { darkThemeOptions } from './dark-theme-options'
import { lightThemeOptions } from './light-theme-options'

interface Neutral {
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

declare module '@mui/material/styles' {
  interface Palette {
    neutral?: Neutral
  }

  interface PaletteOptions {
    neutral?: Neutral
  }
}

interface ThemeConfig {
  direction?: Direction
  responsiveFontSizes?: boolean
  mode: 'light' | 'dark'
}

export const createTheme = (config: ThemeConfig): MuiTheme => {
  let theme = createMuiTheme(baseThemeOptions, config.mode === 'dark' ? darkThemeOptions : lightThemeOptions, {
    direction: config.direction
  })

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  return theme
}

import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    color: {
      primary: string
      positive: string
      negative: string
    }
  }
}

// You are also able to use a 3rd party theme this way:
import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}
