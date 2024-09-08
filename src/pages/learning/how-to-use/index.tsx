import { useEffect } from 'react'
import type { NextPage } from 'next'
import { gtm } from 'lib/gtm'
import { DashboardLayout } from 'components/common/dashboard-layout'
import BlogPostList from 'components/blog/blog-post-list'

const BlogHowToUse: NextPage = () => {
  useEffect(() => {
    gtm.push()
  }, [])

  return (
    <BlogPostList
      category='how-to-use'
      title='Decode the Trade Guide'
      subTitle='Discover how to take full advantage of our platform.'
    />
  )
}

BlogHowToUse.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default BlogHowToUse
