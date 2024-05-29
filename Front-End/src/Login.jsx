import React, {useEffect ,useState, Select } from "react";
import { Container, Form, Button,Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import Logo from './images/vet.png';
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CadastroUsuario({ apiURL, form, setForm }) {
  const navigate = useNavigate();
  const path = "/auth/login";
  const url = `${apiURL}${path}`;
  
  const handleChange = (e) => {
    //monitoramento dos inputs
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url, form);
      navigate("/listarClientes");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Usuário não tem permissão para acessar o recurso
        alert("Você não tem permissão para login.");
      } else {
        // Outro erro ocorreu
        console.error("Erro:", error.message);
      }
    }
  };


  useEffect(() => {
    setForm({
      email: "",
      senha:"",
    });
  }, []);


  return (
  
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark p-5">
      <Col xs={6} md={4}>
          <Image src={Logo}  />
        </Col>
      <Container className="p-5 bg-success text-white border border-success-subtle" style={{ maxWidth: "500px", borderRadius: "10px" } }>
        <h1>Login de Usuário</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label className="mb-3">Email</Form.Label>
           <Form.Control
                required
                type="email"
                placeholder="Insira o Email do funcionario"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
          </Form.Group>

          <Form.Group controlId="formSenha">
            <Form.Label className="mb-3">Senha</Form.Label>
            <Form.Control
                required
                type="password"
                placeholder="Insira a senha de acesso do Funcionario"
                name="senha"
                value={form.senha}
                onChange={handleChange}
              />
          </Form.Group>

        
          <Button variant="light" type="submit" className="mb-0 m-3">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default CadastroUsuario;
