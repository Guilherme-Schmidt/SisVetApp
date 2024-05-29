import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

function HomePage({ apiURL, form, setForm }) {
  const navigate = useNavigate();
  const path = '/';
  const url = `${apiURL}${path}`;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(url, form);
      navigate('/listarClientes');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setForm({
      login: '',
      password: '',
      role: '',
    });
  }, [setForm]);

  return (
    <Container>
      <p />
      <h2>Cadastrar Novo Proprietário</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Login</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Insira o login"
                name="login"
                value={form.login || ''}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Insira a Senha"
                name="password"
                value={form.password || ''}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Role</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Insira o papel"
                name="role"
                value={form.role || ''}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <p />
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          style={{ margin: '10px' }}
        >
          Voltar
        </Button>
        <Button variant="success" type="submit">
          Cadastrar
        </Button>
        <p />
      </Form>
    </Container>
  );
}

export default HomePage;
