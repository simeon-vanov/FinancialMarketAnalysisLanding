import type { FC } from 'react'
import NextLink from 'next/link'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

interface BlogPostCardProps {
  id: string
  cover: string
  readTime: string
  shortDescription: string
  title: string
}

export const BlogPostCard: FC<BlogPostCardProps> = (props) => {
  const { id, cover, readTime, shortDescription, title, ...other } = props

  return (
    <Card
      sx={{
        '& + &': {
          mt: 6
        }
      }}
      {...other}
    >
      <NextLink href={`/learning/${id}`} passHref>
        <CardMedia image={cover} sx={{ height: 250 }} />
      </NextLink>
      <CardContent>
        <NextLink href={`/learning/${id}`} passHref>
          <Typography color='textPrimary' variant='h5'>
            {title}
          </Typography>
        </NextLink>
        <Typography
          color='textSecondary'
          sx={{
            height: 100,
            mt: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2
          }}
          variant='body1'
        >
          {shortDescription}
        </Typography>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            mt: 2
          }}
        >
          <Typography align='right' color='textSecondary' sx={{ flexGrow: 1 }} variant='body2'>
            {`${readTime} read`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
