import { Router } from 'express'

import appointmentRoutes from './appointment'
import clientRoutes from './client'
import mechanicRoutes from './mechanic'
import userRoutes from './user'
import vehicleRoutes from './vehicle'

const router = Router()

router.use('/users', userRoutes)
router.use('/clients', clientRoutes)
router.use('/vehicles', vehicleRoutes)
router.use('/appointments', appointmentRoutes)
router.use('/mechanics', mechanicRoutes)

export default router
