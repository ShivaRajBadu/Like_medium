import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../lib/sanity'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import Link from 'next/link'
interface Props {
  post: Post
}
type Inputs = {
  _id: string
  name: string
  email: string
  comment: string
}

export default function onePost({ post }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [likes, setLikes] = useState(post?.likes)
  const [liked, setLiked] = useState(false)
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) =>
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((errors) => {
        console.log(errors)
        setSubmitted(false)
      })

  const handleLikes = async () => {
    setLiked(true)
    const res = await fetch('/api/likes', {
      method: 'POST',
      body: JSON.stringify({ _id: post._id }),
    })
    const data = await res.json()
    setLikes(data.likes)
  }
  const copyUrl = async () => {
    await navigator.clipboard.writeText(location.href)
  }
  // console.log(post)

  return (
    <>
      <Head>
        <title>{post?.title}</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <hr className="border-b-0 border-black" />
      <main className="bg-zinc-100">
        <div className=" mx-auto  max-w-7xl bg-zinc-100 p-7 py-5 ">
          <div className="items-center justify-between md:flex">
            <Link href={`/author/${post.author.slug.current}`}>
              <div className="  flex cursor-pointer items-center space-x-7  py-1">
                <Image
                  className="rounded-full"
                  src={urlFor(post?.author.image).url()}
                  width={40}
                  height={40}
                />
                <div>
                  <p className=" text-lg capitalize">{post?.author.name}</p>
                  <p>{new Date(post?.publishedAt).toDateString()}</p>
                </div>
              </div>
            </Link>

            <div className="mt-3 ml-4 mb-4  py-3 text-center ">
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
          <div className="py-3 pb-4">
            <img
              className="rounded-xl object-cover py-2"
              src={urlFor(post?.mainImage).url()}
              alt="image"
            />

            <h1 className="mt-1 py-2 text-center  text-2xl font-bold capitalize">
              {post?.title}
            </h1>
            <p className="mb-2 text-center  text-lg text-stone-500">
              {post?.description}
            </p>

            <div className="p-2">
              <PortableText
                className=" text-lg leading-7"
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                content={post.body}
              />
            </div>
          </div>
          <div className=" flex items-center justify-between p-4">
            <div className=" items-center py-8 ">
              <i
                onClick={handleLikes}
                className={`far fa-heart cursor-pointer pr-2 text-2xl hover:text-green-500 ${
                  liked && 'text-green-500'
                }`}
              ></i>

              <i className="far fa-comment cursor-pointer pl-4 text-2xl hover:text-green-500"></i>
            </div>
            <div>
              <i
                onClick={copyUrl}
                className="fas fa-share cursor-pointer pr-3 text-2xl hover:text-green-500"
              ></i>
              <i className="far fa-bookmark cursor-pointer pl-4 text-2xl hover:text-green-500"></i>
            </div>
          </div>
          <hr className="border-b-0 border-black" />
          {submitted ? (
            <div className="bg-teal-900 py-1 ">
              <h1 className="py-3 text-center text-2xl text-white">
                Thank you for your comment..😊
              </h1>
              <p className="py-1 px-1 text-center text-lg text-white opacity-75">
                After approved comment will be visisble.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto mb-8 flex max-w-3xl flex-col p-5"
            >
              <h1 className="my-2 bg-gray-100 py-2 text-center font-serif text-3xl font-bold shadow-lg">
                Comment About The Post:
              </h1>
              <input
                {...register('_id')}
                type="hidden"
                name="_id"
                value={post._id}
              />
              <label
                className="mt-3 mb-1 px-1 text-xl text-zinc-800"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                {...register('name', { required: true })}
                className="rounded-lg py-2 px-3 text-lg outline-none ring-slate-500 focus:ring-1"
                type="text"
                placeholder="Your Name..."
                id="name"
              />
              <label
                className="mt-3 mb-1 px-1 text-xl text-zinc-800"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                {...register('email', { required: true })}
                className="block rounded-lg py-2 px-3 text-lg outline-none ring-slate-500 focus:ring-1"
                type="email"
                placeholder="Your Email address..."
                id="email"
              />
              <label
                className="mt-3 mb-1 px-1 text-xl text-zinc-800"
                htmlFor="comment"
              >
                Comment:
              </label>
              <textarea
                {...register('comment', { required: true })}
                className=" rounded-lg p-3 text-lg outline-none ring-slate-500 focus:ring-1 "
                rows={6}
                placeholder="Comment..."
                id="comment"
              />
              <div>
                {errors.name && (
                  <p className="px-2 py-1 text-lg text-red-600">
                    * Please fill your Name.
                  </p>
                )}
                {errors.email && (
                  <p className="px-2  text-lg text-red-600">
                    * Please fill your Email.
                  </p>
                )}
                {errors.comment && (
                  <p className="px-2 py-1 text-lg text-red-600">
                    * Please fill your Comment.
                  </p>
                )}
              </div>
              <input
                type="submit"
                value="Submit"
                className="my-4 cursor-pointer bg-gray-600 py-2 px-4 text-lg text-white hover:bg-gray-700 hover:text-stone-300"
              />
            </form>
          )}

          <div className="m-3 mx-auto max-w-3xl p-5 shadow shadow-slate-600">
            <h1 className="mb-3 border-b-2 border-gray-500 px-2 py-2 text-3xl font-bold">
              Comments:
            </h1>
            <div className=" p-4 ">
              {post.comments.map((comment) => (
                <p key={comment._id} className=" py-2 text-lg ">
                  <span className="pr-1 text-xl capitalize text-lime-900">
                    {' '}
                    {comment.name}:
                  </span>
                  {comment.comment}
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "post"  ]{
  _id,
slug{
  current
}
}`
  const posts = await sanityClient.fetch(query)
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug ][0]{
  _id,
  
  title,
  description,
  body,
  author->{
  name,
  image,
  bio,
  slug,
},
"comments":*[_type == "comment" && post._ref == ^._id  && approved == true],
slug,
mainImage,
publishedAt
}`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  return {
    props: {
      post,
    },
  }
}
