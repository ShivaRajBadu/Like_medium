export interface Post {
  _id: string
  title: string
  description: string
  author: {
    name: string
    image: string
    slug: {
      current: string
    }
  }
  categories: Category[]
  topics: Topic[]
  publishedAt: Date
  mainImage: {
    asset: {
      url: string
    }
  }
  slug: {
    current: string
  }
  comments: Comment[]
  body: [object]
  likes: number
}

export interface Comment {
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    _ref: string
    _type: string
  }
  _id: string
}
export interface Topic {
  _id: string
  title: string
}
export interface Category {
  title: string
}
export interface Author {
  name: string
  image: string
  email: string
  slug: {
    current: string
  }
  bio: [object]
}
