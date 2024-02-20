const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const router = express.Router()



router.post('/register' , async(req , res)=>{
    try {

        const userExists = await User.findOne({email:req.body.email})

        if(userExists){
            res.send({
                success : false,
                message : "user already Exists"
            })
        }

        const salt = await bcrypt.genSalt(10)

        console.log(salt)

        const hashPwd = bcrypt.hashSync(req.body.password , salt)
        req.body.password = hashPwd



        const newUser = await User(req.body)
        await newUser.save()

        res.send({
            success : true,
            message : "User Registered"
        })
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router