

const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { Users } = require('../src/db')
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());

// @ts-ignore
app.post("/signup",async (req,res) => {
    const body = req.body;
    if(!body){
        res.json({
            message:"Error"
        })
    }
    const user = await Users.findOne({
        username: body.username
    })
    if(user){
        return res.json({
            message:"User already present"
        })
    }
    try{
        await Users.create({
            username: body.username,
            password: body.password,
            firstName: body.firstName,
            lastName: body.lastName,
            hobbies: body.hobbies
        })
        const token = jwt.sign('username', process.env.SECRET_KEY)
        // res.cookie('token', token)
        res.status(200).json({
            message: "Added Successfully"
        })
    }catch(e){
        res.json({
            message: "failed",
            error: e
        })
    }
})
// @ts-ignore
app.post('/signin',async (req,res) => {
    const { username, password } = req.body;
    try{
        const user = await Users.findOne({
            username, password
        })
        console.log(user)
        if(!user){
            return res.json({
                message: "Invalid username or password"
            })
        }
        const token = jwt.sign('username', process.env.SECRET_KEY);
        res.cookie('token', token);
        res.json({
            message: "Successfully signed in"
        })
    }catch{
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

// @ts-ignore
app.post('/signout', (req,res) => {
    res.clearCookie('token');
    res.json({
        message: 'Signed Out'
    })
})
app.listen(3000, () => {
    console.log("Server started")
})