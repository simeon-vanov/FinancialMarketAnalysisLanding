import { useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Badge, Box, Button, Collapse, ListItem, Tooltip } from '@mui/material'
import type { ListItemProps } from '@mui/material'
import { ChevronDown as ChevronDownIcon } from 'icons/chevron-down'
import { ChevronRight as ChevronRightIcon } from 'icons/chevron-right'
import { useSubscription } from 'hooks/use-subscription'
import { Subscription } from 'contexts/subscription-context'
import { toPascalCase } from 'utils/words-utils'
import { useRouter } from 'next/router'

interface DashboardSidebarItemProps extends ListItemProps {
  active?: boolean
  children?: ReactNode
  chip?: ReactNode
  depth: number
  icon?: ReactNode
  info?: ReactNode
  open?: boolean
  path?: string
  subscription?: Subscription
  title: string
}

interface DashboardSidebarButtonProps {
  active?: boolean
  icon?: ReactNode
  chip?: ReactNode
  path?: string
  title: string
  info?: ReactNode
  paddingLeft: number
  disabled?: boolean
}

const DashboardSidebarButton = ({
  active,
  icon,
  chip,
  path,
  title,
  info,
  paddingLeft,
  disabled
}: DashboardSidebarButtonProps) => {
  const router = useRouter()
  return (
    <Button
      startIcon={icon}
      endIcon={chip}
      disableRipple
      sx={{
        borderRadius: 1,
        color: 'neutral.300',
        justifyContent: 'flex-start',
        pl: `${paddingLeft}px`,
        pr: 3,
        textAlign: 'left',
        textTransform: 'none',
        width: '100%',
        ...(active && {
          backgroundColor: 'rgba(255,255,255, 0.08)',
          color: 'secondary.main',
          fontWeight: 'fontWeightBold'
        }),
        '& .MuiButton-startIcon': {
          color: active ? 'secondary.main' : 'neutral.400'
        },
        '&:hover': {
          backgroundColor: 'rgba(255,255,255, 0.08)'
        },
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      onClick={() => !disabled && router.push(path as string)}
    >
      <Box sx={{ flexGrow: 1 }}>{title}</Box>
      {info}
    </Button>
  )
}

export const DashboardSidebarItem: FC<DashboardSidebarItemProps> = (props) => {
  const {
    active,
    children,
    chip,
    depth,
    icon,
    info,
    open: openProp,
    path,
    title,
    subscription: itemSubscription,
    ...other
  } = props
  const [open, setOpen] = useState<boolean>(!!openProp)
  const { subscription, premiumAllowedSubscriptions, ultimateAllowedSubscriptions } = useSubscription()
  const allowedSubscriptions =
    itemSubscription == 'premium' ? premiumAllowedSubscriptions : ultimateAllowedSubscriptions

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen)
  }

  let paddingLeft = 24

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth
  }

  // Branch
  if (children) {
    return (
      <ListItem
        disableGutters
        sx={{
          display: 'block',
          mb: 0.5,
          py: 0,
          px: 2
        }}
        {...other}
      >
        <Button
          endIcon={!open ? <ChevronRightIcon fontSize='small' /> : <ChevronDownIcon fontSize='small' />}
          disableRipple
          onClick={handleToggle}
          startIcon={icon}
          sx={{
            color: active ? 'secondary.main' : 'neutral.300',
            justifyContent: 'flex-start',
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            },
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : 'neutral.400'
            },
            '& .MuiButton-endIcon': {
              color: 'neutral.400'
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
          {info}
        </Button>
        <Collapse in={open} sx={{ mt: 0.5 }}>
          {children}
        </Collapse>
      </ListItem>
    )
  }

  const allowed = !itemSubscription || allowedSubscriptions.includes(subscription ?? 'basic')
  // Leaf
  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
    >
      {allowed && (
        <DashboardSidebarButton
          active={active}
          chip={chip}
          icon={icon}
          info={info}
          path={path}
          title={title}
          paddingLeft={paddingLeft}
        />
      )}
      {!allowed && (
        <Badge
          badgeContent={toPascalCase(itemSubscription ?? '')}
          color='primary'
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <Tooltip title='This feature is available for premium users only'>
            <span>
              <DashboardSidebarButton
                active={active}
                chip={chip}
                icon={icon}
                info={info}
                path={path}
                title={title}
                paddingLeft={paddingLeft}
                disabled={true}
              />
            </span>
          </Tooltip>
        </Badge>
      )}
    </ListItem>
  )
}
