import { Router } from 'express';
import {
  obtenerAutores, obtenerAutorPorId, crearAutor,
  editarAutor, deshabilitarAutor, habilitarAutor
} from '../controllers/autor.controller';

const router = Router();

router.get('/', obtenerAutores);
router.get('/:id', obtenerAutorPorId);
router.post('/', crearAutor);
router.put('/:id', editarAutor);
router.put('/:id/deshabilitar', deshabilitarAutor);
router.put('/:id/habilitar', habilitarAutor);

export default router;
