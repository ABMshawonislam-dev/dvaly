import {useContext} from 'react'
import {Store} from '../Store'
import { Helmet } from 'react-helmet-async'
import {Container,Row,Col,Alert,ListGroup,Button} from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'

const CartPage = () => {
    let navigate = useNavigate();
    const {state,dispatch} = useContext(Store)

    const {cart:{cartItems}} = state

    let upadateCart = (item,quantity)=>{
        dispatch({
            type:'CART_ADD_ITEM',
            payload: {...item,quantity}
        })
    }

    let handleRemoveItem = (item)=>{
        dispatch({
            type:'CART_REMOVE_ITEM',
            payload: item
        })
    }

    let handleCheckOut = () => {
        navigate('/signin?redirect=/shipping')
    }
  return (
    <Container>
        <Helmet>
        <title>Shopping Cart</title>
        </Helmet>
        <h1>Shopping Cart</h1>
        <Row className='mt-5'>
            <Col lg={8}>
                {cartItems.length  < 0
                    ?
                        <Alert variant="danger">
                            Cart Is Empty
                        </Alert>
                    :
                    <ListGroup>
                
                        {cartItems.map((item)=>(
                            <ListGroup.Item>
                            <Row>
                                <Col lg={4}>
                                    <img width="50" src={item.img} />
                                    <Link to={`/products/${item.slug}`}>{item.name}</Link>
                                </Col>
                                <Col lg={3}>
                                    <Button onClick={()=>upadateCart(item,item.quantity+1)}  disabled={item.quantity == item.instock} variant="success">+</Button>
                                    <span>{item.quantity}</span>
                                    <Button onClick={()=>upadateCart(item,item.quantity-1)} disabled={item.quantity === 1} variant="success">-</Button>
                                </Col>
                                <Col lg={3}>
                                <Button onClick={()=>handleRemoveItem(item)} variant="danger">Delete</Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        ))}
                       
                    </ListGroup>
                }
            </Col>
            <Col lg={4}>
               <h1> Total ({cartItems.reduce((accumulator,current)=> accumulator + current.quantity, 0)}) Products</h1>
               <h3>price: ${cartItems.reduce((accumulator,current)=> accumulator + current.price * current.quantity, 0)}</h3>
               <Button onClick={handleCheckOut} className='w-100' variant="primary">Payment</Button>
            </Col>
        </Row>
    </Container>
  )
}

export default CartPage