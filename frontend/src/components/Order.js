import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import {  PayPalButtons,usePayPalScriptReducer } from "@paypal/react-paypal-js";
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate, useParams,Link} from 'react-router-dom'
import {Alert,Container,Card,Button,Col,Row,ListGroup} from 'react-bootstrap'
import {Store} from '../Store'
import { toast } from 'react-toastify';

function reducer(state,action){
    switch (action.type){
        case 'FETCH_REQUEST':
            return {...state,loading:true,error: ''}
        case 'FETCH_SUCCESS':
            return {...state,loading:false,order:action.payload}
        case 'FETCH_FAIL':
            return {...state,loading:false, error:action.payload}
        case 'PAY_REQUEST':
            return {...state,loadingPay: true}
        case 'PAY_SUCCESS':
            return {...state,loadingPay:false,successPay: true}
        case 'PAY_FAIL':
            return {...state,loadingPay:false,errorPay: action.payload}
        case 'PAY_RESET':
            return {...state,loadingPay:false,successPay: false}

        default:
            return state
    }
}

const Order = () => {
   


    const {state3} = useContext(Store)
    const {userInfo} = state3

    const params = useParams()
    const {id: orderID} = params
    const navigate = useNavigate()

    const [{loading,error,order,successPay,loadingPay,},dispatch] = useReducer(reducer,{
        loading: false,
        order: {},
        error: '',
        successPay: false,
        loadingPay:false
    })

    const [{isPending}, paypalDispatch] = usePayPalScriptReducer()


function createOrder(data,actions){
        return actions.order
        .create({
            purchase_units:[
                {
                    amount: {value: order.totalPrice}
                }
            ]
        }).then((orderID)=>{
            return orderID
        })

}

function onApprove(data,actions){
    return actions.order.capture().then(async function(details){
        try{
            dispatch({type: 'PAYPAL_REQUEST'})
            const {data} = await axios.put(`/api/orders/${order._id}/pay`,details,{
                headers: {authorization: `Bearer ${userInfo.token}`}
              
            })
            dispatch({type: 'PAY_SUCCESS',payload: data})
            toast.success("Order Is Paid")

        }catch(err){
            dispatch({type: 'PAY_FAIL',payload: err.message})
            toast.error(err.message)
        }
    })
}

function onError(err){
    toast.error(err.message)
}


    useEffect(()=>{
        console.log("??miiiiiiiiiiiiiiiii")
      
        if(!order._id || successPay || (order._id && order._id !== orderID)){

            const fetchOrder = async ()=>{
                try{
                    dispatch({type:'FETCH_REQUEST'})
                    const {data} = await axios.get(`/api/orders/${orderID}`,{
                        headers: {authorization: `Bearer ${userInfo.token}`}
                    })

                    console.log("alkdjalkdj",data)

                    dispatch({type: 'FETCH_SUCCESS',payload:data})
                    
                    
                }catch (err){
                    dispatch({type: 'FETCH_FAIL',})


                }
            }

                fetchOrder ()
                if(successPay){
                    dispatch({type: 'PAY_RESET'})
                }
            }else{
                const loadPaypalScript = async ()=>{
                    const {data: clientId} = await axios.get("/api/keys/paypal",{
                        headers: {authorization: `Bearer ${userInfo.token}`}
                    })
                    paypalDispatch({
                        type: 'resetOptions',
                        value:{
                            'client-id': clientId,
                            currency: 'USD' 
                        }
                    })
                    paypalDispatch({
                        type: 'setLoadingStatus',
                        value: 'pending'
                    })
                }

                loadPaypalScript()
            }

    },[order,orderID,navigate,userInfo,paypalDispatch,successPay])


    let handleToken = async (token)=>{

        try{
            dispatch({type:'FETCH_REQUEST'})
            const {data} = await axios.get(`/api/orders/${orderID}/payment`,{
                headers: {authorization: `Bearer ${userInfo.token}`}
            })
            console.log("alkdjalkdj",data)

            dispatch({type: 'FETCH_SUCCESS',payload:data})
            
            
        }catch (err){
            dispatch({type: 'FETCH_FAIL',})


        }

    }


    let handleVirtualCard = async ()=>{
        let {data} = await axios.post('/api/users/virtualcardpayment',{
            owner: userInfo._id,
            price: order.totalPrice
        })

        console.log(data)
    }

  return (
        loading
            ?
            <h1>loading.....</h1>
            :
            error 
            ?
            <Alert variant="danger">
                <p>{error}</p>
            </Alert>
            :
            <Container>
                <h1>Order {orderID}</h1>
                <Row>
                    <Col lg={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Shipping</Card.Title>
                                <Card.Text>
                                    <b>Name:</b> {order.shippingaddress && order.shippingaddress.fullname}<br/>
                                    <b>Address:</b> {order.shippingaddress && order.shippingaddress.address}<br/>
                                    <b>Address:</b> {order.shippingaddress && order.shippingaddress.address}, {order.shippingaddress && order.shippingaddress.city},{order.shippingaddress && order.shippingaddress.country}<br/>
                                </Card.Text>
                    
                            </Card.Body>
                           
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>Payment</Card.Title>
                                <Card.Text>
                                    <b>Method:</b> {order.paymentMethod}<br/>
                                </Card.Text>
                            </Card.Body>
                           
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>Items</Card.Title>
                                <Card.Text>
                                <ListGroup>
                                    {order.orderItems && order.orderItems.map(item=>(
                                        <ListGroup.Item>
                                            <Row>
                                                <Col lg={6}>
                                                    <img style={{width: "24px"}} src={item.img}/>
                                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                </Col>
                                                <Col lg={3}>
                                                    {item.quantity}
                                                </Col>
                                                <Col lg={3}>
                                                    {item.price}
                                                </Col>

                                            </Row>
                                        </ListGroup.Item>

                                    ))}
                                
                                    </ListGroup>
                                </Card.Text>
                            </Card.Body>
                           
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <h3>Order Summary</h3>
                        <Row>
                            <Col>Items</Col>
                            <Col>${order.totalPrice}</Col>
                        </Row>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${order.shippingPrice}0</Col>
                        </Row>
                        <Row>
                            <Col>Taxs</Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>
                        <Row>
                            {!order.isPaid
                             &&
                                isPending
                                    ?
                                        <h1>Loading.....</h1>
                                    :
                            <Col>
                            {order.paymentMethod == "Paypal" &&
                            
                                <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                            }
                            {order.paymentMethod == "Strip" &&
                            
                                <StripeCheckout
                                        token={handleToken}
                                        stripeKey="pk_test_51JGIdGFrmcA91sRK6HorosQIM1QbW4wtYMecZuzNrjwQhzBHCPzi688nWpoFAhhAxvanIwIGDBUTP8IvwDF5RJDQ00i0Vz5P6i"
                                        panelLabel='Payment'
                                        currency='USD'
                                        amount={order.totalPrice*100}
                                />
                            }
                            <Button onClick={handleVirtualCard}> Use Virtual Card </Button>
                            </Col>


                            }

                            {loadingPay && <h1>payment loading</h1>}
                        </Row>
                    </Col>
                </Row>
                
            </Container>
        
  )
}

export default Order