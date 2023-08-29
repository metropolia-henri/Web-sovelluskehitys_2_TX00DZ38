import express, {Request, Response, Router} from 'express';

import categoryRoute from './routes/categoryRoute';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'animals api v1',
  });
});

router.use('/categories', categoryRoute);
router.use('/species', categoryRoute);
router.use('/animals', categoryRoute);

export default router;
