import {Request, Response, NextFunction} from 'express';
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../models/categoryModel';
import {PostCategory} from '../../interfaces/Category';
import MessageResponse from '../../interfaces/MessageResponse';
import {validationResult} from 'express-validator';
import CustomError from '../../classes/CustomError';

const categoryListGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const categoryGet = async (
  req: Request<{id: number}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      errors
        .array()
        .map((error) => {
          return `${error.msg}: ${error.param}`;
        })
        .join(',');
      throw new CustomError('invalid', 400);
    }

    const category = await getCategoryById(req.params.id);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const categoryPost = async (
  req: Request<{}, {}, PostCategory>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      errors
        .array()
        .map((error) => {
          return `${error.msg}: ${error.param}`;
        })
        .join(',');
      throw new CustomError('invalid', 400);
    }

    const id = await addCategory(req.body);
    const message: MessageResponse = {
      message: 'Category added',
      id: id,
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

const categoryPut = async (
  req: Request<{id: number}, {}, PostCategory>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await updateCategory(id, req.body);
    const message: MessageResponse = {
      message: 'Category updated',
      id: id,
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

const categoryDelete = async (
  req: Request<{id: number}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await deleteCategory(id);
    const message: MessageResponse = {
      message: 'Category deleted',
      id: id,
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

export {
  categoryListGet,
  categoryGet,
  categoryPost,
  categoryPut,
  categoryDelete,
};
