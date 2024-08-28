import { useEffect } from 'react'
import { fetchPriceZonesData } from '../api'
import { usePriceZones, useSetPriceZones } from '../contexts/price-zone-context'
import { useInstrumentDetails } from '../contexts/instrument-details-context'
import { useSelectedCandle } from '../contexts/selected-candle-context'
import { GetPriceZonesDto } from '../models'
import { parseToDate } from 'utils/date-utils'

export const useFetchPriceZones = (): GetPriceZonesDto | null => {
  const priceZones = usePriceZones()
  const setPriceZones = useSetPriceZones()
  const instrumentDetails = useInstrumentDetails()
  const candleDateTime = useSelectedCandle()

  useEffect(() => {
    if (!instrumentDetails || !candleDateTime) {
      return
    }

    const currentParams = {
      instrument: instrumentDetails.instrument,
      timeFrame: instrumentDetails.timeFrame,
      candleDateTime: parseToDate(candleDateTime)
    }

    // Check if the current parameters match the last used ones
    if (priceZones?.params === JSON.stringify(currentParams)) {
      return // If they match, do not fetch
    }

    const fetchData = async () => {
      const newPriceZones = await fetchPriceZonesData(
        instrumentDetails.instrument,
        instrumentDetails.timeFrame,
        parseToDate(candleDateTime)
      )
      setPriceZones({
        params: JSON.stringify(currentParams),
        priceZones: {
          imbalances: newPriceZones.imbalances.map((imbalance) => ({
            ...imbalance,
            timeFrame: instrumentDetails.timeFrame
          })),
          resistanceLines: newPriceZones.resistanceLines.map((resistance) => ({
            ...resistance,
            timeFrame: instrumentDetails.timeFrame
          })),
          supportLines: newPriceZones.supportLines.map((support) => ({
            ...support,
            timeFrame: instrumentDetails.timeFrame
          }))
        }
      })
    }

    fetchData()
  }, [candleDateTime, instrumentDetails])

  return priceZones?.priceZones ?? null
}
