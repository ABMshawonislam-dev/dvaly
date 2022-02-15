import React,{useState,useEffect,useReducer,useContext} from 'react';
import axios from 'axios'
import {Link } from "react-router-dom";
import {Container,Row,Col,Card, Button,Spinner} from 'react-bootstrap'
import Rating from './Rating';
import { Helmet } from 'react-helmet-async';
import {Store} from '../Store'

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


const ProductPage = () => {
  const [{loading,error,product},dispatch] = useReducer(reducer,{
    loading: false,
    error:'',
    product: []
  })

  useEffect( async ()=>{
    dispatch({type:'FETCH_REQUEST'})
    try{
      let product = await axios.get("/products")
      dispatch({type:'FETCH_SUCCESS',payload:product.data})
    }catch(err){
      dispatch({type:'FETCH_FAILS',payload:err.message})
    }
    
  },[])

  const {state, dispatch: ctxDispatch} = useContext(Store)
    const {cart} = state
    let handleAddToCart = async(product)=>{
      console.log(product._id)
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

    }

    
    const {cart:{cartItems}} = state
    let upadateCart = (item,quantity)=>{
      console.log("asi")
      ctxDispatch({
            type:'CART_ADD_ITEM',
            payload: {...item,quantity}
        })
    }

    let handleRemoveItem = (item)=>{
      ctxDispatch({
            type:'CART_REMOVE_ITEM',
            payload: item
        })
    }

  return (
      <>
         <Container>
         <Helmet>
           <title>Product Page</title>
         </Helmet>
        <Row>
          {loading?
            <div className='loading'>
              <Spinner animation="border" />
            </div>
          :
          product.map(item=>(
            <Col lg={3}>
            <Card>
              <Card.Img variant="top" src={item.img} />
              <Card.Body>
                <Card.Title>
                    <Link to={`/products/${item.slug}`}>{item.name}</Link>
                </Card.Title>
                <Card.Text>
                
                <Rating rating={item.rating} numberofrating={item.numberofrating}/>
                 {item.description}
                </Card.Text>
                <Card.Text>
                 {item.price}$
                </Card.Text>
              </Card.Body>
              <Card.Body>
                {cartItems.map(items=>(
                    item._id == items._id 
                      ?
                      <>
                      <Button onClick={()=>upadateCart(item,items.quantity+1)}  disabled={items.quantity == item.instock} variant="success">+</Button>
                      <span>{items.quantity}</span>
                      <Button onClick={()=>upadateCart(item,items.quantity-1)} disabled={items.quantity === 1} variant="success">-</Button>
                      <Button className='ms-2' onClick={()=>handleRemoveItem(item)} variant="danger">Remove form Cart</Button>
                      </>
                      :
                      ""
                    

                ))}
              <br/>
              {item.instock == 0 
                ?
                <Button variant="danger">Out Of Stock</Button>
                :
                <Button className='mt-3' onClick={()=>handleAddToCart(item)}  variant="primary">Add to cart</Button>
              }
              </Card.Body>
            </Card>
            </Col>
          ))}
        </Row>
      </Container>
      </>
  );
};

export default ProductPage;
