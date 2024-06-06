import axios from "axios";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row,Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../../NavigationBar/NavigationBar";

function EditAnimal({ apiURL, form, setForm }) {
  const navigate = useNavigate();
  const {idAnimal} = useParams();

  useEffect(() => {
    const fetchAnimal = async () => {
      const response = await axios.get(`${apiURL}/listarAnimal/${idAnimal}`);
      setForm(response.data);
    };

    fetchAnimal();
  }, [idAnimal]);

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

      await axios.put(`${apiURL}/editarAnimal/${idAnimal}`, clone);
      navigate("/listarAnimais");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <Card className="p-4 my-4 shadow-sm border-dark" style={{ borderRadius: "15px" }}>
          <Card.Body>
            <Card.Title className="text-center mb-5" style={{ color: "#4caf50", fontSize: "2rem" }}>
              Alterar Animal
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-4 justify-content-center">
              
                <Col md={4}>
                  <Form.Group controlId="nome">
                    <Form.Label className="modern-label">Nome do Animal</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Alterar o nome completo do Animal?"
                      name="nome"
                      value={form.nome}
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
                      type="text"
                      placeholder="Alterar a idade do animal?"
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
                      type="text"
                      placeholder="Alterar Peso do animal?"
                      name="peso"
                      value={form.peso}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="alergia">
                    <Form.Label className="modern-label">Alergia</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Alterar a alergia do animal?"
                      name="alergia"
                      value={form.alergia}
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
                  Alterar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default EditAnimal;
