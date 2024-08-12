import jwt from "jsonwebtoken"
import Users from "../models/Users"
import config from "../config"
import { getDbConnection } from "../db/dbConnection"

export const signIn = async (req, res) => {
    const { username, password } = req.body
    if (username && password) {
        try {
            const dbConnection = getDbConnection()
            const user = await dbConnection.collection(config.COLLECTION_NAME).findOne({ username: username })
            if (user) {
                const userSchema = new Users(user)
                const match = await userSchema.matchPassword(password)
                if (match) {
                    const jwtToken = jwt.sign({
                        userId: userSchema._id
                    }, config.JWT_SECRET, {
                        expiresIn: "1d"
                    })
                    return res.status(200).json({ error: "", message: "Se ha iniciado sesion satisfactoriamente.", jwtToken: jwtToken, username: userSchema.username})
                } else {
                    return res.status(403).json({ error: "", message: "La contraseña es incorrecta." })
                }
            } else {
                return res.status(404).json({ error: "", message: "Usuario no encontrado en la base de datos." })
            }
        } catch (error) {
            return res.status(409).json({ error: error, message: "Ha ocurrido un problema en la base de datos." })
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}

export const signUp = async (req, res) => {
    const { username, password } = req.body
    if (username && password) {
        const newUser = new Users({
            username,
            password
        })

        newUser.password = await newUser.encryptPassword(password)

        try {
            const dbConnection = getDbConnection()
            await dbConnection.collection(config.COLLECTION_NAME).insertOne(newUser)
            return res.status(200).json({ error: "", message: "Usuario creado exitosamente.", user: newUser })
        } catch (error) {
            return res.status(409).json({ error: error, message: "El usuario no tiene privilegios sobre la base de datos." })
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}

export const setUsernamePassword = async (req, res) => {
    const { oldUsername, newUsername, newPassword } = req.body
    if (oldUsername && newUsername && newPassword) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        if (oldUsername == user.username) {
            const newUser = new Users({
                username: newUsername,
                password: newPassword
            })
            newUser.password = await newUser.encryptPassword(newPassword)
            try {
                let updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "username": newUsername, "password": newUser.password }, { new: true }).select({ "_id": 1 })
                if (updatedUser) {
                    return res.status(200).json({ error: "", message: "La operacion fue exitosa en la base de datos." })
                } else {
                    return res.status(400).json({ error: "", message: "La operacion no fue exitosa en la base de datos." })
                }
            } catch (error) {
                return res.status(409).json({ error: error, message: "Ha ocurrido un problema en la base de datos." })
            }
        } else {
            return res.status(404).json({ error: "", message: "El nombre de usuario no coincide." })
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}