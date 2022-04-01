import React,{useState,useContext,useEffect} from 'react'
import {Helmet} from 'react-helmet-async'
import {Form,Button,Container,Alert} from 'react-bootstrap'
import { Store } from '../Store'
import { useNavigate } from 'react-router-dom'
import CheckoutStep from './CheckoutStep'

const Shipping = () => {
    const navigate = useNavigate()
    const {state4,dispatch4,state3} = useContext(Store)
    const {userInfo} = state3
    const [fullname,setFullname] = useState(state4.shippingaddress.fullname || "")
    const [address,setAddress] = useState(state4.shippingaddress.address || "")
    const [city,setCity] = useState(state4.shippingaddress.city || "")
    const [postcode,setPostcode] = useState(state4.shippingaddress.postcode || "")
    const [country,setCountry] = useState(state4.shippingaddress.country || "")


    let handleSubmit = (e)=>{
        e.preventDefault()
        console.log("ami")
        dispatch4({
            type: "SHIPPING_ADDRESS",
            payload:{
                fullname,
                address,
                city,
                postcode,
                country
            }
           
        })
        localStorage.setItem('shippingaddress',JSON.stringify({
            fullname,
            address,
            city,
            postcode,
            country
        }))

        navigate('/payment')

    }

    useEffect(()=>{
        if(!userInfo){
            navigate('/signin?redirect=/shipping')
        }
    },[])
  return (
    <>
        <Helmet>
            <title>Shipping Address</title>
        </Helmet>
        <CheckoutStep step1="true" step2="true"/>
        <Container className='w-25 border mt-5 p-3'>
        <Alert variant="primary" className='text-center '>
            <h1>Shipping Address</h1>
        </Alert>
   

            <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={fullname} onChange={(e)=>setFullname(e.target.value)} type="text" placeholder="Write Your Full Name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={address} onChange={(e)=>setAddress(e.target.value)} type="text" placeholder="Address" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city} onChange={(e)=>setCity(e.target.value)} type="text" placeholder="City" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control value={postcode} onChange={(e)=>setPostcode(e.target.value)} type="text" placeholder="Postcode" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={country} onChange={(e)=>setCountry(e.target.value)} type="text" placeholder="Country" />
                    </Form.Group>
                    <Button type="submit" variant="success">Continue</Button>
            </Form>
        </Container>
    </>
  )
}

export default Shipping