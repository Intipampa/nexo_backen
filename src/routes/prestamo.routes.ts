import { Router } from 'express';
import {
  getPrestamos,
  createPrestamo,
  updatePrestamo,
  deletePrestamo,
} from '../controllers/prestamo.controller';

const router = Router();

router.get('/', getPrestamos);
router.post('/', createPrestamo);
router.put('/:id', updatePrestamo);
router.delete('/:id', deletePrestamo);

export default router;
