import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Form,Button,Container } from 'react-bootstrap'
import {Store} from '../Store'

const VertualCard = () => {

    const {state3} = useContext(Store)
    console.log(state3)

    let [amount,setAmount] = useState()


    let handlePayment = ()=>{
        let {data} = axios.post('/api/users/virtualcard',{
            amount: amount,
            owner:  state3.userInfo._id
        })
    } 

  return (
      <Container>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Deposit Amount</Form.Label>
                <Form.Control onChange={(e)=>setAmount(e.target.value)} type="email" placeholder="name@example.com" />
            </Form.Group>
            <Button onClick={handlePayment}>Paypal</Button>
        </Form>
      </Container>
    
  )
}

export default VertualCard