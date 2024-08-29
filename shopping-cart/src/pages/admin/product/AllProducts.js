import React, { useState, useEffect } from "react";
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { getProductsByCount, removeProduct } from "../../../functions/product";

const AllProducts = () => {
 
    const {user} = useSelector(state => state);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(10)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleRemove = (slug, title) => {
    // let answer = window.confirm("Delete?");
    if (window.confirm(`Deleteing ${title}`)) {
      // console.log("send delete request", slug);
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };
  return (
    <div className="mt-5">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-center">All Products</h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <AdminProductCard product={product} handleRemove={handleRemove} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllProducts;
