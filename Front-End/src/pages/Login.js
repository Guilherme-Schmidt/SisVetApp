import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Col, Container, Form, Row, Alert } from 'react-bootstrap';

function Login({ apiURL, form, setForm }) {
  const navigate = useNavigate();
  const path = '/auth/login';
  const url = `${apiURL}${path}`;

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(url, form);
      navigate('/listarClientes');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 403) {
          setErrorMessage('Forbidden: You do not have the necessary permissions to access this resource.');
        } else {
          setErrorMessage(`Error: ${error.response.data.message || 'An error occurred.'}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('No response from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage('An error occurred: ' + error.message);
      }
    }
  };

  useEffect(() => {
    setForm({
      login: '',
      password: '',
    });
  }, [setForm]);

  return (
    <Container>
      <p />
      <h2>Login</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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
        <p />
        <Button variant="success" type="submit">
          Login
        </Button>
        <p />
      </Form>
    </Container>
  );
}

export default Login;
