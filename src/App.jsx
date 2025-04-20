import { useEffect, useState} from "react"
import {fetchProducts} from "./utils/fetchProducts.js"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePage from "./pages/CreateProduct.jsx"
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import NotFoundPage from "./pages/NotFoundPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import NavBar from "./components/NavBar.jsx"
import FooterComp from "./components/FooterComp.jsx"


const App = () => {
  return (
    <>
      <Router>
        <NavBar/>
        <main
          style={{ minHeight: "calc(100vh - 180px)"}}
          className="container d-flex flex-column justify-content-center align-items-center"
        >
          <Routes>
            <Route path="/create-product" element={<CreatePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
          </Routes>
        </main>
        <FooterComp/>
      </Router>
    
    </>
  )
}

export default App

// const HomePage = () => {
//   const [products, setProducts] = useState([])
  
//   useEffect(() => {
//     const loadProducts = async () => {
//      try {
//       const data = await fetchProducts()
//       setProducts(data.products) // this may change dependeing on your data
//      } catch (error) {
//       console.error("Error loading products:", error)
//      }
//     }
//     loadProducts()
//   }, [])
   
//   return (
//     <div>
//       <h1 className="text-center">App</h1>
//       <p> {products.length === 0 ? "no products yet ..." : "something is here"} </p>
//     </div>
//   )
// }

// export default HomePage