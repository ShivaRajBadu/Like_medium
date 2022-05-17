import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../lib/sanity'

sanityClient.config({
  token: process.env.SANITY_TOKEN,
})

type Data = {
  likes: string
}
export default async function likes(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { _id } = JSON.parse(req.body)
  const data = await sanityClient
    .patch(_id)
    .setIfMissing({ likes: 0 })
    .inc({ likes: 1 })
    .commit()
    .catch((err) => console.log(err))

  res.status(200).json({ likes: data?.likes })
}
