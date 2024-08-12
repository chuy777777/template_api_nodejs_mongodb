import config from "../config"

export const verifyRole=async (req, res, next) => {
    if(req.headers.authorization){
        // Authorization: <roleSecret>
        const roleSecret=req.headers.authorization
        if(roleSecret==config.ROLE_SECRET){
            return next()
        }else{
            return res.status(401).json({error: "", message: "No tienes autorizacion."})
        } 
    }else{
        return res.status(403).json({error: "", message: "No se ha proporcionado la clave secreta."})
    }
}