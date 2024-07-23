import axios from "axios";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../NavigationBar/NavigationBar";

function AddProduto({ apiURL, form, setForm }) {
  const navigate = useNavigate();
  const url = `${apiURL}/cadastrarProdutos`;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url, {
        nome: form.nome,
        descricao: form.descricao,
        preco: form.preco,
        categoria: form.categoria,
      });
      navigate("/listarProdutos");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Você não tem permissão para cadastrar produtos.");
      } else {
        console.error("Erro:", error.message);
      }
    }
  };

  useEffect(() => {
    setForm({
      nome: "",
      descricao: "",
      preco: "",
      categoria: "",
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
              Cadastrar Novo Produto
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-4 justify-content-center">
                <Col md={6}>
                  <Form.Group controlId="nome">
                    <Form.Label className="modern-label">Nome</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira o nome do produto"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4 justify-content-center">
                <Col md={6}>
                  <Form.Group controlId="descricao">
                    <Form.Label className="modern-label">Descrição</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira a descrição do produto"
                      name="descricao"
                      value={form.descricao}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4 justify-content-center">
                <Col md={6}>
                  <Form.Group controlId="preco">
                    <Form.Label className="modern-label">Preço</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      step="0.01"
                      placeholder="Insira o preço do produto"
                      name="preco"
                      value={form.preco}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4 justify-content-center">
                <Col md={6}>
                  <Form.Group controlId="categoria">
                    <Form.Label className="modern-label">Categoria</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      name="categoria"
                      value={form.categoria}
                      onChange={handleChange}
                    >
                      <option value="">Selecione a categoria</option>
                      <option value="REMEDIO">Remedio</option>
                      <option value="COLEIRA">Coleira</option>
                      <option value="RACAO">Racao</option>
                      <option value="BRINQUEDO">Brinquedo</option>
                      <option value="CAMA">Cama</option>
                    </Form.Control>
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
                  variant="primary"
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

export default AddProduto;