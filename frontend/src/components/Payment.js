import React, { useContext, useState } from 'react'
import {Container,Alert,Form, Button} from 'react-bootstrap'
import CheckoutStep from './CheckoutStep'
import { useNavigate,Link } from 'react-router-dom'
import  {Store} from '../Store'

const Payment = () => {
    let {state5,dispatch5} = useContext(Store)
    let navigate = useNavigate()
    let [paymentMethod,setPaymentmethod] = useState(state5.paymentMethod?state5.paymentMethod:"")

    // console.log(state5.paymentMethod)


    let handleSubmit = (e)=>{
        e.preventDefault()
        dispatch5({type:'PAYMENT_METHOD',payload: paymentMethod})
        localStorage.setItem('paymentMethod',JSON.stringify(paymentMethod))
        navigate('/placeorder')
    }

  return (
   <>
         <CheckoutStep step1="true" step2="true" step3="true"/>
    <Container  className='w-25 border mt-5 p-3'>
    <Link to="/shipping" className='back w-100'> <Button className='w-100'> Go To Shipping Page</Button></Link>
         <Alert  variant="primary" className='text-center '>
            <h5>Choose Payment Method</h5>
        </Alert>

        <Form onSubmit={handleSubmit}>
                <Form.Check 
                type="radio"
                id="paypal"
                label="Paypal"
                value="Paypal"
                checked={paymentMethod == "Paypal"}
                onChange={e=> setPaymentmethod(e.target.value)}
                
                />
                <Form.Check 
                    type="radio"
                    id="strip"
                    label="Strip"
                    value="Strip"
                    checked={paymentMethod == "Strip"}
                    onChange={e=> setPaymentmethod(e.target.value)}
                    
            />
                <Form.Check 
                    type="radio"
                    id="sslcommerz"
                    label="SSLcommerz"
                    value="SSLcommerz"
                    checked={paymentMethod == "SSLcommerz"}
                    onChange={e=> setPaymentmethod(e.target.value)}
                    
            />

            <Button type='submit' variant="primary" className='mt-3'>Continue</Button>
        </Form>
    </Container>
   </>
  )
}

export default Payment