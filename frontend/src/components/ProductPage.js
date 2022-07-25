import React,{useState,useEffect,useReducer,useContext} from 'react';
import axios from 'axios'
import {Link } from "react-router-dom";
import {Container,Row,Col,Card, Button,Spinner,Modal,Badge,Form} from 'react-bootstrap'
import Rating from './Rating';
import { Helmet } from 'react-helmet-async';
import {Store} from '../Store'
import Pagination from './Pagination';

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
  const [lgShow, setLgShow] = useState(false);
  const [searchmatch, setSearchmatch] = useState([]);

  const [{loading,error,product},dispatch] = useReducer(reducer,{
    loading: false,
    error:'',
    product: []
  })

  const [details,setDetails] = useState({})

  useEffect( async ()=>{
    dispatch({type:'FETCH_REQUEST'})
    try{
      let products = await axios.get("/products")
      dispatch({type:'FETCH_SUCCESS',payload:products.data})
    }catch(err){
      dispatch({type:'FETCH_FAILS',payload:err.message})
    }
    
  },[])

  let handleDetails = async (pro)=>{
    setLgShow(true)
    let productDetails = await axios.get(`/products/${pro}`)
    setDetails(productDetails.data)
  }

  const {state, dispatch: ctxDispatch,state2,dispatch2,state3} = useContext(Store)
    const {cart,wishlist} = state
    let handleAddToCart = async(product)=>{
      
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
    // ==================================
    let handleAddToWishlist = async(product)=>{
      dispatch2({
        type: 'WISHLIST_ADD_ITEM',
        payload: {...product}
      })

    }
  // ==================================
    
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

    let matchArr = []
    let handelSearch = (e) => {
      product.map(item=>{
        if(item.name.toLowerCase().includes(e.target.value)){
          matchArr.push(item)
        }

      })
      setSearchmatch(matchArr)
    }

    let handleSearch = async (e) => {
      console.log(e.target.value)

      let {data} = await axios.get(`/products/productsearch/${e.target.value}`)
      console.log(data)
    }

  return (
      <>
         <Container>
         <Helmet>
           <title>Product Page</title>
         </Helmet>
        <input onChange={handleSearch}/>
        <Row>
        <Pagination itemsPerPage={3} product={product} state3={state3} handleDetails={handleDetails} handleAddToCart={handleAddToCart} handleAddToWishlist={handleAddToWishlist}/>
        </Row>
        <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Product Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {details?
          <Card>
            <Row>
              <Col lg={4}>
              <Card.Img variant="top" src={details.img} />

              </Col>

              <Col lg={8}>
              <Card.Body>
              <Card.Title>{details.name}</Card.Title>
              <Card.Text>
              {details.description}
              <br/>

              <h4>${details.price}</h4>
              </Card.Text>
              <Button variant="primary" onClick={()=>handleAddToCart(details)}>Add To Cart</Button>
            </Card.Body>
              </Col>
            </Row>
            
          </Card>
        :
        <h1>Details Not Available</h1>
        }
        </Modal.Body>
      </Modal>
   
      </Container>
      </>
  );
};

export default ProductPage;
