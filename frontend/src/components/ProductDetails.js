import React,{useState,useEffect,useReducer,useContext} from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import {Container,Row,Col,Card, Button,Spinner,ListGroup,Badge,Alert} from 'react-bootstrap'
import { Helmet } from 'react-helmet-async';
import Rating from './Rating';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import {Store} from '../Store'
import { useNavigate } from "react-router-dom";
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {...state,loading:true};
    case 'FETCH_SUCCESS':
      return {...state,loading:false,product:action.payload};
    case 'FETCH_FAILS':
      return {...state,loading:false,error:action.payload};
    default:
      return state
  }
}



const ProductDetails = () => {
  let navigate = useNavigate();
    let params = useParams();
    
    const [{loading,error,product},dispatch] = useReducer(reducer,{
      loading: false,
      error:'',
      product: {}
    })
    useEffect( async ()=>{
      dispatch({type:'FETCH_REQUEST'})
      try{
        let product = await axios.get(`/products/${params.slug}`)
      
        dispatch({type:'FETCH_SUCCESS',payload:product.data})
      }catch(err){
        dispatch({type:'FETCH_FAILS',payload:err.message})
      }
      
    },[params.slug])
    

    const {state, dispatch: ctxDispatch} = useContext(Store)
    const {cart} = state
    let handleAddToCart = async()=>{
      const exitingItem = cart.cartItems.find((item)=> item._id === product._id)
      const quantity = exitingItem ? exitingItem.quantity + 1 : 1

      const {data} = await axios.get(`/cartproduct/${product._id}`)
      
      if(data.instock < quantity){
        window.alert(`${product.name} out of stock`)
        return
      }
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: {...product,quantity}
      })
      navigate(`/cartpage`);

    }

  return (
    // <div>{params.slug}</div>
    <Container>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
     <Row>
      {product
      
      ?
      <>
      <Col lg={6}>
      {product.img &&
      <InnerImageZoom src={product.img} zoomSrc={product.img} />
      }
    </Col>
    <Col lg={3}>
    <Card style={{ width: '18rem' }}>
     <ListGroup variant="flush">
       <ListGroup.Item>
         <h1>{product.name}</h1>
       </ListGroup.Item>
       <ListGroup.Item>
       <Rating rating={product.rating} numberofrating={product.numberofrating}/>
       </ListGroup.Item>
      
       <ListGroup.Item>
         Stock{' '}
         {product.instock > 0 
         ?
          <Badge bg="success">{product.instock}</Badge>
         :
          <Badge bg="danger">{product.instock}</Badge>
         }
         <h4>${product.price}</h4>
       </ListGroup.Item>
       <ListGroup.Item>{product.description}</ListGroup.Item>
     </ListGroup>
   </Card>
    </Col>
    <Col lg={3}>
    <ListGroup variant="flush">
      
       <ListGroup.Item>
       <h3>Price</h3>
       </ListGroup.Item>
       <ListGroup.Item>
         <h5>${product.price}</h5>
       </ListGroup.Item>
       <ListGroup.Item>
       <Button onClick={handleAddToCart} variant="primary">Add To Cart</Button>
       </ListGroup.Item>
     </ListGroup>
    </Col>
      </>
      :
      <Alert className='text-center mt-5' variant="danger">
        Product Not Found Try Another Product
    </Alert>
      }
     </Row>
    </Container>
  );
};

export default ProductDetails;
