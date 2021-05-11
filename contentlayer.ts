import { defineConfig } from 'contentlayer/core'
import { defineDocument, makeSourcePlugin } from 'contentlayer/source-local'
import * as path from 'path'

export const post = defineDocument(() => ({
  name: 'post',
  label: 'Post',
  filePathPattern: `**/*.md`,
  fileType: 'md',
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

export default defineConfig({
  source: makeSourcePlugin({
    documentDefs: [post],
    contentDirPath: path.join(process.cwd(), 'posts'),
  }),
})
