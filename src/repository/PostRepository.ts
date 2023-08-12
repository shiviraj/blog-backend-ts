import Repository from './Repository'
import type { PostModelType, PostStatus, Visibility } from '../models'
import { PostModel } from '../models'
import type { PostCount } from '../dto'
import type { UpdateWriteOpResult } from 'mongoose'
import { Integer } from '../utils/extensions'

const POST_LIMIT = 10

const getSkip = (page: number): number => {
  return (page - Integer.ONE) * POST_LIMIT
}

const getPostsCount = (count: number): { pageCount: number; postCount: number } => {
  return { postCount: count, pageCount: Math.ceil(count / POST_LIMIT) }
}

class PostRepository extends Repository<PostModelType> {
  constructor() {
    super(PostModel)
  }

  findAllByPageAndVisibilityAndPostStatus(
    page: number,
    visibility: Visibility,
    postStatus: PostStatus
  ): Promise<PostModelType[]> {
    const query = { visibility, postStatus }
    return this.findAllWithPage(query, getSkip(page), POST_LIMIT, { lastUpdateOn: -1 })
  }

  countByPostStatusAndVisibility(postStatus: PostStatus, visibility: Visibility): Promise<PostCount> {
    return this.count({ postStatus, visibility }).then(getPostsCount)
  }

  findByUrlAndVisibilityAndPostStatus(
    url: string,
    visibility: Visibility,
    postStatus: PostStatus
  ): Promise<PostModelType | null> {
    return this.findOne({ url, visibility, postStatus })
  }

  countByCategoryAndPostStatusAndVisibility(
    categoryId: string,
    postStatus: PostStatus,
    visibility: Visibility
  ): Promise<PostCount> {
    return this.count({ postStatus, visibility, categories: categoryId }).then(getPostsCount)
  }

  findAllByCategoryAndPostStatusAndVisibility(
    categoryId: string,
    postStatus: PostStatus,
    visibility: Visibility,
    page: number
  ): Promise<PostModelType[]> {
    const query = { categories: categoryId, postStatus, visibility }
    return this.findAllWithPage(query, getSkip(page), POST_LIMIT, { lastUpdateOn: -1 })
  }

  countByAuthorIdAndPostStatusAndVisibility(
    authorId: string,
    postStatus: PostStatus,
    visibility: Visibility
  ): Promise<PostCount> {
    return this.count({ authorId, postStatus, visibility }).then(getPostsCount)
  }

  findAllByAuthorIdAndPostStatusAndVisibility(
    authorId: string,
    postStatus: PostStatus,
    visibility: Visibility,
    page: number
  ): Promise<PostModelType[]> {
    const query = { authorId, postStatus, visibility }
    return this.findAllWithPage(query, getSkip(page), POST_LIMIT, { lastUpdateOn: -1 })
  }

  updateLikesByPostId(likes: string[], postId: string): Promise<UpdateWriteOpResult> {
    return this.updateOne({ postId }, { likes })
  }

  findByPostId(postId: string): Promise<PostModelType> {
    return this.findOne({ postId })
  }

  findAllByAuthorId(authorId: string): Promise<PostModelType[]> {
    return this.findAll({ authorId }).then(posts => {
      return posts.sort((post1, post2) => Number(post2.postId) - Number(post1.postId))
    })
  }

  saveNewPost(authorId: string, postId: string): Promise<PostModelType> {
    return this.save({ authorId, postId, url: postId })
  }

  findByPostIdAndAuthorId(postId: string, authorId: string): Promise<PostModelType> {
    return this.findOne({ postId, authorId })
  }

  updatePost(post: PostModelType): Promise<UpdateWriteOpResult> {
    return this.updateOne({ postId: post.postId }, post)
  }

  updatePostByPostIdAndAuthorId(post: PostModelType, postId: string, authorId: string): Promise<UpdateWriteOpResult> {
    return this.updateOne({ authorId, postId }, post)
  }

  findByUrl(url: string): Promise<PostModelType> {
    return this.findOne({ url })
  }

  countByTagAndPostStatusAndVisibility(
    tagId: string,
    postStatus: PostStatus,
    visibility: Visibility
  ): Promise<PostCount> {
    return this.count({ tagId, postStatus, visibility }).then(getPostsCount)
  }

  findAllByTagAndPostStatusAndVisibility(
    tagId: string,
    postStatus: PostStatus,
    visibility: Visibility,
    page: number
  ): Promise<PostModelType[]> {
    const query = { tags: tagId, postStatus, visibility }
    return this.findAllWithPage(query, getSkip(page), POST_LIMIT, { lastUpdateOn: -1 })
  }
}

export default PostRepository
