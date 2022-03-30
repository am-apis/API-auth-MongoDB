import { Router } from 'express'
const router = Router()

import * as authCtrl from '../controllers/authController'
import { verifySingup } from '../middlewares'

router.post('/singup', [verifySingup.checkDuplicateUsernameOrEmail, verifySingup.checkRolesExisted],
    authCtrl.singup)


router.post('/singin', authCtrl.singin)

export default router