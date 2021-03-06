import mongoose from "mongoose";

const affiliateSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }

        
)


const Affiliate = mongoose.model("affiliate",affiliateSchema)

export default Affiliate