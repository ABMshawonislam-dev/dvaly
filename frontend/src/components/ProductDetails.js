import React from 'react';
import { useParams } from "react-router-dom";
const ProductDetails = () => {
    let params = useParams();
  return <div>{params.slug}</div>;
};

export default ProductDetails;
