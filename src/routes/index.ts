import { Router } from 'express'

import appointmentRoutes from './appointment'
import clientRoutes from './client'
import mechanicRoutes from './mechanic'
import userRoutes from './user'
import vehicleRoutes from './vehicle'

const router = Router()

router.use('/user', userRoutes)
router.use('/client', clientRoutes)
router.use('/vehicle', vehicleRoutes)
router.use('/appointment', appointmentRoutes)
router.use('/mechanic', mechanicRoutes)

export default router
