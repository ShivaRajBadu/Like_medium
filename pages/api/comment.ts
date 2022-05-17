import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../lib/sanity'

sanityClient.config({
  token: process.env.SANITY_TOKEN,
})
export default async function comment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body)

  try {
    await sanityClient.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    })
  } catch (err) {
    return res.status(500).json({ message: 'unable to submit form', err })
  }
  console.log('comment submitted')

  res.status(200).json({ message: 'Comment submitted.🙂' })
}
