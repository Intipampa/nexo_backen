import { Router } from 'express';
import { 
    obtenerUsuarios, 
    crearUsuario, 
    editarUsuario, 
    cambiarEstadoUsuario 
} from '../controllers/usuario.controller';

const router = Router();
router.get('/', obtenerUsuarios);
router.post('/', crearUsuario); 
router.put('/:id', editarUsuario);
router.patch('/estado/:id', cambiarEstadoUsuario);

export default router;