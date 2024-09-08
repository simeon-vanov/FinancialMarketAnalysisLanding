import { useEffect } from 'react'
import type { NextPage } from 'next'
import { gtm } from 'lib/gtm'
import { DashboardLayout } from 'components/common/dashboard-layout'
import BlogPostList from 'components/blog/blog-post-list'

const BlogTechnicalAnalysis: NextPage = () => {
  useEffect(() => {
    gtm.push()
  }, [])

  return (
    <BlogPostList
      category='technical-analysis'
      title='Technical Analysis'
      subTitle='Learn the fundamentals of technical analysis to enhance your trading skills.'
    />
  )
}

BlogTechnicalAnalysis.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default BlogTechnicalAnalysis
