import {Schema, model} from "mongoose"
import bcrypt from "bcrypt"
import config from "../config"

const usersSchema=new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
})

usersSchema.methods.encryptPassword=async password => {
    const salts=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(password, salts)
    return hashPassword
}

usersSchema.methods.matchPassword=async function(password) {
    const match=await bcrypt.compare(password, this.password)
    return match
}

module.exports = model(config.USER_COLLECTION_NAME, usersSchema)