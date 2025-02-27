import React from "react";
import AdditionalInfo from "../Components/Product/AdditionInfo/AdditionalInfo";
import Product from "../Components/Product/ProductMain/Product";
import RelatedProducts from "../Components/Product/RelatedProducts/RelatedProducts";

const ProductDetails = () => {
  return (
    <>
      <Product />
      <AdditionalInfo />
      <RelatedProducts />
    </>
  );
};

export default ProductDetails;
