import { Router } from 'express';
import {obtenerLibros, obtenerLibroPorId,crearLibro,editarLibro,deshabilitarLibro,habilitarLibro}
 from '../controllers/libro.controller';

const router = Router();

router.get('/', obtenerLibros);
router.get('/:id', obtenerLibroPorId);
router.post('/', crearLibro);
router.put('/:id', editarLibro);
router.put('/:id/deshabilitar', deshabilitarLibro);
router.put('/:id/habilitar', habilitarLibro);

export default router;
