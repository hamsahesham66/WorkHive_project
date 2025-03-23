import * as categoryService from '../services/categoryService.js';
import express from 'express';
const router = express.Router();    

router.route('/').get(categoryService.getCategory).post(categoryService.createCategory);
router.route('/:id').get(categoryService.getCategoryById);

export default router;