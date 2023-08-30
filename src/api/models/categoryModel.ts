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
    'INSERT INTO categories (categories_name) VALUES (?)',
    [category.name]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Category not added', 304);
  }
  return headers.insertId;
};

const updateCategory = async (id: number, category: PostCategory) => {
  console.log(id, category.name);
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'UPDATE categories SET categories_name = ? WHERE categories_id = ?',
    [category.name, id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Category not fount', 404);
  }
};

const deleteCategory = async (id: number) => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'DELETE FROM categories WHERE categories_id = ?',
    [id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Category not fount', 404);
  }
};

export {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
