import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import { Chart } from 'components/common/chart'
import { FC } from 'react'
import { VolatilityData } from './models'
import { css } from '@emotion/react'

interface VolatilityAnalysisChartProps {
  data: VolatilityData
  onClickCategory: (category: string) => void
}

const VolatilityAnalysisChart: FC<VolatilityAnalysisChartProps> = ({ data, onClickCategory }) => {
  const theme = useTheme()

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      events: {
        click: function (event, chartContext, options) {
          const clickedCategory = options.config?.xaxis?.categories?.[options?.dataPointIndex]
          if (clickedCategory) {
            onClickCategory(clickedCategory)
          }
        }
      }
    },
    colors: ['#13affe', '#fbab49'],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1
    },
    grid: {
      borderColor: theme.palette.divider,
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    legend: {
      labels: {
        colors: theme.palette.text.secondary
      },
      show: true
    },
    plotOptions: {
      bar: {
        columnWidth: '40%'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        show: true,
        color: theme.palette.divider
      },
      axisTicks: {
        show: true,
        color: theme.palette.divider
      },
      categories: data?.currencies,
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    tooltip: {
      enabled: true,
      shared: false,
      y: {
        formatter: (value: number, opts: any) => {
          if (opts.seriesIndex === 0) {
            return `${value} average points`
          }

          return `${value} pips`
        }
      }
    }
  }

  const chartSeries = [
    {
      data: data?.volumes,
      name: 'Volume'
    },
    {
      data: data?.volatilities,
      name: 'Volatility'
    }
  ]

  return <Chart options={chartOptions} series={chartSeries} type='bar' css={styles} height={300} />
}

const styles = css`
  .apexcharts-bar-series .apexcharts-bar-area {
    cursor: pointer;
  }
`

export default VolatilityAnalysisChart
