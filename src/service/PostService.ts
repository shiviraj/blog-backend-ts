import type { PostRepository } from '../repository'
import type { AuthorModelType, CategoryModelType, PostModelType, TagModelType } from '../models'
import { PostCount } from '../dto'
import { DataNotFoundError } from '../exceptions'
import { AuthorService, CategoryService, TagService } from './index'

class PostService {
  private readonly postRepository: PostRepository
  private readonly authorService: AuthorService
  private categoryService: CategoryService
  private tagService: TagService

  constructor(postRepository: PostRepository, authorService: AuthorService, categoryService: CategoryService, tagService: TagService) {
    this.postRepository = postRepository
    this.authorService = authorService
    this.categoryService = categoryService
    this.tagService = tagService
  }

  getPagePosts(page: number): Promise<{ post: PostModelType; author: AuthorModelType }[]> {
    return this.postRepository.findAllByPageAndVisibilityAndPostStatus(page, 'PUBLIC', 'PUBLISH')
      .then((posts) => this.getPostsWithAuthor(posts))
  }

  getPostsCount(): Promise<PostCount> {
    return this.postRepository.countByPostStatusAndVisibility('PUBLISH', 'PUBLIC')
  }

  getPostDetailsByUrl(postUrl: string): Promise<{ post: PostModelType; author: AuthorModelType; categories: CategoryModelType[]; tags: TagModelType[] }> {
    return this.postRepository.findByUrlAndVisibilityAndPostStatus(postUrl, 'PUBLIC', 'PUBLISH')
      .then(async (post) => {
        if (post === null) {
          throw new DataNotFoundError('', 'Post Not Found')
        }
        const author = await this.authorService.getAuthorByAuthorId(post.authorId)
        const categories = await this.categoryService.getAllCategories(post.categories)
        const tags = await this.tagService.getAllTags(post.tags)
        return { post, author: author!, tags, categories }
      })
  }

  getPostsCountByCategoryUrl(categoryUrl: string): Promise<PostCount> {
    return this.getCategoryByCategoryUrl(categoryUrl)
      .then((category: CategoryModelType) => {
        return this.postRepository.countByCategoryAndPostStatusAndVisibility(category.categoryId, 'PUBLISH', 'PUBLIC')
      })
  }

  getPostsByCategoryUrl(categoryUrl: string, page: number): Promise<{ post: PostModelType; author: AuthorModelType }[]> {
    return this.getCategoryByCategoryUrl(categoryUrl)
      .then((category: CategoryModelType) => {
        return this.postRepository.findAllByCategoryAndPostStatusAndVisibility(category.categoryId, 'PUBLISH', 'PUBLIC', page)
      })
      .then((posts) => this.getPostsWithAuthor(posts))
  }

  getPostsCountByAuthorId(authorId: string): Promise<PostCount> {
    return this.postRepository.countByAuthorIdAndPostStatusAndVisibility(authorId, 'PUBLISH', 'PUBLIC')
  }

  getPostsByAuthorId(authorId: string, page: number): Promise<{ post: PostModelType; author: AuthorModelType }[]> {
    return this.postRepository.findAllByAuthorIdAndPostStatusAndVisibility(authorId, 'PUBLISH', 'PUBLIC', page)
      .then((posts) => this.getPostsWithAuthor(posts))
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

  private getPostsWithAuthor(posts: PostModelType[]): Promise<{ post: PostModelType; author: AuthorModelType }[]> {
    const authorIds = posts.reduce<string[]>((authorIds, post) => {
      if (!authorIds.includes(post.authorId)) {
        authorIds.push(post.authorId)
      }
      return authorIds
    }, [])

    return this.authorService.getAllByIds(authorIds)
      .then((authors: AuthorModelType[]) => {
        return posts.map((post: PostModelType) => {
          const author = authors.find((author: AuthorModelType) => author.userId === post.authorId)
          return { post, author: author! }
        })
      })
  }
}

export default PostService
