import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const message = 'Health check';
  res.send(message);
});

export default router;
