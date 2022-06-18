import express from 'express'

import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import Affiliate from '../models/affiliateModel.js'
import Storename from '../models/storeModel.js'


const productRouter = express.Router()

productRouter.post('/',(req,res)=>{
    console.log(req.body)
    let productInfo = {
        name: req.body.name,
        slug: req.body.slug,
        img: req.body.img,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        instock: req.body.instock,
        owner: req.body.owner
    }

    let product = new Product(productInfo)
    product.save()
})

productRouter.get('/',async (req,res)=>{
    const products = await Product.find()
    res.send(products)
})

// productRouter.get('/cat',async (req,res)=>{
//     const products = await category.find()
//     res.send(products)
// })


productRouter.get('/:slug', async (req, res) => {
    // console.log(req.query.id)
    if(req.query.id){
        console.log("ki re")
        let user = await User.findById(req.query.id)
        console.log(user)
        if(user.isAffiliate){
            let product =  await Product.findOne({slug:req.params.slug})
            if(product){
                res.send(product)
                let affiliateInfo = {
                    amount: (product.price*10)/100,
                    owner: req.query.id
                }
        
                const affiliate = new Affiliate(affiliateInfo)
                affiliate.save()
            }else{
                res.status(404).send({msg:'Product Not Found'})
            }
            
    
        }
    } else{
        let product =  await Product.findOne({slug:req.params.slug})
        if(product){
            res.send(product)

        }else{
            res.status(404).send({msg:'Product Not Found'})
        }
    }

    
  
  })

  productRouter.get('/affiliate/info/:id',async (req,res)=>{
    console.log(req.params.id)
        let data = await Affiliate.find({owner: req.params.id})
        console.log(data)
        res.send(data)
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

productRouter.get('/productlist/:id',async (req,res)=>{
    console.log(req.params.id)
    const data = await Product.find({owner:req.params.id})
    console.log(data)
    res.send(data)
})


export default productRouter