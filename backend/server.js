import express from 'express'
import data from './data.js'
import discount from './discount.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js'
import productRouter from './routes/productRouter.js'
import userRouter from './routes/userRouter.js'
const app = express()

dotenv.config()

mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("MopngoDB connected")
}).catch((err)=>{
  console.log(err)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/seed', seedRouter)
app.use('/products', productRouter)
app.use('/api/users', userRouter)

app.get('/category/:cat', function (req, res) {


  let categoryArr = []
  data.find((item)=>{
    if(req.params.cat == item.category){
      categoryArr.push(item)
    }
  })
  res.send(categoryArr)
  
})

app.get('/discount', function (req, res) {
  res.send(discount)
})

app.get('/cartproduct/:id', function (req, res) {
  let product = data.find((item)=>{
    if(req.params.id == item._id){
      return item
    }
  })

  res.send(product)
})

let port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log("Port 8000")
})