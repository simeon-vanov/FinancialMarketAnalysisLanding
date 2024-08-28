import { Period } from 'types/options'
import { IScreenerParameters, ScreenerInstrument, StrengthMeterData, VolatilityData } from './models'
import axiosInstance from 'configs/axios'
import { webApiConfig } from 'configs/urls'
import { PagedDto } from 'apis/models'

export const fetchStrengthMeterData = async (period: Period): Promise<StrengthMeterData> => {
  const params = new URLSearchParams([['period', period]])

  const { data } = await axiosInstance.get(webApiConfig.overviewStrengthMeter, {
    params: params
  })

  return data
}

export const fetchVolatilityData = async (period: Period): Promise<VolatilityData> => {
  const params = new URLSearchParams([['period', period]])

  const { data } = await axiosInstance.get(webApiConfig.overviewVolatility, {
    params: params
  })

  return data
}

export const fetchScreenerData = async (parameters: IScreenerParameters): Promise<PagedDto<ScreenerInstrument>> => {
  const params = new URLSearchParams([['instrumentSearchText', parameters.instrumentSearchText]])

  parameters.timeFrames.forEach((value) => {
    params.append('timeFrames', value)
  })

  parameters.momentum.forEach((value) => {
    params.append('momentum', value)
  })

  parameters.trend.forEach((value) => {
    params.append('trend', value)
  })

  parameters.priceMove.forEach((value) => {
    params.append('priceMove', value)
  })

  parameters.priceLevels.forEach((value) => {
    params.append('priceLevels', value)
  })

  params.append('pageSize', parameters.pageSize.toString())
  params.append('page', parameters.page.toString())

  const { data } = await axiosInstance.get(webApiConfig.overviewScreener, {
    params: params
  })

  return data
}
