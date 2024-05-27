import axios from "axios";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

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
    <Container>
      <p />
      <h2>Alterar Animal</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Número da matrícula do Animal</Form.Label>
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
              <Form.Label>Nome do Animal</Form.Label>
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

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Rua</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alterar a idade do animal?"
                name="idade"
                value={form.idade}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Peso</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alterar Peso do animal?"
                name="peso"
                value={form.peso}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Alergia</Form.Label>
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

export default EditAnimal;
