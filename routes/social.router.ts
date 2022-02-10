import social from '../controllers/social.controller'
import {Router} from 'express'
import { authenticateToken } from '../middleware/jsonWebToken'
import {convertToValidType} from "../types/middleware.types";

const router = Router();

router.get('/people', authenticateToken as convertToValidType, social.getPeople)

export default router