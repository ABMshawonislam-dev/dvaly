import mongoose from "mongoose";

const imageupload = new mongoose.Schema(
    {
        image:{
            type: Buffer
        }
    }

        
)


const Image = mongoose.model("image",imageupload)

export default Image