import auth from '../controllers/auth.contoller'
import {Router} from 'express'
import { authenticateToken } from '../middleware/jsonWebToken'
import {convertToValidType} from "../types/middleware.types";

const router = Router();

router.post('/registration', auth.registration)
router.post('/login', auth.auth)
router.delete('/delete/:id', authenticateToken as convertToValidType, auth.remove as convertToValidType)

export default router