import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { gtm } from 'lib/gtm'
import { DashboardLayout } from 'components/common/dashboard-layout'
import { Box, Container } from '@mui/system'
import Head from 'next/head'
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import MarkdownWrapper from 'components/common/markdown-wrapper'

const Privacy: NextPage = () => {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    fetch('/static/policies/privacy.md')
      .then((response) => response.text())
      .then(setMarkdown)
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Decode The Trade - Privacy</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth='xl'>
          <Box sx={{ py: 3 }}>
            <MarkdownWrapper>{markdown && <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>}</MarkdownWrapper>
          </Box>
        </Container>
      </Box>
    </>
  )
}

Privacy.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Privacy
