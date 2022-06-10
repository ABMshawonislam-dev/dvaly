import React,{useContext, useEffect, useState} from 'react'
import { Container,Form,Button,Alert } from 'react-bootstrap'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Store} from '../Store'
import {toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate()
    let {search,state} = useLocation()
    console.log(state)

    // if(state){
    //     toast.success(state)
    // }
    let redirectUrl = new URLSearchParams(search).get('redirect')
    let redirect = redirectUrl ? redirectUrl : "/"

    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")

    const {state3, dispatch3} = useContext(Store)

    const {userInfo} = state3

    let handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const {data} = await axios.post("/api/users/signin",{
                email,
                password
            })
            console.log(data)
            dispatch3({type: 'USER_SIGNIN',payload:data })
            localStorage.setItem('userInfo',JSON.stringify(data))
            navigate(redirect || "/")
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
        <Form.Text id="passwordHelpBlock" muted>
            Don't Have An Account? <Link to={`/signup?redirect=${redirect}`}>Create Account</Link>
        </Form.Text>
    </Container>
  )
}

export default Login