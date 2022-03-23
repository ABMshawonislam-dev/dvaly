import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

        name: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        img:{
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        instock:{
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        numberofrating:{
            type: Number,
            required: true,
        },
        cupon:{
            type: String,
        },
        discount:{
            type: Number,
        },
        discountlimit:{
            type: Number,
        },
        totalSale:{
            type: Number,
        }

},
{
    timesStamps: true,
}

)

const Product = mongoose.model('Product',productSchema)

export default Product