import { Router } from 'express'

import AppointmentController from '../controllers/appointment'

const router = Router()
const appointmentController = new AppointmentController()

router.post('/', appointmentController.create)
router.get('/', appointmentController.get)
router.put('/', appointmentController.update)
router.delete('/', appointmentController.delete)

export default router
