import todo from '../controllers/todo.controller'
import { Router } from 'express'
import { authenticateToken } from '../middleware/jsonWebToken'
import { convertToValidType } from "../types/middleware.types";

const router = Router();

router.get('/', authenticateToken as convertToValidType,  todo.getTodo)
router.post('/', authenticateToken as convertToValidType, todo.addTodo)
router.put('/', authenticateToken as convertToValidType, todo.patchTodo)
router.delete('/:id', authenticateToken as convertToValidType, todo.remove)

export default router