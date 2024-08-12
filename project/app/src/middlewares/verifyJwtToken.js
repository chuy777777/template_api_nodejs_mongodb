import jwt from "jsonwebtoken"
import config from "../config"

export const verifyJwtToken=async (req, res, next) => {
    if(req.headers.authorization){
        // Authorization: Bearer <token>
        const jwtToken=req.headers.authorization.split(" ")[1];
        try{
            const decodedJwtToken=jwt.verify(jwtToken, config.JWT_SECRET)
            req.decodedJwtToken=decodedJwtToken
            req.jwtToken=jwtToken
            return next()
        }catch(error){
            return res.status(401).json({error: error, message: "Usuario sin autorizacion. Favor de volver a iniciar sesion en la aplicacion."})
        }
    }else{
        return res.status(403).json({error: "", message: "Token de usuario no proporcionado."})
    }
}