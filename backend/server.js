import express from 'express'
import data from './data.js'
import discount from './discount.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js'
import productRouter from './routes/productRouter.js'
import userRouter from './routes/userRouter.js'
import orderRoutes from './routes/orderRoutes.js'
import Image from './models/imageUpload.js'
const app = express()
import fs from 'fs'
import path from 'path'
import multer from 'multer'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);


const __dirname = path.dirname(__filename);


dotenv.config()

mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("MopngoDB connected")
}).catch((err)=>{
  console.log(err)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/imageupload', upload.single('avatar'), function (req, res, next) {
  let imgInfo = {
    image:fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename))
  }

  let img = new Image(imgInfo)
  img.save()
  

  
})

app.get('/imageupload',async (req,res)=>{
    let data = await Image.find({})
    res.send(data)
})

app.get('/api/keys/paypal',(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT || "sb")
})

app.use('/api/seed', seedRouter)
app.use('/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRoutes)

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