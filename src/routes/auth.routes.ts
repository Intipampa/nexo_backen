import { Router } from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/auth.controller';

const router = Router();

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

export default router;