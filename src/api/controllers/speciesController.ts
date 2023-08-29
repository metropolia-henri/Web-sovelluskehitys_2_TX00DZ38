// speciesController.ts
import {Request, Response, NextFunction} from 'express';
import {
  getAllSpecies,
  getSpeciesById,
  addSpecies,
} from '../models/speciesModel';
import MessageResponse from '../../interfaces/MessageResponse';
import {PostSpecies} from '../../interfaces/Species';

const speciesListGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const species = await getAllSpecies();
    res.json(species);
  } catch (error) {
    next(error);
  }
};

const speciesGet = async (
  req: Request<{id: number}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const species = await getSpeciesById(req.params.id);
    res.json(species);
  } catch (error) {
    next(error);
  }
};
const speciesPost = async (
  req: Request<{}, {}, PostSpecies>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await addSpecies(req.body);
    const message: MessageResponse = {
      message: 'Species added',
      id: id,
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

export {speciesListGet, speciesGet, speciesPost};
