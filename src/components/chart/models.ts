import {
  IndicatorCategory,
  Instrument,
  PriceMoveType,
  SignalDirectionType,
  SizeIndexType,
  TimeFrame,
  TimeOutlookType,
  VolatilityIndexType,
  VolumeIndexType,
  ZoneImportanceType,
  ZoneType
} from 'types/options'
import { Tag } from 'types/tags'

export interface Candle {
  time: number
  open: number
  high: number
  low: number
  close: number
}

export interface Volume {
  time: number
  value: number
  color: string
}

export interface InstrumentDetails {
  instrument: Instrument
  timeFrame: TimeFrame
  precision: number
  minMove: number
}

export interface CandlesResponse {
  candles: Candle[]
  volumes: Volume[]
  isLastBatch: boolean
}

export interface Indicator {
  id: string
  signalId: string
  value: string
  versionSpeed: string
  indicatorCategory: IndicatorCategory
  indicatorName: string
  signalName: string
  tag: Tag
  isRenderable: boolean
  isAlreadyFormatted: boolean
}

export interface IndicatorsResponse {
  indicators: Indicator[]
  candleAnalysis: CandleAnalysisDto
}

export interface IndicatorInfoResponse {
  infoHtml: string
}

export interface IndicatorValueDto {
  values: ChartValue[]
  source?: IndicatorValueDto
}

export interface PivotsResponse {
  highs: ChartValue[]
  lows: ChartValue[]
}

export interface ChartValue {
  time: number
  value: number
}

export interface IndicatorsCalculation {
  indicatorName: string
  tag: Tag
  isOverlay: boolean
  signals: number[]
  signalId: string
  indicatorId: string
}

export interface CandleAnalysisDto {
  volumeIndexType: string
  volatilityIndexType: string
  sizeIndexType: string
  isLastRenkoUp: boolean
  isUpDirection: boolean
  volume: number
  volumePercentile?: number
  changePercentile?: number
  volatilityPercentile?: number
  indecisivePatterns: string[]
  bullishPatterns: string[]
  bearishPatterns: string[]
}

export interface GetMarketMovesResponse {
  marketMovesTimeOutlook: MarketMovesTimeOutlookDto[]
}

export interface MarketMovesTimeOutlookDto {
  timeOutlook: TimeOutlookType
  marketMoves: PriceMoveDto[]
}

export interface GetCurrentMarketMoveResponse {
  marketMovesTimeOutlook: CurrentMarketMoveTimeOutlookDto[]
}

export interface CurrentMarketMoveTimeOutlookDto {
  timeOutlook: TimeOutlookType
  marketMove: PriceMoveDto
}

export interface PriceMoveDto {
  id: string
  startTime: number
  endTime: number
  calculationTime: number
  volumeIndexType: VolumeIndexType
  volatilityIndexType: VolatilityIndexType
  sizeIndexType: SizeIndexType
  number: number
  priceMoveType: PriceMoveType
  efficiencyRatio: number
  isUpDirection: boolean
  isWeakMove: boolean
  isCurrent: boolean
}

export interface GetPriceZonesDto {
  imbalances: ImbalanceDto[]
  resistanceLines: SupportResistanceLineDto[]
  supportLines: SupportResistanceLineDto[]
}

export interface SupportResistanceLineDto {
  priceUpperBoundary: number
  priceBottomBoundary: number
  zoneType?: ZoneType
  level: number
  importance: ZoneImportanceType
  timeFrame: TimeFrame
}

export interface ImbalanceDto {
  candleTime: number
  priceUpperBoundary: number
  priceBottomBoundary: number
  signalDirection: SignalDirectionType
  timeFrame: TimeFrame
}

export interface GetTradingInsightsRequest {
  symbol: symbol
  timeFrame: TimeFrame
  candleDateTime: Date
}

export interface GetTradingInsightsResponse {
  tags: Tag[]
  structureInsights: StructureInsights
  lastSignificantCandleInsights: LastSignificantCandleInsightsDto
  momentumInsights: IndicatorsInsightsDto
  trendInsights: IndicatorsInsightsDto
  reversalInsights: string
  volatilityInsights: string
  volumeInsights: string
  candleInsights: CandleInsightsDto
  priceLevelsInsights: PriceLevelsInsightsDto
}

export enum StructureInsightType {
  BullishContinuation = 'BullishContinuation',
  BearishContinuation = 'BearishContinuation',
  BullishReversal = 'BullishReversal',
  BearishReversal = 'BearishReversal',
  RangeBoundMarketSignal = 'RangeBoundMarketSignal'
}

export type LastSignificantCandleInsightsDto = {
  message: string
  candleDateTime: number
}

export type IndicatorsInsightsDto = {
  message: string
  bullish: number
  bearish: number
}

export type CandleInsightsDto = {
  message: string
}

export interface PriceLevelsInsightsDto {
  message: string
  isInZone: boolean
  inZoneImportance: string
  isInZoneType: string
  isCloseToResistanceZone: boolean
  closeToResistanceZoneImportance: string
  isCloseToSupportZone: boolean
  closeToSupportZoneImportance: string
  pipsDistanceOfNextHighResistanceZone: number
  pipsDistanceOfNextHighSupportZone: number
}

export type FilterCondition = 'AND' | 'OR'

export interface FilterCriteria {
  field: string
  value: string
}

export interface CompositeFilter {
  condition: FilterCondition
  children: (CompositeFilter | FilterCriteria)[]
}

export interface FilterMatchingCandlesResponse {
  matches: ConditionMatchInstanceDto[]
  bullBearRatio: number
  profitFactor: number
  totalBullish: number
  totalBearish: number
}

export interface ConditionMatchInstanceDto {
  candleTime: number
  priceMoveNumber?: number
  moveUpPips?: number
  moveDownPips?: number
}

export interface GetMultiFrameAnalysisRequest {
  symbol: string
  timeFrame: TimeFrame
  candleDateTime: Date
}

export interface GetMultiFrameAnalysisResponse {
  timeFramesAnalysis: GetMultiFrameAnalysisItem[]
}

export interface GetMultiFrameAnalysisItem {
  timeFrame: TimeFrame
  trend: PercentageDistribution
  momentum: PercentageDistribution
  momentumTags: Tag[]
  trendTags: Tag[]
  volatilityTags: Tag[]
  volumeTags: Tag[]
  resistance: PriceZoneMultiFrameInfo
  support: PriceZoneMultiFrameInfo
  candleAnalysis: CandleAnalysisDto
  structure: StructureMultiFrameInsightsDto
}

export interface PercentageDistribution {
  bullish: number
  bearish: number
}

export interface StructureInsights {
  insight: StructureInsightType
  sequence: PriceMoveType[]
  isWeakMove: boolean
  message: string
}

export type CandleReceivedSignalR = {
  candle: Candle
  volume: Volume
  symbol: Instrument
  timeFrame: TimeFrame
}

export interface PriceZoneMultiFrameInfo {
  importanceOfNextLevel?: ZoneImportanceType
  pipsToNextLevel: number
  currentZoneImportance?: ZoneImportanceType
  dateTime: number
}

export interface StructureMultiFrameInsightsDto {
  tags: Tag[]
  priceMoveSequence: PriceMoveType[]
  direction: SignalDirectionType
}
