import React, { useState } from "react";
import { Container, Form, Button,Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import Logo from './images/vet.png';
import "./index.css";
function CadastroUsuario() {
  // Estados para armazenar os valores dos campos do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para enviar os dados para o backend
    console.log("Dados do formulário:", { nome, email, senha });
    // Limpar os campos após o envio do formulário
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
  };

  return (
  

    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark p-5">
      <Col xs={6} md={4}>
          <Image src={Logo}  />
        </Col>
      <Container className="p-5 bg-success text-white border border-success-subtle" style={{ maxWidth: "500px", borderRadius: "10px" } }>
        <h1>Cadastro de Usuário</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNome">
            <Form.Label >Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label className="mb-3">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSenha">
            <Form.Label className="mb-3">Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formConfirmarSenha">
            <Form.Label className="mb-3">Confirmar Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="light" type="submit" className="mb-0 m-3">
            Cadastrar
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default CadastroUsuario;
