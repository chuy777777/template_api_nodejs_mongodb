import app from './app'
import config from './config'

app.listen(app.get("port"))
if (config.MODE == "DEVELOPMENT") {
    console.log("Server on port ", app.get("port"));
}
