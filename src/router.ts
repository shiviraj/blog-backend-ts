import express from 'express'
import { authorRouter, categoryRouter, postRouter } from './routers'

const router = express.Router()
router.use('/authors', authorRouter)
router.use('/categories', categoryRouter)
router.use('/posts', postRouter)

export default router
