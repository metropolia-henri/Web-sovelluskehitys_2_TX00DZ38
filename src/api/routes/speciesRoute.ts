import express from 'express';
import {
  speciesGet,
  speciesListGet,
  speciesPost,
} from '../controllers/speciesController';

const router = express.Router();

router.route('/').get(speciesListGet).post(speciesPost);

router.route('/:id').get(speciesGet);

export default router;
