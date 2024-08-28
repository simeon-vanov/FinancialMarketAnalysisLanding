import { Interpolation, Theme } from '@emotion/react'

declare global {
  type DivProps = React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement> & {
      css?: Interpolation<Theme>
    }

  type FormProps = React.ClassAttributes<HTMLFormElement> &
    React.FormHTMLAttributes<HTMLFormElement> & {
      css?: Interpolation<Theme>
    }

  type ButtonProps = React.ClassAttributes<HTMLButtonElement> &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
      css?: Interpolation<Theme>
    }
}
