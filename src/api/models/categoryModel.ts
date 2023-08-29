import {ResultSetHeader} from 'mysql2';
import promisePool from '../../database/db';
import {Category, GetCategory, PostCategory} from '../../interfaces/Category';
import CustomError from '../../classes/CustomError';

const getAllCategories = async (): Promise<Category[]> => {
  const [rows] = await promisePool.execute<GetCategory[]>(
    'SELECT * FROM categories'
  );
  if (rows.length === 0) {
    throw new CustomError('No categories found', 404);
  }
  return rows as Category[];
};

const getCategoryById = async (id: number): Promise<Category> => {
  const [rows] = await promisePool.execute<GetCategory[]>(
    'SELECT * FROM categories WHERE category_id = ?',
    [id]
  );
  if (rows.length === 0) {
    throw new CustomError('No categories found', 404);
  }
  return rows[0] as Category;
};

const addCategory = async (category: PostCategory) => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'INSERT INTO categories (name) VALUES (?)',
    [category.name]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Category not added', 304);
  }
  return headers.insertId;
};

export {getAllCategories, getCategoryById, addCategory};
