import express from "express";
import Product from "../models/productModel.js";
import data from '../data.js'

const seedRouter = express.Router()


seedRouter.get('/',async (req,res)=>{
    await Product.remove({})
    const product = await Product.insertMany(data)  
    res.send(product)
})

export default seedRouter