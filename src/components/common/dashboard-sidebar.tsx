import { ReactNode, useEffect, useMemo, useRef } from 'react'
import type { FC } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material'
import type { Theme } from '@mui/material'
import { ChartBar as ChartBarIcon } from 'icons/chart-bar'
import { Home as HomeIcon } from 'icons/home'
import { Logo } from './logo'
import { Scrollbar } from './scrollbar'
import { DashboardSidebarSection } from './dashboard-sidebar-section'
import { useSubscription } from 'hooks/use-subscription'
import { toPascalCase } from 'utils/words-utils'
import StarIcon from '@mui/icons-material/Star'
import SchoolIcon from '@mui/icons-material/School'
import PublicIcon from '@mui/icons-material/Public'
import InfoIcon from '@mui/icons-material/Info'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import AssessmentIcon from '@mui/icons-material/Assessment'
import SecurityIcon from '@mui/icons-material/Security'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PsychologyIcon from '@mui/icons-material/Psychology'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import { Subscription } from 'contexts/subscription-context'

interface DashboardSidebarProps {
  onClose?: () => void
  open?: boolean
}

interface Item {
  title: string
  children?: Item[]
  chip?: ReactNode
  icon?: ReactNode
  path?: string
  subscription?: Subscription
}

interface Section {
  title: string
  items: Item[]
}

const getSections = (t: TFunction): Section[] => [
  {
    title: t('Browse'),
    items: [
      {
        title: t('Home'),
        path: '/',
        icon: <HomeIcon fontSize='small' />
      },
      {
        title: t('Screener'),
        path: '/screener',
        icon: <ChartBarIcon fontSize='small' />
      },
      {
        title: t('Insights'),
        path: '/chart',
        icon: <StarIcon fontSize='small' />,
        subscription: 'premium'
      },
      {
        title: t('LearningHub'),
        path: '/chart',
        icon: <SchoolIcon fontSize='small' />,
        children: [
          {
            title: t('Introduction'),
            path: '/learning/introduction',
            icon: <InfoIcon fontSize='small' />
          },
          {
            title: t('Market Overview'),
            path: '/learning/market-overview',
            icon: <PublicIcon fontSize='small' />
          },
          {
            title: t('Basics of Trading'),
            path: '/learning/basics',
            icon: <SchoolIcon fontSize='small' />
          },
          {
            title: t('Technical Analysis'),
            path: '/learning/technical-analysis',
            icon: <ShowChartIcon fontSize='small' />
          },
          {
            title: t('Fundamental Analysis'),
            path: '/learning/fundamental-analysis',
            icon: <AssessmentIcon fontSize='small' />
          },
          {
            title: t('Risk Management'),
            path: '/learning/risk-management',
            icon: <SecurityIcon fontSize='small' />
          },
          {
            title: t('Trading Strategies'),
            path: '/learning/strategies',
            icon: <TrendingUpIcon fontSize='small' />
          },
          {
            title: t('Psychology of Trading'),
            path: '/learning/psychology',
            icon: <PsychologyIcon fontSize='small' />
          },
          {
            title: t('Decode The Trade'),
            path: '/learning/how-to-use',
            icon: <TipsAndUpdatesIcon fontSize='small' />
          }
        ]
      }
    ]
  }
]

export const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const { onClose, open } = props
  const router = useRouter()
  const { t } = useTranslation()
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    noSsr: true
  })
  const sections = useMemo(() => getSections(t), [t])
  const { subscription } = useSubscription()
  const organizationsRef = useRef<HTMLButtonElement | null>(null)
  const handlePathChange = () => {
    if (!router.isReady) {
      return
    }

    if (open) {
      onClose?.()
    }
  }

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  )

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink href='/' passHref>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Logo height={91} width={84} variant='logo-2' />
                </Box>
              </NextLink>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box
                ref={organizationsRef}
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 3,
                  py: '11px',
                  borderRadius: 1
                }}
              >
                <div>
                  <Typography color='inherit' variant='subtitle1'>
                    Subscription
                  </Typography>
                  <Typography color='neutral.400' variant='body2'>
                    {toPascalCase(subscription ?? '')}
                  </Typography>
                </div>
              </Box>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: '#2D3748', // dark divider
              my: 3
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2
                  }
                }}
                {...section}
              />
            ))}
          </Box>
        </Box>
      </Scrollbar>
    </>
  )

  if (lgUp) {
    return <></>
  }

  return (
    <Drawer
      anchor='left'
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant='temporary'
    >
      {content}
    </Drawer>
  )
}
