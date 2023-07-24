import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import fetchData from "../../data/fetchData";
import ProductData from "../../data/product.data";

const NoMatchPage = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname.slice(-21);

  const [product, setProduct] = useState();

  const getProductByID = () =>
    fetchData(ProductData.get, { setProduct }, pathname);

  useEffect(() => {
    if (pathname.length !== 21) navigate("/");

    getProductByID();

    product ? props.handleProductSelection(product) : 0;
  }, [product]);

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

export default NoMatchPage;
