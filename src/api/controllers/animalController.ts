// animalController.ts
import {Request, Response, NextFunction} from 'express';
import {getAllAnimals, getAnimalById} from '../models/animalModel';

const animalListGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const animals = await getAllAnimals();
    res.json(animals);
  } catch (error) {
    next(error);
  }
};

const animalGet = async (
  req: Request<{id: number}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const animal = await getAnimalById(req.params.id);
    res.json(animal);
  } catch (error) {
    next(error);
  }
};

export {animalListGet, animalGet};
