import { Router } from 'express'

import VehicleController from '../controllers/vehicle'

const router = Router()
const vehicleController = new VehicleController()

router.post('/', vehicleController.create)
router.get('/', vehicleController.get)
router.put('/', vehicleController.update)
router.delete('/', vehicleController.delete)

export default router
