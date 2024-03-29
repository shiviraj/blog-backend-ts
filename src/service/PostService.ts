import type { PostRepository } from '../repository'
import { SequenceId } from '../repository'
import type { AuthorModelType, CategoryModelType, CommentModelType, PostModelType, TagModelType } from '../models'
import type { PostCount } from '../dto'
import { DataNotFoundError } from '../exceptions'
import type { AuthorService, CategoryService, CommentService, IdGeneratorService, TagService } from './index'
import type { UpdateWriteOpResult } from 'mongoose'

class PostService {
  private readonly postRepository: PostRepository
  private readonly authorService: AuthorService
  private readonly categoryService: CategoryService
  private readonly tagService: TagService
  private readonly commentService: CommentService
  private readonly idGeneratorService: IdGeneratorService

  // eslint-disable-next-line max-params
  constructor(
    postRepository: PostRepository,
    authorService: AuthorService,
    categoryService: CategoryService,
    tagService: TagService,
    commentService: CommentService,
    idGeneratorService: IdGeneratorService
  ) {
    this.postRepository = postRepository
    this.authorService = authorService
    this.categoryService = categoryService
    this.tagService = tagService
    this.commentService = commentService
    this.idGeneratorService = idGeneratorService
  }

  getPagePosts(page: number): Promise<Array<{ post: PostModelType; author: AuthorModelType; commentsCount: number }>> {
    return this.postRepository
      .findAllByPageAndVisibilityAndPostStatus(page, 'PUBLIC', 'PUBLISH')
      .then(posts => this.getPostsWithAuthorAndCommentCount(posts))
  }

  getPostsCount(): Promise<PostCount> {
    return this.postRepository.countByPostStatusAndVisibility('PUBLISH', 'PUBLIC')
  }

  getPostDetailsByUrl(postUrl: string): Promise<{
    post: PostModelType
    author: AuthorModelType
    categories: CategoryModelType[]
    tags: TagModelType[]
    comments: CommentModelType[]
  }> {
    return this.postRepository.findByUrlAndVisibilityAndPostStatus(postUrl, 'PUBLIC', 'PUBLISH').then(async post => {
      if (post === null) {
        throw new DataNotFoundError('', 'Post Not Found')
      }
      const author = await this.authorService.getAuthorByAuthorId(post.authorId)
      const categories = await this.categoryService.getAllCategories(post.categories)
      const tags = await this.tagService.getAllTags(post.tags)
      const comments = await this.commentService.getAllComments(post.postId)
      return { post, author, tags, categories, comments }
    })
  }

  getPostsCountByCategoryUrl(categoryUrl: string): Promise<PostCount> {
    return this.getCategoryByCategoryUrl(categoryUrl).then((category: CategoryModelType) => {
      return this.postRepository.countByCategoryAndPostStatusAndVisibility(category.categoryId, 'PUBLISH', 'PUBLIC')
    })
  }

  getPostsByCategoryUrl(
    categoryUrl: string,
    page: number
  ): Promise<
    Array<{
      post: PostModelType
      author: AuthorModelType
      commentsCount: number
    }>
  > {
    return this.getCategoryByCategoryUrl(categoryUrl)
      .then((category: CategoryModelType) => {
        return this.postRepository.findAllByCategoryAndPostStatusAndVisibility(
          category.categoryId,
          'PUBLISH',
          'PUBLIC',
          page
        )
      })
      .then(posts => this.getPostsWithAuthorAndCommentCount(posts))
  }

  getPostsCountByAuthorId(authorId: string): Promise<PostCount> {
    return this.postRepository.countByAuthorIdAndPostStatusAndVisibility(authorId, 'PUBLISH', 'PUBLIC')
  }

  getPostsByAuthorId(
    authorId: string,
    page: number
  ): Promise<
    Array<{
      post: PostModelType
      author: AuthorModelType
      commentsCount: number
    }>
  > {
    return this.postRepository
      .findAllByAuthorIdAndPostStatusAndVisibility(authorId, 'PUBLISH', 'PUBLIC', page)
      .then(posts => this.getPostsWithAuthorAndCommentCount(posts))
  }

  updateLikeOnPost(postId: string, visitorId: string): Promise<{ likes: string[] }> {
    return this.postRepository.findByPostId(postId).then((post: PostModelType) => {
      const likes = post.likes.includes(visitorId)
        ? post.likes.filter(visitor => visitor !== visitorId)
        : post.likes.concat(visitorId)
      return this.postRepository.updateLikesByPostId(likes, postId).then(() => ({ likes }))
    })
  }

