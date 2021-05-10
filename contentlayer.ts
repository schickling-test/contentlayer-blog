import { defineConfig } from 'contentlayer/core'
import { defineDocument, makeSourcePlugin } from 'contentlayer/source-local'
import matter from 'gray-matter'
import * as path from 'path'
import remark from 'remark'
import html from 'remark-html'

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
  computedFields: (defineField) => [
    defineField({ name: 'contentHTML', type: 'string', resolve: (_) => mdToHtml(_.content) }),
    defineField({ name: 'slug', type: 'string', resolve: (_) => _._id.replace('.md', '') }),
  ],
}))

export default defineConfig({
  source: makeSourcePlugin({
    documentDefs: [post],
    contentDirPath: path.join(process.cwd(), 'posts'),
  }),
})

const mdToHtml = async (mdString: string) => {
  const matterResult = matter(mdString)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content)

  return processedContent.toString()
}
