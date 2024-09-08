import { useEffect } from 'react'
import type { NextPage } from 'next'
import { gtm } from 'lib/gtm'
import { DashboardLayout } from 'components/common/dashboard-layout'
import BlogPostList from 'components/blog/blog-post-list'

const BlogMarketOverview: NextPage = () => {
  useEffect(() => {
    gtm.push()
  }, [])

  return (
    <BlogPostList
      category='market-overview'
      title='Market Overview'
      subTitle='What is the market ? Who trades and what can be traded ? Find out here'
    />
  )
}

BlogMarketOverview.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default BlogMarketOverview
