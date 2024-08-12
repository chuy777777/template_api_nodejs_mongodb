
export const updateUsername = async (req, res) => {
    const { username } = req.body
    if(username){
        let { userId } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData
        
        try {
            let updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "username": username }, { new: true }).select({ "_id": 0, "username": 1 })
            if (updatedUser) {
                return res.status(200).json({ error: "", message: "La operacion fue exitosa en la base de datos.", username: updatedUser.username })
            } else {
                return res.status(400).json({ error: "", message: "La operacion no fue exitosa en la base de datos." })
            }
        } catch (error) {
            return res.status(409).json({ error: error, message: "Ha ocurrido un problema en la base de datos." })
        }
    }else{
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}

/* 
fetch
    import fetch from "cross-fetch"

        - Operacion GET
            let uris = []
            for (let i = 0; i < routes.length; i++) {
                let URI=...
                uris.push(fetch(URI, {
                    method: 'GET'
                }))
            }
            let responses = await Promise.all(uris);

        - Operacion POST 
            let body = {
                ...
            }
            let headers = {
                'Authorization': "Bearer " + TOKEN,
                'Content-Type': 'application/json'
            }
            let URI=...
            let response = await fetch(URI, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            })
*/
