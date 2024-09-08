import { useEffect } from 'react'
import type { NextPage } from 'next'
import { gtm } from 'lib/gtm'
import { DashboardLayout } from 'components/common/dashboard-layout'
import BlogPostList from 'components/blog/blog-post-list'

const BlogIntroduction: NextPage = () => {
  useEffect(() => {
    gtm.push()
  }, [])

  return (
    <BlogPostList
      category='introduction'
      title='Introduction to Decode the Trade'
      subTitle='Discover how our platform can simplify your trading life.'
    />
  )
}

BlogIntroduction.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default BlogIntroduction
