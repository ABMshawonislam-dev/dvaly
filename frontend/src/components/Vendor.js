import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Container,Form,Button } from 'react-bootstrap'
import {Store} from '../Store'

const Vendor = () => {
    let [agree,setAgree] = useState(false)

    let {state3,dispatch3} = useContext(Store)
    console.log(state3.userInfo._id)

    let handelAgree = ()=>{
        setAgree(!agree)

        
    }

    let handleVendor = async ()=>{
        let {data} = await axios.put(`/api/users/${state3.userInfo._id}`)
        dispatch3({type: 'USER_SIGNIN',payload:data })
        localStorage.setItem('userInfo',JSON.stringify(data))
    } 


  return (
    <Container>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <Form.Check
        onChange={handelAgree} 
        type={"checkbox"}
        label={'Accept The Agreement'}
      />

      {agree
      ?
      <Button variant="primary" onClick={handleVendor}>Primary</Button>
      :
      <Button variant="primary" disabled>Primary</Button>
      }
    </Container>
  )
}

export default Vendor