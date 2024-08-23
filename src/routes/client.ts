import { Router } from 'express'

import ClientController from '../controllers/client'

const router = Router()
const clientController = new ClientController()

router.post('/', clientController.create)
router.get('/', clientController.get)
router.put('/', clientController.update)
router.delete('/', clientController.delete)

export default router
