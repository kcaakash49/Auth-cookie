require('dotenv').config()

console.log(process.env.MONGODB_URL)
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("Db connected Successfully")).catch(()=>console.error("cannot connect to db"))

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    hobbies: String
})

const Users = mongoose.model("Users",userSchema);

module.exports = {
    Users
}