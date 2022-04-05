import React, {useState,useContext } from 'react'
import { Container,Row,Col,Card,Button,Modal,Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CheckoutStep from './CheckoutStep'
import { Helmet } from 'react-helmet-async'
import {Store} from '../Store'

const Placeorder = () => {
 

    let {state4,dispatch4,state5} = useContext(Store)
  const [fullname,setFullname] = useState(state4.shippingaddress.fullname || "")
  const [address,setAddress] = useState(state4.shippingaddress.address || "")
  const [city,setCity] = useState(state4.shippingaddress.city || "")
  const [postcode,setPostcode] = useState(state4.shippingaddress.postcode || "")
  const [country,setCountry] = useState(state4.shippingaddress.country || "")
    console.log(state5)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let handleSubmit = (e)=>{
        e.preventDefault()
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
        setShow(false)


    }


  return (
    <>
        <CheckoutStep step1="true" step2="true" step3="true" step4="true"/>
        <Helmet>
            <title>Place Order</title>
        </Helmet>
    <Container className='mt-5'>

        <Row>
            <Col lg={8}>
                <h1>Preview Order</h1>

                <Card className='mt-5'>
                    <Card.Body>
                        <Card.Title>Shipping Address</Card.Title>
                        <hr/>
                        <Card.Text>
                            <b>Name:</b>  {state4.shippingaddress.fullname} <br/>
                            <b>Address:</b>  {state4.shippingaddress.address} <br/>
                            <b>City:</b>  {state4.shippingaddress.city} <br/>
                            <b>Country:</b>  {state4.shippingaddress.country} <br/>
                            <b>Postcode:</b>  {state4.shippingaddress.postcode} <br/>
                        </Card.Text>
                        <Link to="/shipping" >Edit</Link>
                        <Button onClick={handleShow} className='ms-5' variant="primary">Edit</Button>
                    </Card.Body>
                </Card>

                <Card className='mt-5'>
                    <Card.Body>
                        <Card.Title>Payment Method</Card.Title>
                        <hr/>
                        <Card.Text>
                            <b>Payment Method:</b>  {state5.paymentMethod} <br/>
                        </Card.Text>
                        <Link to="/payment" >Edit</Link>
                        {/* <Button onClick={handleShow} className='ms-5' variant="primary">Edit</Button> */}
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={4}>
            information2
            </Col>
        </Row>
    </Container>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSubmit} type="submit" variant="success">Continue</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Placeorder