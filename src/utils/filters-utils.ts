import { Tag } from 'types/tags'
import { CompositeFilter } from '../components/chart/models'
import { tradingInsightTagValues } from 'types/tag-filter'

export const createGroups = (selectedTradingInsights: Tag[]): { [group: string]: Tag[] } =>
  selectedTradingInsights.reduce((groups: { [group: string]: Tag[] }, insight) => {
    const filter = tradingInsightTagValues.find((filter) => filter.tag === insight)
    if (filter) {
      const group = `${filter.uiGroup}/${filter.group}`
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(insight)
    }
    return groups
  }, {})

export const createUiGroups = (selectedTradingInsights: Tag[]): { [group: string]: Tag[] } =>
  selectedTradingInsights.reduce((groups: { [group: string]: Tag[] }, insight) => {
    const filter = tradingInsightTagValues.find((filter) => filter.tag === insight)
    if (filter) {
      const group = filter.uiGroup
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(insight)
    }
    return groups
  }, {})

export const createCompositeFilter = (groupedTradingInsights: { [group: string]: Tag[] }): CompositeFilter => {
  const compositeFilter: CompositeFilter = {
    condition: 'AND',
    children: []
  }

  Object.entries(groupedTradingInsights).forEach(([group, insights]) => {
    const groupFilter: CompositeFilter = {
      condition: 'OR',
      children: insights.map((insight) => ({
        field: group,
        value: insight
      }))
    }

    compositeFilter.children.push(groupFilter)
  })

  return compositeFilter
}
