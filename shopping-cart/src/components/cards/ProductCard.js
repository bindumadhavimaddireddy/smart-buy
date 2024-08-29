import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import {useDispatch, useSelector} from 'react-redux';
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../tools/laptop.jpeg";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import { uniqWith, isEqual } from "lodash";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const {user, cart} = useSelector(state => state);
  let dispatch = useDispatch();
  const [tooltip, setTooltip] = useState("Click to add");

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = uniqWith(cart, isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
    }
    setTooltip("Added");
    dispatch({
      type: 'ADD_TO_CART',
      payload: cart
    });
    dispatch({
      type: 'SET_VISIBLE',
      payload: true
    });

  };
  // destructure
  const { images, title, description, slug, price, quantity } = product;

  console.log('product', product);
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No Ratings yet</div>
      )}
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
            alt="laptop"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={quantity < 1}>
              <ShoppingCartOutlined className="text-danger" /> <br /> 
              {product.quantity < 1 ? "Out of Stock" : "Add to Cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
