import bcrypt from "bcryptjs"

let userData = [
    {
        // _id:1,
        name: "Shawon",
        email: "shawon@gmail.com",
        password: bcrypt.hashSync("123456789"),
        isAdmin: true
    },
    {
        // _id:1,
        name: "Masum",
        email: "masum@gmail.com",
        password: bcrypt.hashSync("123456789"),
        isAdmin: false
    },
]

export default userData