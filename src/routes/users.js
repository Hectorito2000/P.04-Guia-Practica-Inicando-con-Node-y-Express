import { Router } from 'express';
import { getAllUsers,getUserByEmail,getBuscarNombre,postCrearUsuario,actualizarUsuario,eliminarUsuario} from '../services/userServices.js';

const router = Router();

router.get('/', getAllUsers);

// Ruta para obtener un usuario por email (GET /users/buscarPorEmail/:email)
router.get('/buscarPorEmail/:email', getUserByEmail);

router.get('/buscarPorNombre/:nombre', getBuscarNombre);

router.post('/', postCrearUsuario);

router.put('/:id', actualizarUsuario);

router.delete('/:id', eliminarUsuario);

export default router;