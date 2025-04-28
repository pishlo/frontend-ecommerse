import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputForm";
import AlertComp from "../components/AlertComp";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    images: '',
    stock: '',
    price: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (field) => (value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Not authenticated. Please login first.");
      }

      const response = await fetch("http://localhost:3000/api/products/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          brand: formData.brand,
          model: formData.model,
          images: formData.images.split(",").map(img => img.trim()),
          stock: Number(formData.stock),
          price: Number(formData.price),
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to add product");
      }

      setSuccessMessage("Product added successfully!");
      setErrorMessage('');
      setFormData({ brand: '', model: '', images: '', stock: '', price: '' });

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setErrorMessage(err.message);
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  const fieldConfig = [
    { name: "brand", label: "Brand", type: "text", id: "brandInput" },
    { name: "model", label: "Model", type: "text", id: "modelInput" },
    { name: "images", label: "Images (comma-separated URLs)", type: "text", id: "imagesInput" },
    { name: "stock", label: "Stock", type: "number", id: "stockInput" },
    { name: "price", label: "Price", type: "number", id: "priceInput" },
  ];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Add New Product</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
        {fieldConfig.map(({ name, label, type, id }) => (
          <div className="mb-3" key={name}>
            <LabelComp htmlFor={id} displayText={label} />
            <InputForm
              type={type}
              id={id}
              value={formData[name]}
              ariaDescribe={`${id}Help`}
              onChange={handleChange(name)}
            />
          </div>
        ))}

        {successMessage && <AlertComp alertType="alert-success" text={successMessage} />}
        {errorMessage && <AlertComp alertType="alert-danger" text={errorMessage} />}

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
