import axios from "axios";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";
import NavigationBar from "../../NavigationBar/NavigationBar";

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
      navigate("/listarClientes");
    } catch (error) {
      if (error.response && error.response.status === 403) {
       
        alert("Você não tem permissão para cadastrar clientes.");
      } else {
   
        console.error("Erro:", error.message);
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
      foto: "",
    });
  }, []);
  
  return (
    <>
      <NavigationBar />
      <Container>
        <Card
          className="p-4 my-4 shadow-sm border-dark"
          style={{ borderRadius: "15px" }}
        >
          <Card.Body>
            <Card.Title
              className="text-center mb-5"
              style={{ color: "#4caf50", fontSize: "2rem" }}
            >
              Cadastrar Proprietário
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-4 justify-content-center">
                <h4 className="mb-3">Informações Pessoais e Funcionais</h4>
                <Col md={4}>
                  <Form.Group controlId="nome">
                    <Form.Label className="modern-label">
                      Nome do Proprietário
                    </Form.Label>
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
                <Col md={3}>
                  <Form.Group controlId="idCliente">
                    <Form.Label className="modern-label">
                      Número da matrícula
                    </Form.Label>
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
                <Col md={4}>
                  <Form.Group controlId="sexo">
                    <Form.Label className="modern-label">Sexo</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira o sexo do Proprietário"
                      name="sexo"
                      value={form.sexo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-4 justify-content-center">
                <h4 className="mb-3">Endereço</h4>
                <Col md={4}>
                  <Form.Group controlId="rua">
                    <Form.Label className="modern-label">Rua</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira a Rua da Residência"
                      name="rua"
                      value={form.rua}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="numero">
                    <Form.Label className="modern-label">Número</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira o Número da Residência"
                      name="numero"
                      value={form.numero}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="cidade">
                    <Form.Label className="modern-label">Cidade</Form.Label>
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

              <Row className="mb-4">
                <h4 className="">Informações de Contato</h4>
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label className="modern-label">
                      Endereço de e-mail
                    </Form.Label>
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
                <Col md={6}>
                  <Form.Group controlId="telefone">
                    <Form.Label className="modern-label">
                      Número de telefone
                    </Form.Label>
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

              <div className="d-flex justify-content-center mt-4">
                <Button
                  variant="secondary"
                  onClick={() => navigate(-1)}
                  className="me-3"
                  style={{ borderRadius: "20px" }}
                >
                  Voltar
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  style={{ borderRadius: "20px" }}
                >
                  Cadastrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default AddCliente;
