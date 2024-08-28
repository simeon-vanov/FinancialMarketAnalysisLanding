import { useEffect } from 'react'
import type { NextPage } from 'next'
import { gtm } from 'lib/gtm'
import { DashboardLayout } from 'components/common/dashboard-layout'
import BlogPostList from 'components/blog/blog-post-list'

const BlogPsychology: NextPage = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <BlogPostList
      category='psychology'
      title='Psychology of Trading'
      subTitle='Learn how to master your emotions and become a successful trader.'
    />
  )
}

BlogPsychology.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default BlogPsychology
