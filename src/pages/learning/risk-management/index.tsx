import { useEffect } from 'react'
import type { NextPage } from 'next'
import { gtm } from 'lib/gtm'
import { DashboardLayout } from 'components/common/dashboard-layout'
import BlogPostList from 'components/blog/blog-post-list'

const BlogRiskManagement: NextPage = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <BlogPostList
      category='risk-management'
      title='Risk Management'
      subTitle='Learn the most important part of trading for every succesful trader.'
    />
  )
}

BlogRiskManagement.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default BlogRiskManagement
