import express from "express"
import User from "../models/userModel.js"
import VirtualCard from "../models/virtualCard.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils.js"

const userRouter = express.Router()

userRouter.get('/userlist',async (req,res)=>{
    let user = await User.find({})
    console.log(user)
    res.send(user)
})

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
                isVendor: user.isVendor,
                isAffiliate: user.isAffiliate,
                token: generateToken(user)
            })
            return
        }
    }

    res.status(401).send({msg: "Invalid Email or Password"})
    
  
  })

  userRouter.post('/signup',async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    })
    const user = await newUser.save()

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        idAdmin: user.isAdmin,
        token: generateToken(user)
    })
   
  })

  userRouter.put('/:id',async (req, res) => {
    User.findByIdAndUpdate(req.params.id,{isVendor: true},{new: true},function(err,docs){
        if(err){
            console.log(err)
        }else{
            res.send(docs)
        }
    })
   
  })

  userRouter.post('/virtualcard',(req,res)=>{
      console.log(req.body)
      let virtualcardInfo = {
          amount: req.body.amount,
          owner: req.body.owner
      }

      const virtualcard = new VirtualCard(virtualcardInfo)
      virtualcard.save()
      res.send("done")
  })

  userRouter.post('/virtualcardpayment',async (req,res)=>{
      console.log(req.body)
      const data = await VirtualCard.find({owner: req.body.owner})
      console.log(data[0].amount)
      if(data[0].amount < req.body.price){
          console.log("Amount is not Less than product price")
      }else{
          console.log("data.amount - req.body.amount")
          console.log(data[0].amount - req.body.price)
          VirtualCard.findByIdAndUpdate(data[0]._id,{amount:data[0].amount - req.body.price},{new: true},function(err,docs){
              if(err){
                  console.log(err)
              }else{
                  console.log(docs)
              }
          })
      }
      
  })

  userRouter.put('/affiliate/:id',async (req, res) => {
    console.log(req.params)
    User.findByIdAndUpdate(req.params.id,{isAffiliate: true},{new: true},function(err,docs){
        if(err){
            console.log(err)
        }else{
            res.send(docs)
        }
    })
   
  })

  export default userRouter