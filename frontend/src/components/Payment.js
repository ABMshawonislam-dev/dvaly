import React, { useState } from 'react'
import {Container,Alert,Form, Button} from 'react-bootstrap'
import CheckoutStep from './CheckoutStep'

const Payment = () => {
    let [paymentMethod,setPaymentmethod] = useState(false)

    let handleSubmit = (e)=>{
        e.preventDefault()
    }

  return (
   <>
         <CheckoutStep step1="true" step2="true" step3="true"/>
    <Container  className='w-25 border mt-5 p-3'>
         
         <Alert variant="primary" className='text-center '>
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