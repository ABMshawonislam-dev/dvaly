import React, {useState,useContext, useEffect, useReducer } from 'react'
import { Container,Row,Col,Card,Button,Modal,Form,ListGroup, Toast } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import CheckoutStep from './CheckoutStep'
import { Helmet } from 'react-helmet-async'
import {Store} from '../Store'
import {toast } from 'react-toastify';
import axios from 'axios'

const reducer = (state,action)=>{
    switch(action.type){
        case 'CREATE_REQUEST':
            return {...state,loading:true}
        case 'CREATE_SUCCESS':
            return {...state,loading:false}
        case 'CREATE_FAIL':
            return {...state,loading: false}
    }
}

const Placeorder = () => {
    const navigate = useNavigate()

    const [{loading},dispatch] = useReducer(reducer,{
        loading: false,
    })

    let {state,dispatch:ctxdispatch,state3,state4,dispatch4,state5} = useContext(Store)
    console.log(state.cart.cartItems)
    const {userInfo} = state3
    console.log(userInfo)
  const [fullname,setFullname] = useState(state4.shippingaddress.fullname || "")
  const [address,setAddress] = useState(state4.shippingaddress.address || "")
  const [city,setCity] = useState(state4.shippingaddress.city || "")
  const [postcode,setPostcode] = useState(state4.shippingaddress.postcode || "")
  const [country,setCountry] = useState(state4.shippingaddress.country || "")
  const [total,setTotal] = useState("")


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


    let handlePlaceOrder = async ()=>{
        	try{

                const {data} = await axios.post('/api/orders',
                    {
                        orderItems: state.cart.cartItems,
                        shippingaddress: state4.shippingaddress,
                        paymentMethod: state5.paymentMethod,
                        productPrice: total,
                        shippingPrice: 0,
                        taxPrice: total<500?0:(total*5)/100,
                        totalPrice: total+(total<500?0:(total*5)/100)+0
                    },
                    {
                        headers:{
                            authorization: `Bearer ${userInfo.token}`
                        }
                    }
                )

                ctxdispatch({type: 'CLEAR_CART'})
                dispatch({type: 'CREATE_SUCCESS'})
                localStorage.removeItem('cartItems')
                navigate(`/orders/${data.order._id}`)
            }catch(err){
                dispatch({type: 'CREATE_FAIL'})
                toast.error(err)
            }
    }

    useEffect(()=>{
        let total = state.cart.cartItems.reduce((accumulator,current)=> accumulator + current.price * current.quantity, 0)
        setTotal(total)
    },[state.cart.cartItems])


  return (
    <>
        <CheckoutStep step1="true" step2="true" step3="true" step4="true"/>
        <Helmet>
            <title>Place Order</title>
        </Helmet>
    <Container className='mt-5'>
    <h1>Preview Order</h1>
        <Row>
            <Col lg={8}>
                

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

                <Card className='mt-5'>
                    <Card.Body>
                        <Card.Title>Oder Items</Card.Title>
                        <hr/>
                        <Card.Text>
                            <b>Total Item:</b>  {state.cart.cartItems.length} <br/>
                            <ListGroup className='mt-3'>
                                {state.cart.cartItems.map(item=>(

                                <ListGroup.Item>
                                    <img className='me-4' src={item.img} style={{width:"50px"}}/>
                                    {item.name}
                                    <b className='ms-4 me-4'>Quantity:</b>{item.quantity}
                                </ListGroup.Item>
                                ))}
                               
                            </ListGroup>
                        </Card.Text>
                        <Link to="/cartpage" >Edit</Link>
                        {/* <Button onClick={handleShow} className='ms-5' variant="primary">Edit</Button> */}
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={4}>
            
            <Card className='mt-5'>
                    <Card.Body>
                        <Card.Title>Payment Summary</Card.Title>
                        <hr/>
                        <Card.Text>
                            <ListGroup className='mt-3'>
                            <ListGroup.Item><b>Product Price:${total}</b></ListGroup.Item>
                            <ListGroup.Item><b>Delivery Charge: $0 </b></ListGroup.Item>
                            <ListGroup.Item><b>Tax: ${total<500?0:(total*5)/100}</b></ListGroup.Item>
                            <ListGroup.Item><b>Total Price:{total+(total<500?0:(total*5)/100)+0}</b></ListGroup.Item>
                               
                               
                            </ListGroup>
                        </Card.Text>
                        <Button variant="primary" onClick={handlePlaceOrder}>place Order</Button>
                    </Card.Body>
                    </Card>
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