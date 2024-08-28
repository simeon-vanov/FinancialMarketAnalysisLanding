import { StructureInsightType } from 'components/chart/models'

export const determineVolumeMessage = (
  isWeakMove: boolean,
  structureInsightType: StructureInsightType,
  lastMarketMove: string
): string => {
  const volumeBehindMove =
    (isWeakMove &&
      structureInsightType == StructureInsightType.BullishContinuation &&
      'Volume behind bullish move is weak which means there might be not enough interest to drive the price higher') ||
    (isWeakMove &&
      structureInsightType == StructureInsightType.BearishContinuation &&
      'Volume behind bearish move is weak which means there might be not enough sellers to drive the price lower') ||
    (isWeakMove && `Volume behind ${lastMarketMove} is weak which means the price might reverse or consolidate`) ||
    (structureInsightType == StructureInsightType.BullishContinuation &&
      'Volume behind the bullish move is good enough to suggest a next upword movement') ||
    (structureInsightType == StructureInsightType.BearishContinuation &&
      'Volume behind the bearish move is good enough to suggest a next downword movement') ||
    'There is enough volume behind the previous move which may suggest a next movement is soon to come'

  return volumeBehindMove
}
