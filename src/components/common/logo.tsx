import { styled } from '@mui/material/styles'

type Variant = 'logo' | 'logo-2' | 'logo-4'

interface LogoProps {
  variant?: Variant
  width?: number | string
  height?: number | string
  onClick?: () => void
}

const LogoComponent: React.FC<LogoProps> = (props) => {
  const { width, height, variant = 'logo', onClick, ...other } = props

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  // let the cursor be a pointer when the logo is clickable

  return (
    <img
      src={`/static/${variant}.png`}
      alt={`logo variant ${variant}`}
      {...other}
      width={width}
      height={height}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={handleClick}
    />
  )
}

export const Logo = styled(LogoComponent)``
