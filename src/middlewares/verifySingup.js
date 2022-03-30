import { ROLES } from '../models/RoleModel'
import UserModel from '../models/UserModel'

export const checkDuplicateUsernameOrEmail = async(req, res, next) => {
    const user = await await UserModel.findOne({ username: req.body.username })

    if (user) return res.status(400).json({ massage: 'The user already exist' })

    const email = await await UserModel.findOne({ email: req.body.email })

    if (email) return res.status(400).json({ massage: 'The email already exist' })

    next()
}

export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exists`
                })
            }
        }
    }

    next()
}