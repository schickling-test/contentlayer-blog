import { allPost } from '.contentlayer'
import { compareDesc } from 'date-fns'
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FC } from 'react'
import { FormattedDate } from '../components/date'
import { Layout, siteTitle } from '../components/layout'
const utilStyles = require('../styles/utils.module.css')

export async function getStaticProps({ params }) {
  return {
    props: {
      posts: allPost.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))),
    },
  }
}

const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I’m <strong>Shu</strong>. I’m a software engineer and a translator (English/Japanese). You can contact
          me on <a href="https://twitter.com/chibicode">Twitter</a>.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ slug, date, title }) => (
            <li className={utilStyles.listItem} key={slug}>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <FormattedDate dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default Home
