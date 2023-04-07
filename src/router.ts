import express from 'express'
import { categoryRouter, postRouter } from './routers'

const router = express.Router()
router.use('/posts', postRouter)
router.use('/categories', categoryRouter)

export default router
