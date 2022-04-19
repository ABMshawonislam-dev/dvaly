import React,{useState,useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import {Modal,Button,ListGroup,Container,Row,Col,Card} from 'react-bootstrap'
import axios from 'axios';

const HomePage = () => {

  const [show, setShow] = useState(false);
  const [discountimg, setDiscountimg] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryproduct, setCategoryproduct] = useState([]);
  const [pakna, setPakna] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let catarr = []
  useEffect(async()=>{
    // const {data} = await axios.get(`/discount`)
    // setDiscountimg(data.img)

    // setShow(true)

    let product = await axios.get("/products")
    product.data.map((item)=>{
      if(catarr.indexOf(item.category) == -1){
        catarr.push(item.category)

      }
    })
    setCategory(catarr)
   
  },[])






  let handleCategory = async (category)=>{
    let categoryproduct = await axios.get(`/category/${category}`)
    setCategoryproduct(categoryproduct.data)
    
  }

  return (
    <>

    <Helmet>
      <title>Dvaly</title>
    </Helmet>

<div className='banner'>
    <img className='banner-img' style={{height:"500px",width:"100%"}} src="/images/banner.jpg" alt="" />
    <Container>
      <div className="cat-container">
          <div className="cat">
              <ListGroup>
                {category.map((item,index)=>(
                  <ListGroup.Item onClick={()=>handleCategory(item)}>{item}{pakna[index]}</ListGroup.Item>
                ))}
              
                  
                  
              </ListGroup>
            </div>
        </div>
    </Container>
</div>

<div className="catproductshow">
<Container>
  <Row>
 
    {categoryproduct?
     categoryproduct.map((item)=>(
       
      <Col lg={4}>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={item.img} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
            {item.description}
          </Card.Text>
        </Card.Body>
      </Card>
      </Col>
  ))
  :
  "Nothing"
  } 
    
  </Row>
</Container>
  </div>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={discountimg}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>

    
  
  );
};

export default HomePage;
