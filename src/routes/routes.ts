import { Router } from 'express';
import { movieMetData } from '../services/metaDataService';
const router = Router();

router.get('/:id?', movieMetData);

export default router;
