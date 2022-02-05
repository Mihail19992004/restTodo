import todo from '../controllers/todo.controller'
import {Router} from 'express'
import { authenticateToken } from '../middleware/jsonWebToken'

const router = Router();

router.get('/', authenticateToken, todo.getTodo)
router.post('/', authenticateToken, todo.addTodo)
router.put('/', authenticateToken, todo.patchTodo)
router.delete('/:id', authenticateToken, todo.remove)

export default router