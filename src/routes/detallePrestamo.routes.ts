import { Router } from 'express';
import { obtenerDetallesPrestamo } from '../controllers/detallePrestamo.controller';
const router = Router();

router.get('/', obtenerDetallesPrestamo);

export default router;
