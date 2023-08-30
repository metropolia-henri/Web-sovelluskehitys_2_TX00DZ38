import express from 'express';
import {
  categoryDelete,
  categoryGet,
  categoryListGet,
  categoryPost,
  categoryPut,
} from '../controllers/categoryController';
import {param, body} from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(categoryListGet)
  .post(body('name').notEmpty().isString().escape(), categoryPost);

router
  .route('/:id')
  .get(param('id').isInt(), categoryGet)
  .put(body('name').notEmpty().isString().escape(), categoryPut)
  .delete(categoryDelete);

export default router;
