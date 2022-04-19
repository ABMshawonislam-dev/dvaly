import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import {Table,Container} from 'react-bootstrap'
import { Store } from '../Store'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const reducer = (state,action)=>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state, loading: true}
        case 'FETCH_SUCCESS':
            return {...state, loading: false, orders: action.payload}
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state

    }
}

const MyOrder = () => {
    const {state} = useContext(Store)

    const {userInfo}  = state

    const navigate = useNavigate()


    const [{loading,error,orders},dispatch] = useReducer(reducer,{
        loading: false,
        error: ''
    })

    useEffect(()=>{
        const fetchData = async ()=>{
            dispatch({type:"FETCH_REQUEST"})
            try{
                const {data} = axios.get("/api/orders/mine",{
                    headers: {authorization: `Bearer ${userInfo.token}`}
                })

                console.log(data)

                dispatch({type:"FETCH_SUCCESS",payload: data})
            }catch(err){
                dispatch({type:"FETCH_ERROR",payload: err.message})
            }
        }

        fetchData()
    },[])

  return (
    <Container>
        <Helmet>
            <title>Order History</title>
        </Helmet>

        <h1>Order History</h1>

        {loading?
            <h2>Loading....</h2>
            :error?
            <h2>{error}</h2>
            :
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@fat</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        }
    </Container>
  )
}

export default MyOrder