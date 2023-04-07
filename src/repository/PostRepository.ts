import Repository from './Repository'
import type { PostModelType, PostStatus, Visibility } from '../models'
import { PostModel } from '../models'
import { PostCount } from '../dto'

const POST_LIMIT = 10

class PostRepository extends Repository<PostModelType> {
  constructor() {
    super(PostModel)
  }

  findAllByPageAndVisibilityAndPostStatus(page: number, visibility: Visibility, postStatus: PostStatus): Promise<PostModelType[]> {
    return this.findAllWithPage({ visibility, postStatus }, this.getSkip(page), POST_LIMIT)
  }

  countByPostStatusAndVisibility(postStatus: PostStatus, visibility: Visibility): Promise<PostCount> {
    return this.count({ postStatus, visibility })
      .then((count: number) => this.getPostsCount(count))
  }

  findByUrlAndVisibilityAndPostStatus(url: string, visibility: Visibility, postStatus: PostStatus): Promise<PostModelType | null> {
    return this.findOne({ url, visibility, postStatus })
  }

  countByCategoryAndPostStatusAndVisibility(categoryId: string, postStatus: PostStatus, visibility: Visibility): Promise<PostCount> {
    return this.count({ postStatus, visibility, categories: categoryId })
      .then((count: number) => this.getPostsCount(count))
  }

  findAllByCategoryAndPostStatusAndVisibility(categoryId: string, postStatus: PostStatus, visibility: Visibility, page: number): Promise<PostModelType[]> {
    return this.findAllWithPage({ categories: categoryId, postStatus, visibility }, this.getSkip(page), POST_LIMIT)
  }

  countByAuthorIdAndPostStatusAndVisibility(authorId: string, postStatus: PostStatus, visibility: Visibility): Promise<PostCount> {
    return this.count({ authorId, postStatus, visibility })
      .then((count: number) => this.getPostsCount(count))
  }

  findAllByAuthorIdAndPostStatusAndVisibility(authorId: string, postStatus: PostStatus, visibility: Visibility, page: number): Promise<PostModelType[]> {
    return this.findAllWithPage({ authorId, postStatus, visibility }, this.getSkip(page), POST_LIMIT)
  }

  private getSkip(page: number): number {
    return (page - 1) * POST_LIMIT
  }

  private getPostsCount(count: number): { pageCount: number; postCount: number } {
    return { postCount: count, pageCount: Math.ceil(count / POST_LIMIT) }
  }
}

export default PostRepository
