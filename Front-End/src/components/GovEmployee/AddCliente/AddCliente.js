import axios from "axios";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";

function AddCliente({ apiURL, form, setForm }) {
  const navigate = useNavigate();
  const path = "/cadastrarCliente";
  const url = `${apiURL}${path}`;

  const handleChange = (e) => {
    //monitoramento dos inputs
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(url, form);
      navigate('/listarClientes');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Usuário não tem permissão para acessar o recurso
        alert('Você não tem permissão para cadastrar clientes.');
      } else {
        // Outro erro ocorreu
        console.error('Erro:', error.message);
      }
    }
  };
  

  useEffect(() => {
    setForm({
      idCliente: "",
      nome: "",
      sexo: "",
      rua: "",
      numero: "",
      cidade: "",
      email: "",
      telefone: "",
    });
  }, []);

  return (
    <Container>
      <p />
      <h2>Cadastrar Novo Proprietário</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nome do Proprietário</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Insira o nome completo do Proprietário"
                name="nome"
                value={form.nome}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Número da matrícula</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Insira o número da matrícula"
                name="idCliente"
                value={form.idCliente}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <h4>Informações Funcionais</h4>
        </Row>
        <Row>
         
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Sexo</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Insira o nome o sexo do Proprietário"
                name="sexo"
                value={form.sexo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <h4>Endereço</h4>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Rua</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Insira a Rua da Residencia"
                name="rua"
                value={form.rua}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Numero</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Insira o Numero da Residencia"
                name="numero"
                value={form.numero}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Cidade </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Insira a Cidade da Residência"
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <h4>Informações de Contato</h4>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Endereço de e-mail</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Insira o endereço de e-mail do servidor"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Número de telefone</Form.Label>
              <Form.Control
                required
                as={IMaskInput}
                mask="(00)00000-0000"
                type="text"
                placeholder="Insira o número de telefone fixo (com DDD)"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
       
        <p />
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          style={{ margin: "10px" }}
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

export default AddCliente;
