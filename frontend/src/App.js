import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
import {Navbar,Container,Nav,Badge} from 'react-bootstrap'

import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { useContext } from "react";
import {Store} from './Store'
function App() {


  const {state} = useContext(Store)


  return (
    <>

    


      <BrowserRouter>
      
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Dvaly</Navbar.Brand>
        <Nav className="ms-auto menu">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart
          {state.cart.cartItems.length > 0 && (
            <Badge pill bg="danger">
              {state.cart.cartItems.length}
            </Badge>
          )}
          </Link>
        </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/products" element={<ProductPage/>}></Route>
        <Route path="/products/:slug" element={<ProductDetails/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
      </Routes>
    </BrowserRouter>

     
  
    </>
  );
}

export default App;
