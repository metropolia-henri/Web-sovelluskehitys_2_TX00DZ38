import {Request, Response, NextFunction} from 'express';
import {
  addCategory,
  getAllCategories,
  getCategoryById,
} from '../models/categoryModel';
import {PostCategory} from '../../interfaces/Category';
import MessageResponse from '../../interfaces/MessageResponse';

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

export {categoryListGet, categoryGet, categoryPost};
