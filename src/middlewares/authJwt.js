import res from 'express/lib/response'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/RoleModel'
import UserModel from '../models/UserModel'

export const verifyToken = async(req, res, next) => {
    try {
        const token = req.headers["x-access-token"]

        if (!token) return res.status(404).json({ message: "No token providen" })

        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id

        const user = await UserModel.findById(req.userId, { password: 0 })
        console.log(user)
        if (!user) return res.status(404).json({ message: 'no user found' })

        next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

export const isModerator = async(req, res, next) => {
    const user = await UserModel.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next()
            return
        }
    }

    return res.status(403).json({ message: "Require Moderator role" })

}

export const isAdmin = async(req, res, next) => {
    const user = await UserModel.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next()
            return
        }
    }

    return res.status(403).json({ message: "Require Admin role" })

}