  private getCategoryByCategoryUrl(categoryUrl: string) {
    return this.categoryService.getCategoryByUrl(categoryUrl)
  }

  private async getPostsWithAuthorAndCommentCount(posts: PostModelType[]): Promise<
    Array<{
      post: PostModelType
      author: AuthorModelType
      commentsCount: number
    }>
  > {
    const authorIds = posts.reduce<string[]>((authorIds, post) => {
      if (!authorIds.includes(post.authorId)) {
        return authorIds.concat(post.authorId)
      }
      return authorIds
    }, [])

    const authors: AuthorModelType[] = await this.authorService.getAllByIds(authorIds)
    return Promise.all(
      posts.map((post: PostModelType) => {
        const author = authors.find((author: AuthorModelType) => author.authorId === post.authorId)
        return this.commentService.countByPostId(post.postId).then(count => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return { post, author: author!, commentsCount: count }
        })
      })
    )
      .logOnSuccess({ message: 'Successfully get posts with author and comment count' })
      .logOnError({ errorMessage: 'Failed to get posts with author and comment count' })
  }

  getAllByAuthorId(authorId: string): Promise<PostModelType[]> {
    return this.postRepository.findAllByAuthorId(authorId)
  }

  addNewPost(authorId: string): Promise<PostModelType> {
    return this.idGeneratorService
      .generate(SequenceId.POST)
      .then((postId: string) => {
        return this.postRepository.saveNewPost(authorId, postId)
      })
      .logOnSuccess({ message: 'Successfully created new post', additionalData: { authorId } })
      .logOnError({ errorMessage: 'Failed to create new post', additionalData: { authorId } })
  }

  getPostByPostIdAndAuthorId(postId: string, authorId: string): Promise<PostModelType> {
    return this.postRepository
      .findByPostIdAndAuthorId(postId, authorId)
      .logOnSuccess({ message: 'Successfully find post by postId and author Id', additionalData: { authorId, postId } })
      .logOnError({ errorMessage: 'Failed to find post by postId and author Id', additionalData: { authorId, postId } })
  }

  publishPostByPostIdAndAuthorId(postId: string, authorId: string): Promise<UpdateWriteOpResult> {
    return this.postRepository
      .findByPostIdAndAuthorId(postId, authorId)
      .then((post: PostModelType) => {
        post.publishedContent = post.content
        post.lastUpdateOn = new Date()
        post.postStatus = 'PUBLISH'
        return this.postRepository.updatePost(post)
      })
      .logOnSuccess({ message: 'Successfully published/updated post', additionalData: { postId, authorId } })
      .logOnError({ errorMessage: 'Failed to publish/update post', additionalData: { postId, authorId } })
  }

  updatePostByAuthorId(authorId: string, post: PostModelType): Promise<UpdateWriteOpResult> {
    return this.postRepository
      .updatePostByPostIdAndAuthorId(post, post.postId, authorId)
      .logOnSuccess({
        message: 'Successfully updated post by authorId and postId',
        additionalData: { postId: post.postId, authorId }
      })
      .logOnError({
        errorMessage: 'Failed to update post by postId and AuthorId',
        additionalData: { postId: post.postId, authorId }
      })
  }

  getUrlAvailability(postId: string, url: string): Promise<boolean> {
    return this.postRepository
      .findByUrl(url)
      .then(post => post.postId === postId)
      .catch(() => true)
  }

  isValidAuthor(postId: string, authorId: string): Promise<boolean> {
    return this.postRepository
      .findByPostId(postId)
      .then(post => post.authorId === authorId)
      .catch(() => false)
  }

  getPostsCountByTagUrl(tagUrl: string): Promise<PostCount> {
    return this.getTagByTagUrl(tagUrl).then((tag: TagModelType) => {
      return this.postRepository.countByTagAndPostStatusAndVisibility(tag.tagId, 'PUBLISH', 'PUBLIC')
    })
  }

  private getTagByTagUrl(tagUrl: string): Promise<TagModelType> {
    return this.tagService.getTagByUrl(tagUrl)
  }

  getPostsByTagUrl(
    tagUrl: string,
    page: number
  ): Promise<
    Array<{
      post: PostModelType
      author: AuthorModelType
      commentsCount: number
    }>
  > {
    return this.getTagByTagUrl(tagUrl)
      .then((tag: TagModelType) => {
        return this.postRepository.findAllByTagAndPostStatusAndVisibility(tag.tagId, 'PUBLISH', 'PUBLIC', page)
      })
      .then(posts => this.getPostsWithAuthorAndCommentCount(posts))
  }
}

export default PostService
