import {useContext} from 'react'
import {Store} from '../Store'
import { Helmet } from 'react-helmet-async'
import {Container,Row,Col,Alert,ListGroup,Button} from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'

const WishList = () => {
    let navigate = useNavigate();
    const {state2,dispatch2} = useContext(Store)

    const {wishlist:{wishlistItems}} = state2

    let upadateCart = (item,quantity)=>{
        dispatch2({
            type:'WISHLIST_ADD_ITEM',
            payload: {...item}
        })
    }

    let handleRemoveItem = (item)=>{
        dispatch2({
            type:'WISHLIST_ADD_ITEM',
            payload: item
        })
    }

  return (
    <Container>
        <Helmet>
        <title>Wishlist</title>
        </Helmet>
        <h1>Shopping Cart</h1>
        <Row className='mt-5'>
            <Col lg={8}>
                {wishlistItems.length  < 0
                    ?
                        <Alert variant="danger">
                            Wishlis Is Empty
                        </Alert>
                    :
                    <ListGroup>
                
                        {wishlistItems.map((item)=>(
                            <ListGroup.Item>
                            <Row>
                                <Col lg={4}>
                                    <img width="50" src={item.img} />
                                    <Link to={`/products/${item.slug}`}>{item.name}</Link>
                                </Col>
                                
                                <Col lg={3}>
                                    <h4>Price: ${item.price}</h4>
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
        </Row>
    </Container>
  )
}

export default WishList