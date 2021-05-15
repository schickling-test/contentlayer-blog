import { defineDocument, fromLocalContent } from 'contentlayer/source-local'
import * as path from 'path'

export const Post = defineDocument(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
  },
  computedFields: {
    slug: { type: 'string', resolve: (_) => _._id.replace('.md', '') },
  },
}))

export default fromLocalContent({
  contentDirPath: path.join(process.cwd(), 'posts'),
  schema: [Post],
})
