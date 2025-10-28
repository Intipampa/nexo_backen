import { Router } from 'express';
import { obtenerGeneros, crearGenero, editarGenero } from '../controllers/genero.controller';
const router = Router();

router.get('/', obtenerGeneros);
router.post('/', crearGenero);
router.put('/:id', editarGenero);

export default router;
