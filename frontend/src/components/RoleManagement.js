import React, { useEffect, useState } from 'react'
import {Container,Row,Col,ListGroup,Table,Button,Tabs,Tab,Form} from 'react-bootstrap'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'
const RoleManagement = () => {
    let [name,setName] = useState('')
    let [productUpload,setProductUpload] = useState(false)
    let [categoryupload,setCategoryUpload] = useState(false)
    let [brandupload,setBrandUpload] = useState(false)
    let [blog,setBlog] = useState(false)
    let [productapprove,setProductapprove] = useState(false)
    let [roles,setRoles] = useState([])
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')
    let [role,setRole] = useState('')

    let rolelist = []


    let handleProductUpload = () => {

        if(rolelist.indexOf("productupload") !== -1){
            rolelist.splice(rolelist.indexOf("productupload"), 1)
            console.log(rolelist)
        }else{
            rolelist.push("productupload")
            console.log(rolelist)
        }
       
       
    }

    let handleCategoryUpload = () => {
        if(rolelist.indexOf("categoryupload") !== -1){
            rolelist.splice(rolelist.indexOf("categoryupload"), 1)
            console.log(rolelist)
        }else{
            rolelist.push("categoryupload")
            console.log(rolelist)
        }
       
    }

    let handleBrandUpload = () => {
         if(rolelist.indexOf("brandupload") !== -1){
            rolelist.splice(rolelist.indexOf("brandupload"), 1)
            console.log(rolelist)
        }else{
            rolelist.push("brandupload")
            console.log(rolelist)
        }
    }

    let handleBlog = () => {
        if(rolelist.indexOf("blogupload") !== -1){
            rolelist.splice(rolelist.indexOf("blogupload"), 1)
            console.log(rolelist)
        }else{
            rolelist.push("blogupload")
            console.log(rolelist)
        }
    }

    let handleProductApprove = () => {
        if(rolelist.indexOf("productapprove") !== -1){
            rolelist.splice(rolelist.indexOf("productapprove"), 1)
            console.log(rolelist)
        }else{
            rolelist.push("productapprove")
            console.log(rolelist)
        }
    }

    let handleUserRole = async (e)=>{
        e.preventDefault()
        let {data} = await axios.post('/api/users/userrole',{
            name: name,
            permissions: rolelist
        })
    }

    let handleAssignRole = async (e) => {
        e.preventDefault()
        let {data} = await axios.post('/api/users/role',{
            email: email,
            password: password,
            role: role
        })
    }

    useEffect(()=>{
        async function role(){
            let {data} = await axios.get('/api/users/userrole')
            setRoles(data)
        }
        role()
    },[])

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
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter Password" />
                    </Form.Group>
                     <Form.Select onChange={(e)=>setRole(e.target.value)} aria-label="Select Role">
                        <option>Select Role</option>
                        {roles.map(item=>(
                            <option value={item._id}>{item.name}</option>
                        ))}
                        
                    </Form.Select>
                    <Button onClick={handleAssignRole} variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
                </Tab>
                <Tab eventKey="createrole" title="Create Role">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Create Role</Form.Label>
                            <Form.Control onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter email" />
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

                        <Button onClick={handleUserRole} variant="primary" type="submit">
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