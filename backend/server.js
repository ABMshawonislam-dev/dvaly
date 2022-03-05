import express from 'express'
import data from './data.js'
import discount from './discount.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
const app = express()

dotenv.config()

mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("MopngoDB connected")
}).catch((err)=>{
  console.log(err)
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/products', function (req, res) {
  res.send(data)
})

app.get('/products/:slug', function (req, res) {

  let product = data.find((item)=>{
    if(req.params.slug == item.slug){
      return item
    }
  })

  res.send(product)
})
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