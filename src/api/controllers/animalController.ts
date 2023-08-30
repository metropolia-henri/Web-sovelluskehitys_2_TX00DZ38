// animalController.ts
import {Request, Response, NextFunction} from 'express';
import {
  addAnimal,
  deleteAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
} from '../models/animalModel';
import {PostAnimal} from '../../interfaces/Animal';
import MessageResponse from '../../interfaces/MessageResponse';

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

const animalPost = async (
  req: Request<{}, {}, PostAnimal>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await addAnimal(req.body);
    const message: MessageResponse = {
      message: 'Animal added',
      id: id,
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

const animalPut = async (
  req: Request<{id: number}, {}, PostAnimal>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await updateAnimal(id, req.body);
    const message: MessageResponse = {
      message: 'Animal updated',
      id: id,
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

const animalDelete = async (
  req: Request<{id: number}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await deleteAnimal(id);
    const message: MessageResponse = {
      message: 'Animal deleted',
      id: id,
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

export {animalListGet, animalGet, animalPost, animalPut, animalDelete};
