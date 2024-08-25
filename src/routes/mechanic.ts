import { Router } from 'express'

import MechanicController from '../controllers/mechanic'

const router = Router()
const mechanicController = new MechanicController()

router.post('/', mechanicController.create)
router.get('/', mechanicController.get)
router.put('/', mechanicController.update)
router.delete('/', mechanicController.delete)
router.get('/available', mechanicController.getAvailableMechanics)

export default router
