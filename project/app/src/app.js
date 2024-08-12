// Este archivo sirve para configurar la aplicacion de express

import express from "express";
import cors from "cors";
import bodyParser from "body-parser"
import morgan from "morgan";
import pkg from "../package.json"
import config from './config'
import { connectToDb } from "./db/dbConnection"

// Importamos rutas para un apartado en especifico
import authRouter from "./routes/auth.routes"
import dbRouter from "./routes/db.routes"

// Iniciamos express
const app = express()

// Nos conectamos a la base de datos mongodb
connectToDb((err) => {
    if (err) {
        console.error(`DB connection error: ${err.message}`);
    }
})

// Configuraciones de express
const port = process.env.PORT || 4000;
app.set("port", port)
app.set('pkg', pkg)
app.use(cors({
    origin: config.URI_APP,
    credentials: true
}))
if (config.MODE == "DEVELOPMENT") {
    app.use(morgan("dev"))
}
// Si se envia poca informacion 
//app.use(express.json())
// Si se envia mucha informacion
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));

// En la ruta inicial mostramos los detalles de la aplicacion
app.get('/', (req, res) => {
    res.status(200).json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    })
})

app.use('/api/auth', authRouter)
app.use('/api/db', dbRouter)

export default app