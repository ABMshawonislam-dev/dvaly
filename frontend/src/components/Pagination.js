import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card, Button,Spinner,Modal,Badge,Form} from 'react-bootstrap'
import {Link } from "react-router-dom";
import Rating from './Rating';
import ReactPaginate from 'react-paginate';


const Pagination = ({ itemsPerPage,product,state3,handleDetails,handleAddToCart,handleAddToWishlist }) => {
       // We start with an empty list of items.
   const [currentItems, setCurrentItems] = useState(product);
   const [pageCount, setPageCount] = useState(0);
   const [itemOffset, setItemOffset] = useState(0);

   console.log('load',product)
 
    // Example items, to simulate fetching from another resources.
    // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const items = [];

        product.map((item,index)=>{
            items.push(index+1)
         })
            

    


function Items({ currentItems }) {
  return (
    <>
    
      {currentItems.length > 0 ?
      currentItems.map((item) => (
        
       
        <Col lg={3}>
        <Card>
          <Card.Img variant="top" src={item.img} />
          <Card.Body>
            <Card.Title>
              {state3.userInfo
              ?
              <Link to={state3.userInfo.isAffiliate?`/products/${item.slug}?id:${state3.userInfo._id}`:`/products/${item.slug}`}>{item.name} {item.totalSale > 50 ?<Badge bg="warning">Best Seller</Badge>:""}</Link>
              :
              <Link to={`/products/${item.slug}`}>{item.name} {item.totalSale > 50 ?<Badge bg="warning">Best Seller</Badge>:""}</Link>
              }
                
            </Card.Title>
            <Card.Text>
            
            <Rating rating={item.rating} numberofrating={item.numberofrating}/>
            <div dangerouslySetInnerHTML={{__html: item.description}}></div>
       
            </Card.Text>
            <Card.Text>
             {item.price}$
            </Card.Text>
          </Card.Body>
          <Card.Body>
            {/* {cartItems.map(items=>(
                item._id == items._id 
                  ?
                  <>
                  <Button onClick={()=>upadateCart(item,items.quantity+1)}  disabled={items.quantity == item.instock} variant="success">+</Button>
                  <span>{items.quantity}</span>
                  <Button onClick={()=>upadateCart(item,items.quantity-1)} disabled={items.quantity === 1} variant="success">-</Button>
                  <Button className='ms-2' onClick={()=>handleRemoveItem(item)} variant="danger">Remove form Cart</Button>
                  </>
                  :
                  ""
                

            ))} */}
          <br/>
          {item.instock == 0 
            ?
            <>
              <Button variant="danger">Out Of Stock</Button>
            <Button className='mt-3' onClick={()=>handleDetails(item.slug)}>Details</Button>
            <Button className='mt-3' onClick={()=>handleAddToWishlist(item)}>Wishlist</Button>
              
            </>
            :
           <>
             <Button className='mt-3 me-2' onClick={()=>handleAddToCart(item)}  variant="primary">Add to cart</Button>
            <Button className='mt-3' onClick={()=>handleDetails(item.slug)}>Details</Button>
            <Button className='mt-3' onClick={()=>handleAddToWishlist(item)}>Wishlist</Button>
           </>
          }
          </Card.Body>
        </Card>
        </Col>
  
    ))
    :
    <h1>Loading.......</h1>
        }
    </>
  );
}

   useEffect(() => {
     // Fetch items from another resources.
     console.log(itemOffset)
     const endOffset = itemOffset + itemsPerPage;
     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
     setCurrentItems(product.slice(itemOffset, endOffset));
     setPageCount(Math.ceil(items.length / itemsPerPage));
   }, [itemOffset, itemsPerPage,product]);
 
   // Invoke when user click to request another page.
   const handlePageClick = (event) => {
     const newOffset = (event.selected * itemsPerPage) % items.length;
     console.log(
       `User requested page number ${event.selected}, which is offset ${newOffset}`
     );
     setItemOffset(newOffset);
   };
 
   return (
     <>
       <Items currentItems={currentItems} />
       <ReactPaginate
         breakLabel="..."
         nextLabel="next >"
         onPageChange={handlePageClick}
         pageRangeDisplayed={5}
         pageCount={pageCount}
         previousLabel="< previous"
         renderOnZeroPageCount={null}
       />
     </>
   );
}

export default Pagination