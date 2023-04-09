import type { PostRepository } from '../repository'
import type { AuthorModelType, CategoryModelType, CommentModelType, PostModelType, TagModelType } from '../models'
import { PostCount } from '../dto'
import { DataNotFoundError } from '../exceptions'
import { AuthorService, CategoryService, CommentService, TagService } from './index'

class PostService {
  private readonly postRepository: PostRepository
  private readonly authorService: AuthorService
  private readonly categoryService: CategoryService
  private readonly tagService: TagService
  private commentService: CommentService

  constructor(postRepository: PostRepository, authorService: AuthorService, categoryService: CategoryService, tagService: TagService, commentService: CommentService) {
    this.postRepository = postRepository
    this.authorService = authorService
    this.categoryService = categoryService
    this.tagService = tagService
    this.commentService = commentService
  }

  getPagePosts(page: number): Promise<{ post: PostModelType; author: AuthorModelType; commentsCount: number }[]> {
    return this.postRepository.findAllByPageAndVisibilityAndPostStatus(page, 'PUBLIC', 'PUBLISH')
      .then((posts) => this.getPostsWithAuthorAndCommentCount(posts))
  }

  getPostsCount(): Promise<PostCount> {
    return this.postRepository.countByPostStatusAndVisibility('PUBLISH', 'PUBLIC')
  }

  getPostDetailsByUrl(postUrl: string): Promise<{ post: PostModelType; author: AuthorModelType; categories: CategoryModelType[]; tags: TagModelType[], comments: CommentModelType[] }> {
    return this.postRepository.findByUrlAndVisibilityAndPostStatus(postUrl, 'PUBLIC', 'PUBLISH')
      .then(async (post) => {
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
    return this.getCategoryByCategoryUrl(categoryUrl)
      .then((category: CategoryModelType) => {
        return this.postRepository.countByCategoryAndPostStatusAndVisibility(category.categoryId, 'PUBLISH', 'PUBLIC')
      })
  }

  getPostsByCategoryUrl(categoryUrl: string, page: number): Promise<{ post: PostModelType; author: AuthorModelType; commentsCount: number }[]> {
    return this.getCategoryByCategoryUrl(categoryUrl)
      .then((category: CategoryModelType) => {
        return this.postRepository.findAllByCategoryAndPostStatusAndVisibility(category.categoryId, 'PUBLISH', 'PUBLIC', page)
      })
      .then((posts) => this.getPostsWithAuthorAndCommentCount(posts))
  }

  getPostsCountByAuthorId(authorId: string): Promise<PostCount> {
    return this.postRepository.countByAuthorIdAndPostStatusAndVisibility(authorId, 'PUBLISH', 'PUBLIC')
  }

  getPostsByAuthorId(authorId: string, page: number): Promise<{ post: PostModelType; author: AuthorModelType; commentsCount: number }[]> {
    return this.postRepository.findAllByAuthorIdAndPostStatusAndVisibility(authorId, 'PUBLISH', 'PUBLIC', page)
      .then((posts) => this.getPostsWithAuthorAndCommentCount(posts))
  }

  updateLikeOnPost(postId: string, visitorId: string): Promise<{ likes: string[] }> {
    return this.postRepository.findByPostId(postId)
      .then((post: PostModelType) => {
        const likes = post.likes.includes(visitorId) ? post.likes.filter((visitor) => visitor !== visitorId) : post.likes.concat(visitorId)
        return this.postRepository.updateLikesByPostId(likes, postId)
          .then(() => ({ likes }))
      })
  }

  private getCategoryByCategoryUrl(categoryUrl: string) {
    return this.categoryService.getCategoryByUrl(categoryUrl)
      .then(category => {
        if (category === null) {
          throw new DataNotFoundError('', 'Category Not Found')
        }
        return category
      })
  }

  private async getPostsWithAuthorAndCommentCount(posts: PostModelType[]): Promise<{ post: PostModelType; author: AuthorModelType, commentsCount: number }[]> {
    const authorIds = posts.reduce<string[]>((authorIds, post) => {
      if (!authorIds.includes(post.authorId)) {
        authorIds.push(post.authorId)
      }
      return authorIds
    }, [])

    const authors: AuthorModelType[] = await this.authorService.getAllByIds(authorIds)
    return Promise.all(posts.map((post: PostModelType) => {
      return this.commentService.countByPostId(post.postId)
        .then(count => {
          const author = authors.find((author: AuthorModelType) => author.userId === post.authorId)
          return { post, author: author!, commentsCount: count }
        })
    }))
  }

}

export default PostService
