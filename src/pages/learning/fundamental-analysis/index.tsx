import { useEffect } from 'react'
import type { NextPage } from 'next'
import { gtm } from 'lib/gtm'
import { DashboardLayout } from 'components/common/dashboard-layout'
import BlogPostList from 'components/blog/blog-post-list'

const BlogFundamentalAnalysis: NextPage = () => {
  useEffect(() => {
    gtm.push()
  }, [])

  return (
    <BlogPostList
      category='fundamental-analysis'
      title='Fundamental Analysis'
      subTitle='Learn how to use fundamental analysis to enhance your trading skills.'
    />
  )
}

BlogFundamentalAnalysis.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default BlogFundamentalAnalysis
