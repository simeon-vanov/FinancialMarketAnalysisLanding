import { useEffect } from 'react'
import type { NextPage } from 'next'
import { gtm } from 'lib/gtm'
import { DashboardLayout } from 'components/common/dashboard-layout'
import BlogPostList from 'components/blog/blog-post-list'

const BlogBasicsOfTrading: NextPage = () => {
  useEffect(() => {
    gtm.push()
  }, [])

  return (
    <BlogPostList
      category='basics'
      title='Basic of Trading'
      subTitle='Learn the basics of what trading means and types of trading.'
    />
  )
}

BlogBasicsOfTrading.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default BlogBasicsOfTrading
