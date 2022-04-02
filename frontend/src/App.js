import {useEffect, useState} from 'react'

import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
import {Navbar,Container,Nav,Badge,NavDropdown,ListGroup,Button,Offcanvas} from 'react-bootstrap'

import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import CartPage from "./components/CartPage";
import Login from './components/Login';
import Signup from './components/Signup';
import { useContext } from "react";
import {Store} from './Store'
import WishList from './components/WishList';
import Compare from './components/Compare';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Shipping from './components/Shipping';
import Payment from './components/Payment';
function App() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const {state,dispatch,state2,dispatch2,state3,dispatch3} = useContext(Store)

  const {cart:{cartItems}} = state
  const {wishlist:{wishlistItems}} = state2
  

  const {userInfo} = state3

  console.log(userInfo)
 

  let upadateCart = (item,quantity)=>{
      dispatch({
          type:'CART_ADD_ITEM',
          payload: {...item,quantity}
      })
  }

  let handleRemoveItem = (item)=>{
      dispatch({
          type:'CART_REMOVE_ITEM',
          payload: item
      })
  }

  let handleRemoveWItem = (item)=>{
      dispatch2({
          type:'WISHLIST_REMOVE_ITEM',
          payload: item
      })
  }

  let handleLogout = () => {
    dispatch3({type: "USER_LOGOUT"})
    localStorage.removeItem("userInfo")
  }

  return (
    <>

    


      <BrowserRouter>
      
      <Navbar bg="dark" variant="dark">
        <Container>
        <ToastContainer position='bottom-center' limit={1} />
        <Navbar.Brand href="#home">Dvaly</Navbar.Brand>
        <Nav className="ms-auto menu">
          <Link className="item" to="/">Home</Link>
          <Link className="item" to="/products">Products</Link>
          <Link className="item" to="/compare">Compare Products</Link>
           
      {userInfo ?
           <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>Logout</NavDropdown.Item>
           
          </NavDropdown>
      : 
       <Link className="item" to="/signin">Signin</Link>
      }
          

          <NavDropdown title="Cart" id="basic-nav-dropdown">
        
              {cartItems.map((item)=>(
                <>
                   <img className="me-2 mt-2" width="50" src={item.img} />
                   <Link className="me-2 mt-2" to={`/products/${item.slug}`}>{item.name}</Link>
                   <Button className="me-2 mt-2" onClick={()=>upadateCart(item,item.quantity+1)}  disabled={item.quantity == item.instock} variant="success">+</Button>
                                    <span className="me-2 mt-2">{item.quantity}</span>
                                    <Button className="me-2 mt-2" onClick={()=>upadateCart(item,item.quantity-1)} disabled={item.quantity === 1} variant="success">-</Button>
                                    <Button className="me-2 mt-2" onClick={()=>handleRemoveItem(item)} variant="danger">Delete</Button>
                                    <NavDropdown.Divider />
                                    <br/>
                </>
            ))}

              
   
              <div className="text-center">
                <Button className="w-100" variant="info">
                  <Link to="/cartpage">Go to Cart</Link>
                </Button>
              </div>
        </NavDropdown>


        
        {state.cart.cartItems.length > 0 && (
            <Badge pill bg="danger">
              {state.cart.cartItems.length}
            </Badge>
          )}


          {/* ======================================== */}
          <NavDropdown title="Wishlist" id="basic-nav-dropdown">
        
        {wishlistItems.map((item)=>(
          <>
             <img className="me-2 mt-2" width="50" src={item.img} />
             <Link className="me-2 mt-2" to={`/products/${item.slug}`}>{item.name}</Link>
             
                              <Button className="me-2 mt-2" onClick={()=>handleRemoveWItem(item)} variant="danger">Delete</Button>
                              <NavDropdown.Divider />
                              <br/>
          </>
      ))}

        

        <div className="text-center">
          <Button className="w-100" variant="info">
            <Link to="/wishlist">Go to Wishlist</Link>
          </Button>
        </div>
  </NavDropdown>

  
  {state2.wishlist.wishlistItems.length > 0 && (
      <Badge pill bg="danger">
        {state2.wishlist.wishlistItems.length}
      </Badge>
    )}

    
        </Nav>
        </Container>
      </Navbar>

    <Button variant="primary" onClick={handleShow} className="me-2 sidecart" >
        cart
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {cartItems.map((item)=>(
                <>
                   <img className="me-2 mt-2" width="50" src={item.img} />
                   <Link className="me-2 mt-2" to={`/products/${item.slug}`}>{item.name}</Link>
                   <Button className="me-2 mt-2" onClick={()=>upadateCart(item,item.quantity+1)}  disabled={item.quantity == item.instock} variant="success">+</Button>
                                    <span className="me-2 mt-2">{item.quantity}</span>
                                    <Button className="me-2 mt-2" onClick={()=>upadateCart(item,item.quantity-1)} disabled={item.quantity === 1} variant="success">-</Button>
                                    <Button className="me-2 mt-2" onClick={()=>handleRemoveItem(item)} variant="danger">Delete</Button>
                                    <hr/>
                                    <br/>
                </>
            ))}
            <div className="text-center">
                <Button className="w-100" variant="info">
                  <Link to="/cartpage">Go to Cart</Link>
                </Button>
              </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/products" element={<ProductPage/>}></Route>
        <Route path="/products/:slug" element={<ProductDetails/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/cartpage" element={<CartPage/>}></Route>
        <Route path="/signin" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/wishlist" element={<WishList/>}></Route>
        <Route path="/compare" element={<Compare/>}></Route>
        <Route path="/payment" element={<Payment/>}></Route>
        <Route path="/shipping" element={<Shipping/>}></Route>
      </Routes>
    </BrowserRouter>

     
  
    </>
  );
}

export default App;
