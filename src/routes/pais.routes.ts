import { Router } from 'express';
import { obtenerPaises } from '../controllers/pais.controller';
const router = Router();

router.get('/', obtenerPaises);

export default router;
