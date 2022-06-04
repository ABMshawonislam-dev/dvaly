import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Container,Row,Col,Nav,Form,Button,Table } from 'react-bootstrap'
import {Store} from '../Store'
import EditorConvertToHTML from './Editor'
const Dashboard = () => {
  const {state3} = useContext(Store)
  let [cat,setCat] = useState(false)
  let [pro,setPro] = useState(false)
  let [storename,setStorename] = useState('')
  let [text,setText] = useState('')
  let [name,setName] = useState('')
  let [slug,setSlug] = useState('')
  let [image,setImage] = useState('')
  let [description,setDescription] = useState('')
  let [price,setPrice] = useState('')
  let [category,setCategory] = useState('')
  let [cupon,setCupon] = useState('')
  let [discount,setDiscount] = useState('')
  let [discountlimit,setDiscountlimit] = useState('')
  let [stock,setStock] = useState('')
  let [catlist,setcatlist] = useState('')
  let [prolist,setProlist] = useState(false)
  let [myprolist,setMyprolist] = useState([])

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
    setProlist(false)
  }

  let handlePro = ()=>{
    setCat(false)
    setPro(true)
    setProlist(false)
  }

  let handleList = ()=>{
    setCat(false)
    setPro(false)
    setProlist(true)
  }

  let handleProductSubmit = async (e)=>{
    e.preventDefault()
    // console.log(localStorage.getItem('text'))
    // setText(localStorage.getItem('text'))
    let {data} = await axios.post('/products',{
      name:name,
      slug: slug,
      img: image,
      category: category,
      description: localStorage.getItem('text'),
      price: price,
      cupon: cupon,
      discoung: discount,
      discountlimit: discountlimit,
      storename: storename,
      instock: stock,
      owner: state3.userInfo._id
    })
  }

  let handleChange = (e)=>{
      console.log(name)
      console.log(slug)
      console.log(image)
      console.log(localStorage.getItem('text'))
      console.log(cupon)
      console.log(price)
      console.log(discount)
  }

  useEffect(()=>{

    async function Store(){
      let {data} = await axios.get(`/products/storename/${state3.userInfo._id}`)
      setStorename(data[0].name)
    }

    Store()
      
  },[])

  useEffect(()=>{

    async function productlist(){
      let {data} = await axios.get(`/products/productlist/${state3.userInfo._id}`)
      setMyprolist(data)
    }

    productlist()
      
  },[])




  return (

  <Row>
    <Col xs={2}>
    <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link onClick={handlePro}>Create Product</Nav.Link>
        <Nav.Link onClick={handleCat}>Create category</Nav.Link>
        <Nav.Link onClick={handleList}>Prodcut List</Nav.Link>
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
          <Form.Control onChange={(e)=>setName(e.target.value)}  type="text" placeholder="Product name" />
        </Form.Group>
       
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Slug</Form.Label>
          <Form.Control onChange={(e)=>setSlug(e.target.value)}  type="text" placeholder="Product Slug" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Image</Form.Label>
          <Form.Control onChange={(e)=>setImage(e.target.value)}  type="text" placeholder="Product Image" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Category</Form.Label>
          <Form.Control onChange={(e)=>setCategory(e.target.value)}  type="text" placeholder="Product Category" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <EditorConvertToHTML onChange={(e)=>setPrice(localStorage.getItem('text'))}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control onChange={(e)=>setPrice(e.target.value)}  type="number" placeholder="Product Price" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Stock</Form.Label>
          <Form.Control onChange={(e)=>setStock(e.target.value)}  type="number" placeholder="Product Stock" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Cupon</Form.Label>
          <Form.Control onChange={(e)=>setCupon(e.target.value)}  type="number" placeholder="Product Cupon" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Discount</Form.Label>
          <Form.Control onChange={(e)=>setDiscount(e.target.value)}  type="number" placeholder="Product Discount" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Discountlimit</Form.Label>
          <Form.Control onChange={(e)=>setDiscountlimit(e.target.value)}  type="number" placeholder="Product Discountlimit" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label >Store Name</Form.Label>
          <Form.Control placeholder="Disabled input" disabled  value={storename}/>
        </Form.Group>
        
      
        
        <Button variant="primary" type="submit" onClick={handleProductSubmit}>
          Submit Product
        </Button>
       
      </Form>
      }

      {prolist&&
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          {myprolist.map((item,index)=>(
            <tr>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{!item.discount ? "No Discount" : "item.discount"}</td>
          </tr>
          ))}
          
          
        </tbody>
      </Table>
      }
    </Col>
  </Row>
  

  )
}

export default Dashboard