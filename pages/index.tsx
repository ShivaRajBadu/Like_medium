import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'

import { sanityClient, urlFor } from '../lib/sanity'
import { Post } from '../typings'
import comment from './api/comment'

// const Home: NextPage = (props) => {
interface Props {
  posts: [Post]
}
export default function Home({ posts }: Props) {
  // console.log(
  //   posts
  //     .map((post) => post.categories.map((cat) => cat.title))
  //     .map((ar) => ar.map((a) => a))
  // )

  const filterPost = (title: string) => {
    // const topicPost = posts.filter(post => post.categories.forEach(cat=> console.log);
    // ))
  }

  return (
    <>
      <Head>
        <title>Medium Clone</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="bg-yellow-500">
        <Header />
        <hr className="border-b-0 border-black" />
        {/* ---------------hero section------- */}
        <div className="mx-auto flex max-w-7xl items-center justify-between space-x-4  p-4 py-10">
          <div className=" space-y-9 p-4">
            <h1 className="min-w-xl font-serif text-7xl md:text-8xl ">
              Stay Curious.
            </h1>
            <h3 className=" max-w-xl font-sans  text-3xl">
              Discover stories, thinking, and expertise from writers on any
              topic.
            </h3>
            <button className="my-5 rounded-full bg-black py-2 px-14  text-lg text-white">
              Start reading
            </button>
          </div>

          <img
            className="hidden  md:inline-block md:h-60 lg:h-full"
            src="medium-size-svgrepo-com.svg"
            alt=""
          />
        </div>
      </div>
      {/* ------------hero section end-------------- */}
      <hr className="border-b-0 border-black" />
      {/* topics .. */}
      <div className="m-auto mt-8  max-w-7xl items-center  p-4 px-8">
        <div className="flex items-center rounded-2xl bg-slate-500 py-3 px-2">
          <h2 className=" px-3 text-xl font-semibold capitalize">topics:</h2>
          <div className="flex">
            {posts[0].topics.map((topic) => (
              <p
                className="mx-2 rounded-full bg-slate-200 p-2 px-3"
                key={topic._id}
                onClick={() => filterPost(topic.title)}
              >
                {topic.title}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* posts  */}

      <div className=" mx-auto mt-8 grid max-w-7xl  grid-cols-1  gap-5 p-4  px-8 py-10 md:grid-cols-2 lg:grid-cols-3 ">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="my-2 grid max-w-3xl cursor-pointer grid-cols-1 rounded-xl  border-2 border-gray-50 bg-gray-100 py-5 px-3 shadow-xl hover:border-gray-400  ">
              <a>
                <div className=" ml-3 ">
                  <div className="  flex space-x-2   py-1">
                    <Image
                      className="rounded-full"
                      src={urlFor(post.author.image).url()}
                      width={20}
                      height={20}
                    />
                    <p className=" text-xs capitalize">{post.author.name}</p>
                  </div>
                  <h1 className=" py-2 text-2xl  font-bold capitalize md:py-0">
                    {post.title}
                  </h1>
                  <h3 className=" hidden p-2 pl-0 text-sm  text-gray-500 first-letter:capitalize md:block">
                    {post.description}
                  </h3>
                  <p className=" py-1 pb-3 text-xs text-gray-600 md:pt-0">
                    {new Date(post.publishedAt).toDateString()}
                  </p>
                </div>
                <img
                  className=" block h-64 w-full rounded-xl object-cover"
                  src={urlFor(post.mainImage).url()}
                />
              </a>
              <div className="flex cursor-pointer justify-center space-x-24 pt-4">
                <p className="">
                  <span className="px-2">{post.likes}</span>
                  <i
                    className="fa fa-heart text-xl opacity-70 hover:text-green-600"
                    aria-hidden="true"
                  ></i>
                </p>
                <p>
                  <span className="px-2">{post.comments.length}</span>
                  <i
                    className="fa fa-comment text-xl opacity-70 hover:text-green-600"
                    aria-hidden="true"
                  ></i>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"  ]{
  _id,
  title,
  description,
  author->{
  image,
  name,
  categories,
},
"comments":*[_type == "comment" && post._ref == ^._id  && approved == true],
"topics":*[_type == "category"]{
  _id,
  title,
},
publishedAt,
mainImage,
categories[]->{
  title
},
slug,
likes,

}`
  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts,
    },
  }
}
