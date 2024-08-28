import type { ApexOptions } from 'apexcharts'
import { Box, Divider, Grid, List, ListItem, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Chart } from 'components/common/chart'
import { Indicator } from './models'
import { Tag, tagMap } from 'types/tags'
import { useTranslation } from 'react-i18next'

export interface IndicatorsSignalTableProps {
  indicators: Indicator[]
  onTagSearch: (tag: Tag) => void
  searchedTag: Tag | undefined
}

const TotalSignalsChart = ({ indicators, onTagSearch, searchedTag }: IndicatorsSignalTableProps) => {
  const theme = useTheme()
  const t = useTranslation().t

  if (indicators.length === 0) return null

  const indicatorDirectionGroups = Object.entries(
    indicators.reduce(
      (acc, indicator) => {
        const key = `${tagMap.get(indicator.tag)?.direction}`
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(indicator)
        return acc
      },
      {} as { [key: string]: Indicator[] }
    )
  )

  const indicatorTagGroups: [string, Indicator[]][] = Object.entries(
    indicators.reduce(
      (acc, indicator) => {
        const key = indicator.tag
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(indicator)
        return acc
      },
      {} as { [key: string]: Indicator[] }
    )
  )

  const data = {
    series: indicatorDirectionGroups.map(([key, directionIndicators]) => {
      return {
        color: theme.palette[tagMap.get(directionIndicators[0].tag)?.color ?? 'info'].main,
        data: (directionIndicators.length / indicators.length) * 100,
        label: key
      }
    })
  }

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: data.series.map((item) => item.color),
    fill: {
      opacity: 1
    },
    labels: data.series.map((x) => x.label),
    plotOptions: {
      radialBar: {
        track: {
          background: theme.palette.background.default
        },
        dataLabels: {
          value: {
            formatter: function (val) {
              if (isNaN(val)) return ''

              return Number(val).toFixed(1) + '%'
            }
          }
        }
      }
    },
    theme: {
      mode: theme.palette.mode
    }
  }

  const chartSeries = data.series.map((item) => item.data)

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item md={6} xs={12}>
        <Chart height={300} options={chartOptions} series={chartSeries} type='radialBar' />
      </Grid>
      <Grid item md={6} xs={12}>
        <Typography color='textSecondary' variant='body2'>
          Total
        </Typography>
        <Typography variant='h5'>{indicators.length}</Typography>
        <Divider sx={{ mt: 1 }} />
        <List disablePadding>
          {indicatorTagGroups.map(([key, indicators], index) => (
            <ListItem
              divider={index < indicatorTagGroups.length - 1}
              key={key}
              sx={{
                display: 'flex',
                cursor: 'pointer',
                backgroundColor: searchedTag === indicators[0].tag ? theme.palette.action.selected : 'transparent'
              }}
              onClick={() => onTagSearch(indicators[0].tag)}
            >
              <Box
                sx={{
                  border: 3,
                  borderColor: theme.palette[tagMap.get(indicators[0].tag)?.color ?? 'info'].main,
                  borderRadius: '50%',
                  height: 16,
                  mr: 1,
                  width: 16
                }}
              />
              <Typography color='textSecondary' variant='body2'>
                {t(key)}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant='subtitle2'>{indicators.length}</Typography>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  )
}

export default TotalSignalsChart
