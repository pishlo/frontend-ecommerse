const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/getProducts`);
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        const data = await response.json();
        return data
    } catch (error){
        console.error("Error fetching products:", error)
        throw error
    }
}