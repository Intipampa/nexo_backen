import { Router } from 'express';
import { obtenerSexos } from '../controllers/sexo.controller';
const router = Router();

router.get('/', obtenerSexos);

export default router;
