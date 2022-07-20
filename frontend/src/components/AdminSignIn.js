import React,{useState} from 'react'
import { Container,Form,Button,Alert } from 'react-bootstrap'
import axios from 'axios'

const AdminSignIn = () => {
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")

    let handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const {data} = await axios.post("/api/users/adminsignin",{
                email,
                password
            })
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }

  return (
    <Container className='w-25 border mt-5 p-3'>
         <Alert variant="primary" className='text-center '>
            <h1>Login</h1>
        </Alert>
         <Form onSubmit={handleSubmit}>
         <Form.Label htmlFor="inputPassword5">Email</Form.Label>
            <Form.Control
                type="email"
                placeholder='Write Your Email'
                onChange={(e)=>setEmail(e.target.value)}
            />
         <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
                type="password"
                placeholder='Your Password'
                onChange={(e)=>setPassword(e.target.value)}
            />

        <Button type="submit" className='mt-3 mb-3' variant="primary">Signin</Button>
         </Form>
        <br/>
    
    </Container>
  )
}

export default AdminSignIn