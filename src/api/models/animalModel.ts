// animalModel.ts
import {ResultSetHeader} from 'mysql2';
import CustomError from '../../classes/CustomError';
import promisePool from '../../database/db';
import {Animal, GetAnimal, PostAnimal} from '../../interfaces/Animal';

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
    'SELECT * FROM animal WHERE animal_id = ?',
    [id]
  );
  if (rows.length === 0) {
    throw new Error('No animals found');
  }
  return rows[0] as Animal;
};

const addAnimal = async (category: PostAnimal) => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'INSERT INTO animals (animals_name) VALUES (?)',
    [category.name]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Animal not added', 304);
  }
  return headers.insertId;
};

const updateAnimal = async (id: number, category: PostAnimal) => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'UPDATE animals SET animals_name = ? WHERE animals_id = ?',
    [category.name, id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Animal not fount', 404);
  }
};

const deleteAnimal = async (id: number) => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'DELETE FROM animals WHERE animals_id = ?',
    [id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Animal not fount', 404);
  }
};

export {getAllAnimals, getAnimalById, addAnimal, updateAnimal, deleteAnimal};
