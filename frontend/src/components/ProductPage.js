import React,{useState,useEffect,useReducer} from 'react';
// import data from '../data'
import axios from 'axios'
import {Link } from "react-router-dom";
import {Container,Row,Col,Card, Button,Spinner} from 'react-bootstrap'


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
      dispatch({type:'FETCH_SUCCESS',payload:err.message})
    }
    
  },[])

  return (
      <>
         <Container>
         
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
                 {item.description}
                </Card.Text>
                <Card.Text>
                 {item.price}$
                </Card.Text>
              </Card.Body>
              <Card.Body>
                <Button  variant="primary" href="#">Add to cart</Button>
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
