import express from 'express'

//import has to be wrapped in {} since we used export const varName instead of export default varName
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'

const router = express.Router()

// functionality will be in the controller files
router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/likePost', likePost)// it's a patch request b/c liking a post means still updating it

export default router;