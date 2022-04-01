import React,{useContext, useEffect, useState} from 'react'
import { Container,Form,Button,Alert } from 'react-bootstrap'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Store} from '../Store'
import {toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate()
    let {search} = useLocation()
   
    let redirectUrl = new URLSearchParams(search).get('redirect')
    let redirect = redirectUrl ? redirectUrl : "/"

    let [name,setName] = useState("")
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let [cpassword,setCpassword] = useState("")

    const {state3, dispatch3} = useContext(Store)

    const {userInfo} = state3

    let handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const {data} = await axios.post("/api/users/signup",{
                name,
                email,
                password
            })
            navigate('/signin',{state:"Please Login"})
        }catch(err){
            toast.error("Invalid email or password")
        }
    }

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[])
  return (
    <Container className='w-25 border mt-5 p-3'>
         <Alert variant="primary" className='text-center '>
            <h1>Sign Up</h1>
        </Alert>
         <Form onSubmit={handleSubmit}>
         <Form.Label htmlFor="inputPassword5">name</Form.Label>
            <Form.Control
                type="text"
                placeholder='Write Your Name'
                onChange={(e)=>setName(e.target.value)}
            />
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
         <Form.Label htmlFor="inputPassword5">Confirm Password</Form.Label>
            <Form.Control
                type="password"
                placeholder='Confirm Password'
                onChange={(e)=>setCpassword(e.target.value)}
            />

        <Button type="submit" className='mt-3 mb-3' variant="primary">Signup</Button>
         </Form>
        <br/>
        <Form.Text id="passwordHelpBlock" muted>
            Already Have An Account? <Link to={`/signip?redirect=${redirect}`}>Login</Link>
        </Form.Text>
    </Container>
  )
}

export default Signup