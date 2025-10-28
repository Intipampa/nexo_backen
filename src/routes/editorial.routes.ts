import { Router } from 'express';
import {obtenerEditoriales, obtenerEditorialPorId, crearEditorial, editarEditorial, deshabilitarEditorial,
    habilitarEditorial} from '../controllers/editorial.controller';

const router = Router();

router.get('/', obtenerEditoriales);
router.get('/:id', obtenerEditorialPorId);
router.post('/', crearEditorial);
router.put('/:id', editarEditorial);
router.put('/:id/deshabilitar', deshabilitarEditorial);
router.put('/:id/habilitar', habilitarEditorial);

export default router;
