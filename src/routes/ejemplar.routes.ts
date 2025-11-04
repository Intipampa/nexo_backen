import { Router } from 'express';
import {
  getEjemplares,
  createEjemplar,
  updateEjemplar,
  deleteEjemplar,
} from '../controllers/ejemplar.controller';

const router = Router();

router.get('/', getEjemplares);
router.post('/', createEjemplar);
router.put('/:id', updateEjemplar);
router.delete('/:id', deleteEjemplar);

export default router;
