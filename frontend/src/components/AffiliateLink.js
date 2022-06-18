import React, { useContext, useEffect, useState } from 'react'
import {Container,Table} from 'react-bootstrap'
import axios from 'axios'
import {Store} from '../Store'

const AffiliateLink = () => {

    const {state3} = useContext(Store)

    let [product,setProduct] = useState([])
    let [total,setTotal] = useState('')
    useEffect(()=>{
        async function pro(){
            let product = await axios.get(`/products/affiliate/info/${state3.userInfo._id}`)
            setProduct(product.data)
            let totalamount = 0
            product.data.map(item=>{
                totalamount += item.amount
            })

            setTotal(totalamount)

        }
        pro()
    },[])
  return (
    <Container>
         <Table striped bordered hover>
            <thead>
                <tr>
                <th>Serial</th>
                <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {product.map((item,index)=>(
                    <tr>
                    <td>{index+1}</td>
                    <td>{item.amount}</td>
                    </tr>
                ))}
                <tr>
                    <td>Total</td>
                    <td>{total}</td>
                </tr>
               
            </tbody>
        </Table>
    </Container>
  )
}

export default AffiliateLink