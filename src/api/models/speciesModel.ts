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
    'SELECT * FROM species WHERE id = ?',
    [id]
  );
  if (rows.length === 0) {
    throw new Error('No species found');
  }
  return rows[0] as Species;
};

const addSpecies = async (species: PostSpecies) => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'INSERT INTO species (name) VALUES (?)',
    [species.name]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Species not added', 304);
  }
  return headers.insertId;
};

export {getAllSpecies, getSpeciesById, addSpecies};
