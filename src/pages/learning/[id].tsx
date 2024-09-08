import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Box, Button, Container, Divider, Typography } from '@mui/material'
import { ArrowLeft as ArrowLeftIcon } from 'icons/arrow-left'
import { gtm } from 'lib/gtm'
import type { Post } from 'types/blog'
import { blogApi } from 'mocks/blog-api'
import { useRouter } from 'next/router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { DashboardLayout } from 'components/common/dashboard-layout'
import MarkdownWrapper from 'components/common/markdown-wrapper'
import rehypeRaw from 'rehype-raw'

const BlogPostDetails: NextPage = () => {
  const [markdown, setMarkdown] = useState('')
  const [post, setPost] = useState<Post | undefined>()
  const [previous, setPrevious] = useState<Post | undefined>()
  const [next, setNext] = useState<Post | undefined>()

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      blogApi.getPostById(id as string).then(setPost)
      blogApi.getPreviousAndNext(id as string).then((response) => {
        setPrevious(response.previous)
        setNext(response.next)
      })
    }
  }, [id])

  useEffect(() => {
    if (!post) {
      return
    }

    fetch(`${post.contentPath}`)
      .then((response) => response.text())
      .then(setMarkdown)
      .catch((err) => console.error(err))
  }, [post])

  useEffect(() => {
    gtm.push()
  }, [])

  if (!post) {
    return
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth='md'>
          <NextLink href={`/learning/${post.category}`} passHref>
            <Button startIcon={<ArrowLeftIcon fontSize='small' />}>To Learning Hub</Button>
          </NextLink>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              mt: 3
            }}
          >
            <Typography color='textSecondary' variant='body2'>
              {`${post.readTime} read`}
            </Typography>
          </Box>
          {post.videoUrl ? (
            <Box
              sx={{
                height: 380,
                mt: 3
              }}
            >
              <iframe
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                frameBorder='0'
                height='100%'
                src={post.videoUrl}
                title={post.title}
                width='100%'
              />
            </Box>
          ) : (
            <Box
              sx={{
                backgroundImage: `url(${post.cover})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: 1,
                height: 380,
                mt: 3
              }}
            />
          )}
          <Box sx={{ py: 3 }}>
            <MarkdownWrapper>
              {markdown && (
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {markdown}
                </Markdown>
              )}
            </MarkdownWrapper>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ mt: 8 }}>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
                mb: 8
              }}
            >
              <Button
                disabled={!previous}
                startIcon={<ArrowBackIcon fontSize='small' />}
                onClick={() => router.push(`/learning/${previous?.id}`)}
              >
                {previous?.title ?? 'Previous'}
              </Button>
              <Button
                disabled={!next}
                endIcon={<ArrowForwardIcon fontSize='small' />}
                sx={{ ml: 1 }}
                onClick={() => router.push(`/learning/${next?.id}`)}
              >
                {next?.title ?? 'Next'}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

BlogPostDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default BlogPostDetails
