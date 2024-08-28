export interface Post {
  id: string
  contentPath: string
  cover: string
  readTime: string
  shortDescription: string
  title: string
  videoUrl?: string
  category:
    | 'introduction'
    | 'market-overview'
    | 'basics'
    | 'technical-analysis'
    | 'fundamental-analysis'
    | 'risk-management'
    | 'strategies'
    | 'psychology'
    | 'how-to-use'
}
