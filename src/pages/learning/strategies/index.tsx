import { useEffect } from 'react'
import type { NextPage } from 'next'
import { gtm } from 'lib/gtm'
import { DashboardLayout } from 'components/common/dashboard-layout'
import BlogPostList from 'components/blog/blog-post-list'

const BlogStrategies: NextPage = () => {
  useEffect(() => {
    gtm.push()
  }, [])

  return (
    <BlogPostList
      category='strategies'
      title='Trading Strategies'
      subTitle='Learn the how to apply your knowledge to a successful trading strategy.'
    />
  )
}

BlogStrategies.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default BlogStrategies
