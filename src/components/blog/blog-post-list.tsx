import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import { blogApi } from 'mocks/blog-api'
import { BlogPostCard } from 'components/blog/blog-post-card'
import type { Post } from 'types/blog'

interface BlogPostListProps {
  category: string
  title: string
  subTitle: string
}

const BlogPostList = ({ category, title, subTitle }: BlogPostListProps) => {
  const [posts, setPosts] = useState<Post[]>([])

  const getPosts = async () => {
    try {
      const data = await (await blogApi.getPosts()).filter((post) => post.category === category)

      setPosts(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth='xl'>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='h3' sx={{ mt: 3 }} textAlign='center'>
                {title}
              </Typography>
            </Grid>
            <Grid item xs={12} textAlign='center'>
              <Typography color='textSecondary' variant='subtitle1'>
                {subTitle}
              </Typography>
              <Divider sx={{ my: 3 }} />
            </Grid>

            {posts.map((post) => (
              <Grid key={post.title} item xs={12} sm={6} lg={3} sx={{ px: 2, pb: 2 }}>
                <BlogPostCard
                  id={post.id}
                  cover={post.cover}
                  key={post.title}
                  readTime={post.readTime}
                  shortDescription={post.shortDescription}
                  title={post.title}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default BlogPostList
