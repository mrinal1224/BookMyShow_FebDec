const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.send({
        success: false,
        message: "user already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    console.log(salt);

    const hashPwd = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashPwd;

    const newUser = await User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "User Registered",
    });
  } catch (error) {
    console.log(error);
  }
});


router.post('/login' , async(req , res)=>{
    try {
        const user = await User.findOne({ email: req.body.email })

        if(!user){
            res.send({
                success: false,
                message: "user does not exist Please Register",
              });
        }

        const validPassword = await bcrypt.compare(req.body.password , user.password)

        if(!validPassword){
            res.send({
                success: false,
                message: "Sorry, invalid password entered!"
            })
        }

        res.send({
            success: true,
            message: "You've successfully logged in!",
        
        })


    } catch (error) {
         console.error(error)
    }
})

module.exports = router;
