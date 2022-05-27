import mongoose from 'mongoose'

const storeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Storename = new mongoose.model('storename',storeSchema)

export default Storename

