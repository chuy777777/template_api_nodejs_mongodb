import dotenv from "dotenv"
dotenv.config()

// Local 
// var URI_DB_CONNECTION=`mongodb://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@${process.env.DB_HOST}:${process.env.DB_PORT}/replicaSet=${process.env.REPLICA_SET_NAME}?authSource=admin&replicaSet=${process.env.REPLICA_SET_NAME}&readPreference=primary&directConnection=true&ssl=false`

// Cloud
var URI_DB_CONNECTION=`mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@${process.env.CLUSTER_STRING}/${process.env.DB_NAME}?retryWrites=true&w=majority`

module.exports={
    MODE: process.env.MODE,
    JWT_SECRET: process.env.JWT_SECRET,
    ROLE_SECRET: process.env.ROLE_SECRET,
    DB_NAME: process.env.DB_NAME,
    USER_COLLECTION_NAME: process.env.USER_COLLECTION_NAME,
    URI_DB_CONNECTION: URI_DB_CONNECTION,
}

