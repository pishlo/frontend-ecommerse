import React, { useEffect, useState } from "react";
import { fetchProducts } from "../utils/fetchProducts.js";
import CardComponent from "../components/CardComponent.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.products); // Adjust if necessary
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return <p className="text-center py-5 text-danger">Error: {error}</p>;

  if (!products.length) return (
    <div className="text-center py-5">
      <h3>No products found</h3>
      <p>Start by adding your first product!</p>
      {token && (
        <Link to="/create-product" className="btn btn-primary mt-3">
          Add Product
        </Link>
      )}
    </div>
  );

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Products</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <CardComponent
            key={product._id || product.id}
            brand={product.brand}
            model={product.model}
            images={product.images}
            stock={product.stock}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
