import { useEffect, useState } from 'react'
import { ImbalanceDto, SupportResistanceLineDto } from './models'
import { Card, CardHeader, Divider, Button } from '@mui/material'
import SupportResistanceTable from './support-resistance-table'
import ImbalancesTable from './imbalances-table'
import { useInstrumentDetails } from './contexts/instrument-details-context'
import { useFetchPriceZones } from './hooks/price-zones'
import { calculateDistance } from 'utils/price-levels-utils'

interface PriceZoneProps {
  currentPrice: number
  selectedPriceZones: SupportResistanceLineDto[]
  selectedImbalances: ImbalanceDto[]
  onShowResistanceZones(priceZone: SupportResistanceLineDto[]): void
  onShowSupportZones(priceZone: SupportResistanceLineDto[]): void
  onShowImbalances(imbalances: ImbalanceDto[]): void
  onDeselectImbalances(imbalances: ImbalanceDto[]): void
  onDeselectZones(priceZone: SupportResistanceLineDto[]): void
  type: 'resistance' | 'support' | 'imbalances'
}

const PriceZones: React.FC<PriceZoneProps> = ({
  currentPrice,
  selectedPriceZones,
  selectedImbalances,
  onShowResistanceZones,
  onShowSupportZones,
  onShowImbalances,
  onDeselectImbalances,
  onDeselectZones,
  type
}) => {
  const [imbalances, setImbalances] = useState<ImbalanceDto[]>([])
  const [resistanceLines, setResistanceLines] = useState<SupportResistanceLineDto[]>([])
  const [supportLines, setSupportLines] = useState<SupportResistanceLineDto[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const instrumentDetails = useInstrumentDetails()
  const priceZones = useFetchPriceZones()

  useEffect(() => {
    setIsLoading(true)
    if (!priceZones) return
    setResistanceLines(priceZones.resistanceLines.sort((a, b) => a.level - b.level))
    setSupportLines(priceZones.supportLines)
    setImbalances(priceZones.imbalances)
    setIsLoading(false)
  }, [priceZones])

  const isResistanceSelected = selectedPriceZones.filter((zone) => zone.zoneType == 'Resistance').length > 0
  const isSupportSelected = selectedPriceZones.filter((zone) => zone.zoneType == 'Support').length > 0

  const renderResistance = () => (
    <Card variant='outlined'>
      <CardHeader
        action={
          !isResistanceSelected ? (
            <Button size='small' onClick={() => onShowResistanceZones(resistanceLines)}>
              Add all to chart
            </Button>
          ) : (
            <Button size='small' onClick={() => onDeselectZones(resistanceLines)}>
              Remove all
            </Button>
          )
        }
        title='Resistance Lines'
      />
      <Divider />
      <SupportResistanceTable
        lines={resistanceLines}
        onLineView={(line) => onShowResistanceZones([line])}
        calcDistance={(line) =>
          calculateDistance(line.priceBottomBoundary, currentPrice, instrumentDetails!.minMove).toFixed(1)
        }
        onDeselectLines={onDeselectZones}
        selectedLines={selectedPriceZones}
        isLoading={isLoading}
      />
    </Card>
  )

  const renderSupport = () => (
    <Card variant='outlined'>
      <CardHeader
        action={
          !isSupportSelected ? (
            <Button size='small' onClick={() => onShowSupportZones(supportLines)}>
              Add all to chart
            </Button>
          ) : (
            <Button size='small' onClick={() => onDeselectZones(supportLines)}>
              Remove all
            </Button>
          )
        }
        title='Support Lines'
      />
      <Divider />
      <SupportResistanceTable
        lines={supportLines}
        onLineView={(line) => onShowSupportZones([line])}
        calcDistance={(line) =>
          Math.abs(calculateDistance(line.priceUpperBoundary, currentPrice, instrumentDetails!.minMove)).toFixed(1)
        }
        selectedLines={selectedPriceZones}
        onDeselectLines={onDeselectZones}
        isLoading={isLoading}
      />
    </Card>
  )

  const renderImbalances = () => (
    <Card variant='outlined'>
      <CardHeader
        action={
          !selectedImbalances?.length ? (
            <Button size='small' onClick={() => onShowImbalances(imbalances)}>
              Add all to chart
            </Button>
          ) : (
            <Button size='small' onClick={() => onDeselectImbalances(imbalances)}>
              Remove all
            </Button>
          )
        }
        title='Unfilled Imbalances'
      />
      <Divider />
      <ImbalancesTable
        imbalances={imbalances}
        selectedImbalances={selectedImbalances}
        onLineView={(line) => onShowImbalances([line])}
        onDeselect={(line) => onDeselectImbalances([line])}
        isLoading={isLoading}
        currentPrice={currentPrice}
        instrumentDetails={instrumentDetails}
      />
    </Card>
  )

  if (type == 'resistance') return renderResistance()
  if (type == 'support') return renderSupport()

  return renderImbalances()
}

export default PriceZones
