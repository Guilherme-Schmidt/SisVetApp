import React, { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Logo from "./images/vet.png";
import "./index.css";
import LogoG from "./images/logoG.png";
import UserService from "./components/service/UserService";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting login with", { email, password });

    try {
      const userData = await UserService.login(email, password);
      console.log("User Data Received:", userData);

      if (userData.token) {
        localStorage.setItem("token", userData.token);
        navigate("/listarClientes");
      } else {
        setError(userData.message || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro no login:", error.message);
      setError(error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Col xs={6} md={4}>
        <Image src={Logo} />
      </Col>
      
      <Container className="p-5 bg-success text-white border border-success-subtle" style={{ maxWidth: "500px", borderRadius: "10px" }}>
      <Image src={LogoG} />
      
        <Form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email do usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Senha do usuario"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-3">
            Login
          </Button>
       
        </Form>
      </Container>
    </div>
  );
}

export default Login;
