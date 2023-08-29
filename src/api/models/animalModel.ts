// animalModel.ts
import promisePool from '../../database/db';
import {Animal, GetAnimal} from '../../interfaces/Animal';

const getAllAnimals = async (): Promise<Animal[]> => {
  const [rows] = await promisePool.execute<GetAnimal[]>(
    'SELECT * FROM animals'
  );
  if (rows.length === 0) {
    throw new Error('No animals found');
  }
  return rows as Animal[];
};

const getAnimalById = async (id: number) => {
  const [rows] = await promisePool.execute<GetAnimal[]>(
    'SELECT * FROM categories WHERE category_id = ?',
    [id]
  );
  if (rows.length === 0) {
    throw new Error('No categories found');
  }
  return rows[0] as Animal;
};

export {getAllAnimals, getAnimalById};
