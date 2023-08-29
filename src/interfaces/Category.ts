import {RowDataPacket} from 'mysql2';

interface Category {
  id: number;
  name: string;
}

interface GetCategory extends RowDataPacket, Category {}

type PostCategory = Omit<Category, 'id'>;

export {Category, GetCategory, PostCategory};
