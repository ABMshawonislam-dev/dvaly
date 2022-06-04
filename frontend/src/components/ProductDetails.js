import React,{useState,useEffect,useReducer,useContext} from 'react';
import axios from 'axios'
import { useParams,Link } from "react-router-dom";
import {Container,Row,Col,Card, Button,Spinner,ListGroup,Badge,Alert,Form} from 'react-bootstrap'
import { Helmet } from 'react-helmet-async';
import Rating from './Rating';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import {Store} from '../Store'
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";







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
  
// slider settings
  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <FaArrowLeft/>,
    nextArrow: <FaArrowRight/>,
  };


  let navigate = useNavigate();
    let params = useParams();

    let [relatedproduct,setRelatedproduct] = useState([])
    let [cupontext,setCupontext] = useState("")
    let [errcupon,setErrcupon] = useState("")
    let [afterdiscountprice,setAfterdiscountprice] = useState("")
    
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
        let relatedProduct = await axios.get("/products")
        let filterItem = relatedProduct.data.filter((item)=> item.category == product.data.category && item.name !== product.data.name)
        setRelatedproduct(filterItem)
        // relatedProduct.data.map(item=>{
        //   if(item.category == product.data.category && item.name !== product.data.name){
        //     console.log("vai",item)
        //   } 
        // })
      }catch(err){
        dispatch({type:'FETCH_FAILS',payload:err.message})
      }
      
    },[params.slug])

    // useEffect( async ()=>{
    //   dispatch({type:'FETCH_REQUEST'})
    //   try{
    //     let relatedProduct = await axios.get("/products")
    //     // console.log(product.data)
    //     // let filterItem = relatedProduct.data.filter((item)=> item.category == product.category && item.name !== product.name)
    //     relatedProduct.data.map(item=>{
    //       // console.log(item.category == product.category && item.name !== product.name)
    //       console.log(product.name)
    //       if(item.category == product.category && item.name !== product.name){
    //         console.log("vai",item)
    //       } 
    //     })
    //     // console.log(filterItem)
    //     // setRelatedproduct(filterItem)
    //   }catch(err){
    //     console.log(err)
    //   }
    // },[])
    

    // Cart Store action
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
        payload: {...product,price:afterdiscountprice?afterdiscountprice:product.price,quantity}
      })
      navigate(`/cartpage`);

    }


    let handleCuponText = (e)=>{
      setCupontext(e.target.value)
    }

    let handleCupon = ()=>{

      if(product.cupon !== ""){
        if(product.cupon == cupontext){
          let discountprice = (product.price * product.discount)/100
          let afterdiscountprice = product.price - discountprice
          if(afterdiscountprice < product.discountlimit){
            setErrcupon("For This price Discount not applicable")
          }else{
            setAfterdiscountprice(afterdiscountprice)

          }
        }else{
          setErrcupon("Wrong Cupon Code")
        }
      }else{
        setErrcupon("No Cupon For This Product")
      }


     
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
         <h1>{product.name} </h1>
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
       <ListGroup.Item dangerouslySetInnerHTML={{__html: product.description}}></ListGroup.Item>
     </ListGroup>
   </Card>
    </Col>
    <Col lg={3}>
    <ListGroup variant="flush">
      
       <ListGroup.Item>
       <h3>Price </h3>
       </ListGroup.Item>
       <ListGroup.Item>
         <h5> {afterdiscountprice?<del>${product.price}</del>:product.price}   </h5>
         {afterdiscountprice ? <h5> After Discount: ${afterdiscountprice}  </h5> : ""}
         
       </ListGroup.Item>
       <ListGroup.Item>
       <Form.Control onChange={handleCuponText} type="text" placeholder="Give Your Cupon" />  
       <Form.Text className="text-muted">
      {errcupon}
    </Form.Text><br/>     
       <Button onClick={handleCupon} variant="info">Apply</Button><br/>
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

     <Row>
       <h2 className='mt-5'>Related Product</h2>
       {relatedproduct.length > 0
        ?
        <Slider {...settings}>
        {
        relatedproduct.map(item=>(
          <Card className='p-2' style={{ width: '18rem' }}>
            <Card.Img style={{ height: '300px' }}  variant="top" src={item.img} />
            <Card.Body>
            <Link to={`/products/${item.slug}`}><Card.Title>{item.name}</Card.Title></Link>
              
              <Card.Text>
                {item.description}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>

      ))  
        }
      </Slider>
        :
        <Alert variant="danger">
        No Related Product found
        </Alert>
       }
       
     </Row>
    </Container>
  );
};

export default ProductDetails;
