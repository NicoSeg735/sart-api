import { Router } from 'express'

import UserController from '../controllers/user'

const router = Router()
const userController = new UserController()

router.post('/', userController.create)
router.get('/', userController.get)
router.put('/', userController.update)
router.delete('/', userController.delete)

export default router
