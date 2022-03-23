import express from "express"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils.js"

const userRouter = express.Router()

userRouter.post('/signin',async (req, res) => {
    let user =  await User.findOne({email:req.body.email})
    console.log(user)

    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                idAdmin: user.isAdmin,
                token: generateToken(user)
            })
            return
        }
    }

    res.status(401).send({msg: "Invalid Email or Password"})
    
  
  })

  export default userRouter