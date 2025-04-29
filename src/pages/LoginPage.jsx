import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { checkEmail } from "../utils/checkFormErrors.js";
import AlertComp from "../components/AlertComp.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (changedValue) => {
    setEmail(changedValue);
  };

  const handlePasswordChange = (changedPassword) => {
    setPassword(changedPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!checkEmail.checkEmpty(email)) throw Error("Email is empty!");
      if (!checkEmail.checkFormat(email)) throw Error("Invalid email format!");

      setError(null);

      console.log("sending request for login")

      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status == 401) {
        throw Error("Invalid credentials, please check");
      };

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("firstName", data.firstName);

      navigate("/")

    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card shadow-sm p-4 w-100"
      style={{ maxWidth: "480px", margin: "auto" }}
    >
      <h1 className="text-center">Log In</h1>

      <div className="mb-3">
        <LabelComp htmlFor="emailInput" displayText="Give us your email !!" />
        <InputForm
          onChange={handleEmailChange}
          value={email}
          type="email"
          id="emailInput"
          ariaDescribe="emailHelp"
        />
      </div>

      <div className="mb-3">
        <LabelComp htmlFor="passwordInput" displayText="Password" />
        <InputForm
          onChange={handlePasswordChange}
          value={password}
          type="password"
          id="passwordInput"
          ariaDescribe="passwordHelp"
        />
      </div>

      {error && <AlertComp alertType="alert-danger" text={error} />}

      <div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default LogInPage;