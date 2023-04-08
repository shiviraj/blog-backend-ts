import {
  AuthorRepository,
  CategoryRepository,
  CommentRepository,
  IdGeneratorRepository,
  PostRepository,
  TagRepository
} from '../repository'
import { AuthorService, CategoryService, CommentService, IdGeneratorService, PostService, TagService } from '../service'
import { AuthorController, CategoryController, CommentController, PostController } from '../controller'

const authorRepository = new AuthorRepository()
const tagRepository = new TagRepository()
const categoryRepository = new CategoryRepository()
const postRepository = new PostRepository()
const commentRepository = new CommentRepository()
const idGeneratorRepository = new IdGeneratorRepository()

const idGeneratorService = new IdGeneratorService(idGeneratorRepository)
const authorService = new AuthorService(authorRepository)
const categoryService = new CategoryService(categoryRepository)
const commentService = new CommentService(commentRepository, idGeneratorService)
const tagService = new TagService(tagRepository)
const postService = new PostService(postRepository, authorService, categoryService, tagService, commentService)

export const authorController = new AuthorController(authorService)
export const categoryController = new CategoryController(categoryService)
export const commentController = new CommentController(commentService)
export const postController = new PostController(postService)
