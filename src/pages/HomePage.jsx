import React from "react";
import { useEffect, useState} from "react"
import {fetchProducts} from "../utils/fetchProducts.js"

const HomePage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const loadProducts = async () => {
        try {
            const data = await fetchProducts()
            setProducts(data.products) // this may change dependeing on your data
        } catch (error) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
      }
      loadProducts()
    }, [])
     
    // evaluate for loading or errors
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!products.length) return <p>No products found</p>

    // ✅ Render products when available
    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>{product.model}</li>
            ))}
        </ul>
    )
  }
  
  export default HomePage