export const calculateDistance = (linePrice: number, currentPrice: number, minMove: number) =>
  ((linePrice - currentPrice) / minMove / 10)
