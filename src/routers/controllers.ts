import {
  AuthorRepository,
  CategoryRepository,
  CommentRepository,
  IdGeneratorRepository,
  PostRepository,
  SiteRepository,
  TagRepository,
  TokenRepository
} from '../repository'
import {
  AuthorService,
  CategoryService,
  CommentService,
  IdGeneratorService,
  PostService,
  SiteService,
  TagService,
  TokenService
} from '../service'
import {
  AuthorController,
  CategoryController,
  CommentController,
  PostController,
  SiteController,
  TagController
} from '../controller'

const authorRepository = new AuthorRepository()
const tagRepository = new TagRepository()
const categoryRepository = new CategoryRepository()
const postRepository = new PostRepository()
const commentRepository = new CommentRepository()
const idGeneratorRepository = new IdGeneratorRepository()
const tokenRepository = new TokenRepository()
const siteRepository = new SiteRepository()

const idGeneratorService = new IdGeneratorService(idGeneratorRepository)
const tokenService = new TokenService(tokenRepository, idGeneratorService)
const authorService = new AuthorService(authorRepository, idGeneratorService, tokenService)
const categoryService = new CategoryService(categoryRepository, idGeneratorService)
const commentService = new CommentService(commentRepository, idGeneratorService)
const tagService = new TagService(tagRepository, idGeneratorService)
const postService = new PostService(
  postRepository,
  authorService,
  categoryService,
  tagService,
  commentService,
  idGeneratorService
)
const siteService = new SiteService(siteRepository)

export const authorController = new AuthorController(authorService)
export const postController = new PostController(postService)
export const categoryController = new CategoryController(categoryService)
export const commentController = new CommentController(commentService, postController)
export const siteController = new SiteController(siteService)
export const tagController = new TagController(tagService)
