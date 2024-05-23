import axios from "axios";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function EditGovEmployee({ apiURL, form, setForm }) {
  const navigate = useNavigate();
  const {idCliente} = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await axios.get(`${apiURL}/listarCliente/${idCliente}`);
      setForm(response.data);
    };

    fetchEmployee();
  }, [idCliente]);

  // monitorar todas as mudanças do nosso formulário
  const handleChange = (e) => {
    // monitora alterações no checkbox
    if (e.target.name === "active") {
      setForm({ ...form, active: e.target.checked });
      return;
    }

    // monitora alterações nos outros inputs
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const clone = { ...form };
      //delete clone._id;

      await axios.put(`${apiURL}/editarCliente/${idCliente}`, clone);
      navigate("/listarClientes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <p />
      <h2>Alterar Servidor</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Número da matrícula do servidor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alterar o número da matrícula?"
                name="matricula"
                value={form.matricula}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nome do servidor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alterar o nome completo do servidor?"
                name="nome"
                value={form.nome}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Rua</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alterar a Rua do proprietario?"
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
                type="text"
                placeholder="Alterar Numero de Residencia do proprietario?"
                name="numero"
                value={form.numero}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Cidade de Residencia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alterar a cidade de residencia do proprietario?"
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Endereço de e-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Alterar o endereço de e-mail do servidor?"
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
                type="text"
                placeholder="Alterar o número de telefone fixo (com DDD)?"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
         
        </Row>
        <Row>
          
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
          Alterar
        </Button>
        <p />
      </Form>
    </Container>
  );
}

export default EditGovEmployee;
