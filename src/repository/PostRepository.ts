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
    return this.findAllWithPage({ visibility, postStatus }, (page - 1) * POST_LIMIT, POST_LIMIT)
  }

  countByPostStatusAndVisibility(postStatus: PostStatus, visibility: Visibility): Promise<PostCount> {
    return this.count({ postStatus, visibility })
      .then((count) => ({ postCount: count, pageCount: Math.ceil(count / POST_LIMIT) }))
  }

  findByUrlAndVisibilityAndPostStatus(url: string, visibility: Visibility, postStatus: PostStatus): Promise<PostModelType | null> {
    return this.findOne({ url, visibility, postStatus })
  }
}

export default PostRepository
