import { Router } from 'express';
import {
  obtenerLibros,
  crearLibro,
  editarLibro,
  cambiarEstadoLibro,
} from '../controllers/libro.controller';

const router = Router();

router.get('/', obtenerLibros);

router.post('/', crearLibro);
router.put('/:id', editarLibro);
router.patch('/:id/estado', cambiarEstadoLibro);

export default router;