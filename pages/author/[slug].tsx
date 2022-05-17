import { sanityClient, urlFor } from '../../lib/sanity'
import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'

import { Author } from '../../typings'
import Head from 'next/head'
import Header from '../../components/Header'
interface Props {
  author: Author
}
export default function Authors({ author }: Props) {
  console.log(author)

  return (
    <>
      <Head>
        <title>{author?.name}</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <hr className="border-b-0 border-black" />
      <main className="h-screen bg-cyan-300 py-14">
        <div className="m-auto max-w-2xl bg-lime-600 py-16 text-center text-white shadow-2xl">
          <img
            className="m-auto h-48 w-44 rounded-full py-2"
            src={urlFor(author.image).url()}
            alt=""
          />
          <h1 className="pt-2 text-3xl font-bold capitalize">{author.name}</h1>
          <h3 className=" pt-1 pb-2 text-lg opacity-80">{author?.email}</h3>
          <PortableText
            className="m-auto mt-10 max-w-sm text-xl opacity-70"
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={author.bio}
          />

          <div className=" ml-4 mb-4 mt-8 py-3  pt-0 text-center ">
            <a href="https://www.facebook.com/" target="_blank">
              <i className="fab fa-facebook r cursor-pointer px-3 text-2xl transition-colors hover:text-green-500"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank">
              {' '}
              <i className="fab fa-linkedin cursor-pointer px-3 text-2xl hover:text-green-500"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank">
              {' '}
              <i className="fab fa-instagram cursor-pointer px-3 text-2xl hover:text-green-500"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <i className="fab fa-twitter cursor-pointer px-3 text-2xl hover:text-green-500"></i>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `
  *[_type == "author"]{
  _id,
slug{
  current
}
}
  `
  const authors = await sanityClient.fetch(query)
  const paths = authors.map((author: Author) => ({
    params: {
      slug: author.slug.current,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "author" && slug.current == $slug][0]{
  _id,
  name,
  email,
  bio,
  image
}`
  const author = await sanityClient.fetch(query, {
    slug: params?.slug,
  })
  return {
    props: {
      author,
    },
  }
}
