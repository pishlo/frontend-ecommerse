import React, { useEffect, useState } from "react";
import { fetchProducts } from "../utils/fetchProducts.js";
import CardComponent from "../components/CardComponent.jsx";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products.length) return <p>No products found</p>;

  return (
    <div className="container py-4">
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
