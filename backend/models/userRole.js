import mongoose from 'mongoose'

const userRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    permissions: [{type:String}]
   

})


const UserRole = mongoose.model("userrole",userRoleSchema)

export default UserRole