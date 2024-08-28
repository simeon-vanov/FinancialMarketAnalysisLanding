import { styled } from '@mui/material/styles'

type Variant = 'logo' | 'logo-2'

interface LogoProps {
  variant?: Variant
  width?: number
  height?: number
}

const LogoComponent: React.FC<LogoProps> = (props) => {
  const { width, height, variant = 'logo', ...other } = props

  return <img src={`/static/${variant}.png`} alt={`logo variant ${variant}`} {...other} width={width} height={height} />
}

export const Logo = styled(LogoComponent)``
