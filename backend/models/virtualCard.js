import mongoose from "mongoose";

const virtualCardSchema = new mongoose.Schema({
    amount:{
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const VirtualCard = mongoose.model('virtualcard',virtualCardSchema)

export default VirtualCard