import React, { useState } from "react";
import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputForm";
import { useNavigate } from "react-router-dom";
import AlertComp from "../components/AlertComp";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    image: null
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fieldConfig = [
    { name: "firstName", label: "First Name", type: "text", id: "firstNameInput" },
    { name: "lastName", label: "Last Name", type: "text", id: "lastNameInput" },
    { name: "email", label: "Email", type: "email", id: "emailInput" },
    { name: "password", label: "Password", type: "password", id: "pwdInput" },
    { name: "role", label: "Role", type: "text", id: "roleInput" },
    { name: "image", label: "Avatar", type: "file", id: "imageInput" }
  ];

  const handleChange = (field, type) => (value) => {
    setFormData(prev => ({
      ...prev,
      [field]: type === 'file' ? value : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare object to send (ignore real image for now)
      const toSend = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        imageUrl: "placeholder" // hardcoded for now
      };

      const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(toSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw Error(errorData.message || "Signup failed");
      }

      setSuccess("Account created successfully!");
      setError('');

      // Optionally redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="card shadow-sm p-4 w-100"
      style={{ maxWidth: "400px", margin: "auto" }}
      onSubmit={handleSubmit}
    >
      <h1 className="text-center">Sign Up</h1>

      {fieldConfig.map(({ name, label, type, id }) => (
        <div className="mb-3" key={name}>
          <LabelComp htmlFor={id} displayText={label} />
          <InputForm
            type={type}
            id={id}
            value={type === 'file' ? undefined : formData[name]}
            onChange={handleChange(name, type)}
            ariaDescribe={`${id}Help`}
          />
        </div>
      ))}

      {error && <AlertComp alertType="alert-danger" text={error} />}
      {success && <AlertComp alertType="alert-success" text={success} />}

      <div>
        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default SignUpPage;
