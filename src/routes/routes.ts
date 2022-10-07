import { Router } from 'express';
import { movieMetData } from '../controllers/movieMetadata';
const router = Router();

router.get('/:id?', movieMetData);

export default router;
