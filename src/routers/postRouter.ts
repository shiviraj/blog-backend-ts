import type { Request, Response } from 'express'
import express from 'express'
import { PostController } from '../controller'
import { AuthorRepository, CategoryRepository, PostRepository, TagRepository } from '../repository'
import '../utils/extensions'
import { AuthorService, CategoryService, PostService, TagService } from '../service'

const router = express.Router()
const postRepository = new PostRepository()
const authorRepository = new AuthorRepository()
const authorService = new AuthorService(authorRepository)
const tagRepository = new TagRepository()
const tagService = new TagService(tagRepository)
const categoryRepository = new CategoryRepository()
const categoryService = new CategoryService(categoryRepository)
const postService = new PostService(postRepository, authorService, categoryService, tagService)
const postController = new PostController(postService)

router.get('/page/:page', (req: Request, res: Response) => {
  return postController.getPosts(req.params.page)
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

router.get('/count', (req: Request, res: Response) => {
  return postController.getPostsCount()
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

router.get('/:postUrl', (req: Request, res: Response) => {
  return postController.getPostDetails(req.params.postUrl)
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

export default router
