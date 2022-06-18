import React from 'react'
import {Container,Row,Col,ListGroup} from 'react-bootstrap'
import AdminNavbar from './AdminNavbar'
const AdminDashboard = () => {
  return (
    <Container>
        <Row>
            <Col lg={3}>
                <AdminNavbar active=""/>
            </Col>
            <Col lg={9}>
                <h1> Welcome To Admin Dasboard. You Have The Super Power To Contorl Everything</h1>
            </Col>
        </Row>
    </Container>
  )
}

export default AdminDashboard