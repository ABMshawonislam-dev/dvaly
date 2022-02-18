import React from 'react'
import { Container,Form,Button,Alert } from 'react-bootstrap'
import { Link,useLocation } from 'react-router-dom'

const Login = () => {

    let {search} = useLocation()
    let redirectUrl = new URLSearchParams(search).get('redirect')
    let redirect = redirectUrl ? redirectUrl : "/"
  return (
    <Container className='w-25 border mt-5 p-3'>
         <Alert variant="primary" className='text-center '>
            Login
        </Alert>
         <Form.Label htmlFor="inputPassword5">Email</Form.Label>
            <Form.Control
                type="email"
                placeholder='Write Your Email'
            />
         <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
                type="password"
                placeholder='Your Password'
            />

        <Button className='mt-3 mb-3' variant="primary">Primary</Button>
        <br/>
        <Form.Text id="passwordHelpBlock" muted>
            Don't Have An Account? <Link to={`/signup?redirect=${redirect}`}>Create Account</Link>
        </Form.Text>
    </Container>
  )
}

export default Login