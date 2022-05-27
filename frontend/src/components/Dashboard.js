import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Container,Row,Col,Nav,Form,Button } from 'react-bootstrap'
import {Store} from '../Store'
const Dashboard = () => {
  const {state3} = useContext(Store)
  let [cat,setCat] = useState(false)
  let [pro,setPro] = useState(false)
  let [name,setName] = useState('')
  let [storename,setStorename] = useState('')

  let handleSubmit = async (e)=>{
    e.preventDefault()
    let {data} = await axios.post('/products/storename',{
        id: state3.userInfo._id,
        name: name
    })

  }

  let handleCat = ()=>{
    setCat(true)
    setPro(false)
  }

  let handlePro = ()=>{
    setCat(false)
    setPro(true)
  }

  let handleProductSubmit = async ()=>{
      let {data} = await axios.post('/products',{

      })
  }

  let handleChange = (e)=>{
      console.log(e.target)
  }

  useEffect(()=>{

    async function Store(){
      let {data} = await axios.get(`/products/storename/${state3.userInfo._id}`)
      setStorename(data[0].name)
    }

    Store()
      
  },[])

  return (

  <Row>
    <Col xs={2}>
    <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link onClick={handlePro}>Create Product</Nav.Link>
        <Nav.Link onClick={handleCat}>Create category</Nav.Link>
        <Nav.Link>Create Subcategory</Nav.Link>
        <Nav.Link>Payment</Nav.Link>
      </Nav>
    </Col>
    <Col xs={8}>
      {cat&&
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Store Name</Form.Label>
          <Form.Control  onChange={(e)=> setName(e.target.value)} type="text" placeholder="Product Category" />
        </Form.Group>
        
      
        
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
       
      </Form>
      }
      {pro&&
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={handleChange}  type="text" placeholder="Product name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Slug</Form.Label>
          <Form.Control  type="text" placeholder="Product Slug" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Image</Form.Label>
          <Form.Control  type="text" placeholder="Product Image" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Category</Form.Label>
          <Form.Control  type="text" placeholder="Product Category" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control  type="text" placeholder="Product Description" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control  type="number" placeholder="Product Price" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Stock</Form.Label>
          <Form.Control  type="number" placeholder="Product Stock" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Cupon</Form.Label>
          <Form.Control  type="number" placeholder="Product Cupon" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Discount</Form.Label>
          <Form.Control  type="number" placeholder="Product Discount" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Discountlimit</Form.Label>
          <Form.Control  type="number" placeholder="Product Discountlimit" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Store Name</Form.Label>
          <Form.Control placeholder="Disabled input" disabled  value={storename}/>
        </Form.Group>
        
      
        
        <Button variant="primary" type="submit" onClick={handleProductSubmit}>
          Submit Product
        </Button>
       
      </Form>
      }
    </Col>
  </Row>
  

  )
}

export default Dashboard