import React, { useState } from 'react'
import {Container,Row,Col,ListGroup,Table,Button,Tabs,Tab,Form} from 'react-bootstrap'
import AdminNavbar from './AdminNavbar'
const RoleManagement = () => {
    let [productUpload,setProductUpload] = useState(false)
    let [categoryupload,setCategoryUpload] = useState(false)
    let [brandupload,setBrandUpload] = useState(false)
    let [blog,setBlog] = useState(false)
    let [productapprove,setProductapprove] = useState(false)

    let [role,setRole] = useState([])

    let rolelist = []


    let handleProductUpload = () => {
        
        setProductUpload(!productUpload)
        console.log(productUpload)
        console.log(rolelist.includes('productupload'))
        rolelist.push('productupload')
        console.log(rolelist)
        // if(!rolelist.includes('productupload')){
        //     rolelist.push('productupload')
        //     console.log(rolelist)
        //     console.log("pai nai")
        // }else{
        //     rolelist.splice(rolelist.indexOf('productupload'),1)
        //     console.log(rolelist)
        //     console.log("paici")
        // }
       
       
    }

    let handleCategoryUpload = () => {
        setCategoryUpload(!categoryupload)
        // if(!rolelist.includes('categoryupload')){
        //     rolelist.push('categoryupload')
        //     console.log(rolelist)
        //     console.log("pai nai")
        // }else{
        //     rolelist.splice(rolelist.indexOf('categoryupload'),1)
        //     console.log(rolelist)
        //     console.log("paici")
        // }
    }

    let handleBrandUpload = () => {
        setBrandUpload(!brandupload)
    }

    let handleBlog = () => {
        setBlog(!blog)
    }

    let handleProductApprove = () => {
        setProductapprove(!productapprove)
    }
  return (
    <Container>
        <Row>
            <Col lg={3}>
                <AdminNavbar active="rolemanage"/>
            </Col>
            <Col lg={9}>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
                >
                <Tab eventKey="rolelist" title="Role List">
                   A B M Shawon Islam
                </Tab>
                <Tab eventKey="assignrole" title="Assign Role">
                   Dadu
                </Tab>
                <Tab eventKey="createrole" title="Create Role">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Create Role</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Check 
                            type="checkbox"
                            id={`default-checkbox`}
                            label={`Product Upload`}
                            onChange={handleProductUpload}
                        />
                        <Form.Check 
                            type="checkbox"
                            id={`default-checkbox`}
                            label={`Category Upload`}
                            onChange={handleCategoryUpload}
                        />
                        <Form.Check 
                           type="checkbox"
                           id={`default-checkbox`}
                           label={`Brand Upload`}
                           onChange={handleBrandUpload}
                        />
                        <Form.Check 
                            type="checkbox"
                            id={`default-checkbox`}
                            label={`Blog`}
                            onChange={handleBlog}
                        />
                        <Form.Check 
                            type="checkbox"
                            id={`default-checkbox`}
                            label={`Product Approve`}
                            onChange={handleProductApprove}
                        />

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Tab>
                </Tabs> 
            </Col>
        </Row>
    </Container>
  )
}

export default RoleManagement