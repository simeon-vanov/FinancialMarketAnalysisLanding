import { get } from './api'

export const getSymbols = async (
): Promise<string[]> => {
  const data = await get<string[]>('/symbols')

  return data
}