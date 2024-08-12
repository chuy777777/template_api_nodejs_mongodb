import Users from "../models/Users"
import config from "../config"
import {getDbConnection} from "../db/dbConnection"

export const verifyUser=async (req, res, next) => {
    if(req.decodedJwtToken){
        let {userId, mlToken, sicofiToken}=req.decodedJwtToken
        try {
            const dbConnection=getDbConnection()
            const usersModel=dbConnection.model(config.USER_COLLECTION_NAME, Users.schema)
            const user=await usersModel.findOne({"_id": userId})
            if(user){
                req.userData={
                    user: user,
                    usersModel: usersModel
                }
                return next()
            }else{
                return res.status(404).json({error: "", message: "Usuario no encontrado en la base de datos."})
            }
        } catch (error) {
            return res.status(409).json({error: error, message: "Ha ocurrido un problema en la base de datos."})
        }
    }else{
        return res.status(403).json({error: "", message: "No se proporciono el token decodificado de la aplicacion."})
    }
}