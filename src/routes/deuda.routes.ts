import { Router } from 'express';
import { getDeudas, createDeuda, deleteDeuda } from '../controllers/deuda.controller'; // Ajusta la ruta si es necesario

const router = Router();

router.get('/', getDeudas);
router.post('/', createDeuda);
router.delete('/:id', deleteDeuda);

export default router;