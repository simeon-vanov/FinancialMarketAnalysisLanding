import { Tag } from 'types/tags'
import { Option } from 'types/options'

export const createOptions = (tags: Tag[], translate: (text: string) => string): Option<Tag>[] =>
  tags.map((tag) => ({
    label: translate(tag),
    value: tag
  }))
