import React,{useEffect,useReducer,useState} from 'react'
import {Container,Row,Col,Dropdown,Card,Button} from 'react-bootstrap'
import axios from 'axios';
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
const Compare = () => {
    let [signlepro,setSignlepro] = useState("")
    let [signlepro2,setSignlepro2] = useState("")
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

      let handleCompare = async (params)=>{
        let product = await axios.get(`/products/${params}`)
        setSignlepro(product.data)
      }

      let handleCompare2 = async (params)=>{
        let product = await axios.get(`/products/${params}`)
        setSignlepro2(product.data)
      }
  return (
    <>
        <Container className='mt-5'>
            <Row>
                <Col lg={6}>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Choose Product
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {product.map(item=>(
                            <>
                             <Dropdown.Item onClick={()=>handleCompare(item.slug)}>
                            <img className='cimg' src={item.img}/>
                                {item.name}
                            </Dropdown.Item>
                          </>

                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Card className="mt-5">
                    {signlepro ?
                    <>
                        <Card.Img variant="top" src={signlepro.img} />
                    <Card.Body>
                        <Card.Title>{signlepro.name}</Card.Title>
                        <Card.Text>
                        {signlepro.description}
                        {signlepro.price}
                        </Card.Text>
                        <Button variant="primary">Add To Cart</Button>
                    </Card.Body>
                    </>
                    :
                    <h1>Choose A Product</h1>
                    }
                </Card>
                </Col>
                <Col lg={6}>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                         
                         Choose Product
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {product.map(item=>(
                           <>
                             
                            <Dropdown.Item onClick={()=>handleCompare2(item.slug)}>
                            <img className='cimg' src={item.img}/>
                                {item.name}
                            </Dropdown.Item>
                           </>

                        ))}
                        
                    </Dropdown.Menu>
                </Dropdown>

                <Card className="mt-5">
                {signlepro2 ?
                    <>
                        <Card.Img variant="top" src={signlepro2.img} />
                    <Card.Body>
                        <Card.Title>{signlepro2.name}</Card.Title>
                        <Card.Text>
                        {signlepro2.description}
                        {signlepro2.price}
                        </Card.Text>
                        <Button variant="primary">Add To Cart</Button>
                    </Card.Body>
                    </>
                    :
                    <h1>Choose A Product</h1>
                    }
                </Card>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Compare