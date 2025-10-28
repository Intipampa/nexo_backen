import { Router } from 'express';
import { obtenerDeudas, crearDeuda } from '../controllers/deuda.controller';
const router = Router();

router.get('/', obtenerDeudas);
router.post('/', crearDeuda);

export default router;
