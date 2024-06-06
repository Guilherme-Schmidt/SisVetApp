import axios from "axios";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row,Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../NavigationBar/NavigationBar";

function AddAnimal({ apiURL, form, setForm }) {
  const navigate = useNavigate();
  const url = `${apiURL}/cadastrarAnimal`;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url, {
        idAnimal: form.idAnimal,
        nome: form.nome,
        sexo: form.sexo,
        idade: form.idade,
        peso: form.peso,
        raca: form.raca,
        alergia: form.alergia,
        cor: form.cor,
        especie: form.especie,
        proprietario: { idCliente: form.proprietario },
      });
      navigate("/listarAnimais");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Você não tem permissão para cadastrar animais.");
      } else {
        console.error("Erro:", error.message);
      }
    }
  };

  useEffect(() => {
    setForm({
      idAnimal: "",
      nome: "",
      sexo: "",
      idade: "",
      peso: "",
      raca: "",
      alergia: "",
      cor: "",
      especie: "",
      proprietario: "",
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
              Cadastrar Novo Animal
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-4 justify-content-center">
                <Col md={4}>
                  <Form.Group controlId="nome">
                    <Form.Label className="modern-label">
                      Nome do Animal
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira o nome completo do Animal"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="idAnimal">
                    <Form.Label className="modern-label">
                      Número da matrícula
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira o número da matrícula"
                      name="idAnimal"
                      value={form.idAnimal}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4 justify-content-center">
                <Col md={4}>
                  <Form.Group controlId="sexo">
                    <Form.Label className="modern-label">Sexo</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira o sexo do Animal"
                      name="sexo"
                      value={form.sexo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4 justify-content-center">
                <Col md={4}>
                  <Form.Group controlId="idade">
                    <Form.Label className="modern-label">Idade</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira a idade do Animal"
                      name="idade"
                      value={form.idade}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="peso">
                    <Form.Label className="modern-label">Peso</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira o peso do Animal"
                      name="peso"
                      value={form.peso}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4 justify-content-center">
                <Col md={4}>
                  <Form.Group controlId="raca">
                    <Form.Label className="modern-label">Raça</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira a raça do Animal"
                      name="raca"
                      value={form.raca}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="alergia">
                    <Form.Label className="modern-label">Alergia</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira a alergia do Animal"
                      name="alergia"
                      value={form.alergia}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4 justify-content-center">
                <Col md={4}>
                  <Form.Group controlId="cor">
                    <Form.Label className="modern-label">Cor</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira a cor do Animal"
                      name="cor"
                      value={form.cor}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="especie">
                    <Form.Label className="modern-label">Espécie</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira a espécie do Animal"
                      name="especie"
                      value={form.especie}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4 justify-content-center">
                <Col md={4}>
                  <Form.Group controlId="proprietario">
                    <Form.Label className="modern-label">
                      Proprietário (ID Cliente)
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insira o ID do Cliente"
                      name="proprietario"
                      value={form.proprietario}
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

export default AddAnimal;
