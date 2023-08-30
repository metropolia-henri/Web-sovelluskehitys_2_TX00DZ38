// speciesModel.ts
import {ResultSetHeader} from 'mysql2';
import CustomError from '../../classes/CustomError';
import promisePool from '../../database/db';
import {Species, GetSpecies, PostSpecies} from '../../interfaces/Species';

const getAllSpecies = async (): Promise<Species[]> => {
  const [rows] = await promisePool.execute<GetSpecies[]>(
    'SELECT * FROM species'
  );
  if (rows.length === 0) {
    throw new Error('No species found');
  }
  return rows as Species[];
};

const getSpeciesById = async (id: number): Promise<Species> => {
  const [rows] = await promisePool.execute<GetSpecies[]>(
    'SELECT * FROM species WHERE species_id = ?',
    [id]
  );
  if (rows.length === 0) {
    throw new Error('No species found');
  }
  return rows[0] as Species;
};

const addSpecies = async (species: PostSpecies) => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'INSERT INTO species (species_name) VALUES (?)',
    [species.name, species.category]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Species not added', 304);
  }
  return headers.insertId;
};

const updateSpecies = async (id: number, species: PostSpecies) => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'UPDATE species SET species_name = ?, category = ? WHERE species_id = ?',
    [species.name, species.category, id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Species not fount', 404);
  }
};

const deleteSpecies = async (id: number) => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'DELETE FROM species WHERE species_id = ?',
    [id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Species not fount', 404);
  }
};

export {
  getAllSpecies,
  getSpeciesById,
  addSpecies,
  updateSpecies,
  deleteSpecies,
};
