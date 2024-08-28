import { ApexOptions } from 'apexcharts'
import { Chart } from 'components/common/chart'
import { FC } from 'react'
import { useTheme } from '@mui/material/styles'
import { css } from '@emotion/react'
import { StrengthMeterData } from './models'

interface SymbolStrengthMeterChartProps {
  data: StrengthMeterData
  onClickCategory: (category: string) => void
}

export const SymbolStrengthMeterChart: FC<SymbolStrengthMeterChartProps> = ({ data, onClickCategory }) => {
  const theme = useTheme()

  const colorScale = [
    { from: -10, to: 0, color: '#FF0000' },
    { from: 0, to: 10, color: '#00FF00' }
  ]

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
    colors: ['#6E7AD8', '#4655CE', '#2F3EB1'],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    legend: {
      show: false
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
        show: false
      },
      axisTicks: {
        show: false
      },
      categories: data?.currencies,
      labels: {
        style: {
          colors: '#A3A3A3'
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -12,
        style: {
          colors: '#A3A3A3'
        },
        formatter: function (value) {
          return value.toFixed(2) + '%'
        }
      }
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: colorScale
        }
      }
    }
  }

  const chartSeries = [{ data: data?.series, name: 'Change' }] || []

  return <Chart height={300} options={chartOptions} series={chartSeries} type='bar' css={styles} />
}

const styles = css`
  .apexcharts-bar-series .apexcharts-bar-area {
    cursor: pointer;
  }
`
