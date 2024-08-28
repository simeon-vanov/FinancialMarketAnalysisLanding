import IconButton from '@mui/material/IconButton'

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded'
import { useSettings } from 'hooks/use-settings'

export default function ToggleColorMode() {
  const { settings, saveSettings } = useSettings()
  const handleThemeToggle = () => {
    saveSettings({ ...settings, theme: settings.theme == 'dark' ? 'light' : 'dark' })
  }

  return (
    <IconButton
      onClick={handleThemeToggle}
      color='primary'
      aria-label='Theme toggle button'
      size='small'
      sx={{ ml: 1 }}
    >
      {settings.theme === 'dark' ? <WbSunnyRoundedIcon fontSize='small' /> : <ModeNightRoundedIcon fontSize='small' />}
    </IconButton>
  )
}
