import express from 'express';
import {
  animalGet,
  animalListGet,
  animalPost,
} from '../controllers/animalController';

const router = express.Router();

router.route('/').get(animalListGet).post(animalPost);

router.route('/:id').get(animalGet);

export default router;
