import auth from '../controllers/auth.contoller'
import {Router} from 'express'

const router = Router();

router.post('/registration', auth.registration)
router.post('/login', auth.auth)

export default router