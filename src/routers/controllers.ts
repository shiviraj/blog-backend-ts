import { AuthorRepository, CategoryRepository, PostRepository, TagRepository } from '../repository'
import { AuthorService, CategoryService, PostService, TagService } from '../service'
import { CategoryController, PostController } from '../controller'
import AuthorController from '../controller/AuthorController'

const authorRepository = new AuthorRepository()
const authorService = new AuthorService(authorRepository)
const tagRepository = new TagRepository()
const tagService = new TagService(tagRepository)
const categoryRepository = new CategoryRepository()
const categoryService = new CategoryService(categoryRepository)
const postRepository = new PostRepository()
const postService = new PostService(postRepository, authorService, categoryService, tagService)

export const authorController = new AuthorController(authorService)
export const categoryController = new CategoryController(categoryService)
export const postController = new PostController(postService)
