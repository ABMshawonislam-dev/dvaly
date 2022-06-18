import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Container,Row,Col,ListGroup,Table,Button} from 'react-bootstrap'
import AdminNavbar from './AdminNavbar'
const AdminUserList = () => {

    let [userlist,setUserList] = useState([])

    useEffect(()=>{
        async function userlist(){
            let {data} = await axios.get('/api/users/userlist')
            console.log(data)
            setUserList(data)
        }
        userlist()
    },[])
  return (
    <Container>
        <Row>
            <Col lg={3}>
                <AdminNavbar active="userlist"/>
            </Col>
            <Col lg={9}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Serial</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userlist.map((item,index)=>(
                            <tr>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.isVendor?'vendor':item.isAffiliate?'Affiliate':''} </td>
                                <td> <Button variant="danger">Delete</Button> </td>
                            </tr>
                    ))}
                    
                    
                </tbody>
                </Table>    
            </Col>
        </Row>
    </Container>
  )
}

export default AdminUserList