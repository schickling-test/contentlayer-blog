import { allPost, Post } from '.contentlayer'
import Head from 'next/head'
import { FC } from 'react'
import { FormattedDate } from '../../components/date'
import { Layout } from '../../components/layout'
const utilStyles = require('../../styles/utils.module.css')

export async function getStaticPaths() {
  const paths = allPost.map((_) => '/posts/' + _.slug)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = allPost.find((_) => _.slug === params.id)
  return {
    props: {
      post,
    },
  }
}

const Page: FC<{ post: Post }> = ({ post }) => {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <FormattedDate dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
      </article>
    </Layout>
  )
}

export default Page
