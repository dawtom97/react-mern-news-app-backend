import express from 'express';
import { createPost, deletePost, getPost, getPosts, likePost, updatePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';
import authAdmin from '../middleware/authAdmin.js';

const router = express.Router();

router.get('/', getPosts );
router.post('/', authAdmin, createPost);

router.get('/:id',getPost);

router.patch('/:id', authAdmin , updatePost);

router.delete('/:id', authAdmin, deletePost);

router.patch('/:id/likePost', auth,likePost);

export default router;