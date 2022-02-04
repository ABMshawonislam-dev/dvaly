import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
import {Navbar,Container,Nav} from 'react-bootstrap'

import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import ProductDetails from "./components/ProductDetails";
function App() {
  return (
    <>

    


      <BrowserRouter>
      
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Dvaly</Navbar.Brand>
        <Nav className="ms-auto menu">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/products" element={<ProductPage/>}></Route>
        <Route path="/products/:slug" element={<ProductDetails/>}></Route>
      </Routes>
    </BrowserRouter>

     
  
    </>
  );
}

export default App;
