import express from 'express'

import Product from '../models/productModel.js'
import Storename from '../models/storeModel.js'


const productRouter = express.Router()

productRouter.post('/',(req,res)=>{
    
})

productRouter.get('/',async (req,res)=>{
    const products = await Product.find()
    res.send(products)
})


productRouter.get('/:slug', async (req, res) => {

    let product =  await Product.findOne({slug:req.params.slug})
    if(product){
        res.send(product)

    }else{
        res.status(404).send({msg:'Product Not Found'})
    }
  
  })

productRouter.post('/storename', async (req, res) => {
        console.log(req.body)

        let stornameInfo = {
            name: req.body.name,
            owner: req.body.id
        }

        const storename = new Storename(stornameInfo)
        storename.save()
        console.log("cate created")
    
  
  })

productRouter.get('/storename/:id', async (req, res) => {
        
        let data = await Storename.find({owner: req.params.id})
        res.send(data)
    
  
  })


export default productRouter