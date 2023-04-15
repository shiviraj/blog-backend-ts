import express from 'express'
import { authorRouter, categoryRouter, commentRouter, postRouter, tagRouter, validatedPostRouter } from './routers'

const router = express.Router()
router.use('/authors', authorRouter)
router.use('/categories', categoryRouter)
router.use('/comments', commentRouter)
router.use('/posts/validate', validatedPostRouter)
router.use('/posts', postRouter)
router.use('/tags', tagRouter)

export default router
