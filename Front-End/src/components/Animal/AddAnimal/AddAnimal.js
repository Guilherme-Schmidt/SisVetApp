import axios from "axios";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
        proprietario: { idCliente: form.proprietario }
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
    <Container>
      <p />
      <h2>Cadastrar Novo Animal</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="nome">Nome do Animal</Form.Label>
              <Form.Control
                required
                type="text"
                id="nome"
                placeholder="Insira o nome completo do Animal"
                name="nome"
                value={form.nome}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label htmlFor="idAnimal">Número da matrícula</Form.Label>
              <Form.Control
                required
                type="text"
                id="idAnimal"
                placeholder="Insira o número da matrícula"
                name="idAnimal"
                value={form.idAnimal}
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
              <Form.Label htmlFor="sexo">Sexo</Form.Label>
              <Form.Control
                required
                type="text"
                id="sexo"
                placeholder="Insira o sexo do Animal"
                name="sexo"
                value={form.sexo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <h4>Informações Adicionais</h4>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="idade">Idade</Form.Label>
              <Form.Control
                required
                type="text"
                id="idade"
                placeholder="Insira a idade do Animal"
                name="idade"
                value={form.idade}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="peso">Peso</Form.Label>
              <Form.Control
                required
                type="text"
                id="peso"
                placeholder="Insira o peso do Animal"
                name="peso"
                value={form.peso}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="raca">Raça</Form.Label>
              <Form.Control
                required
                type="text"
                id="raca"
                placeholder="Insira a raça do Animal"
                name="raca"
                value={form.raca}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="alergia">Alergia</Form.Label>
              <Form.Control
                required
                type="text"
                id="alergia"
                placeholder="Insira a alergia do Animal"
                name="alergia"
                value={form.alergia}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="cor">Cor</Form.Label>
              <Form.Control
                required
                type="text"
                id="cor"
                placeholder="Insira a cor do Animal"
                name="cor"
                value={form.cor}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="especie">Espécie</Form.Label>
              <Form.Control
                required
                type="text"
                id="especie"
                placeholder="Insira a espécie do Animal"
                name="especie"
                value={form.especie}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="proprietario">Proprietário (ID Cliente)</Form.Label>
              <Form.Control
                required
                type="text"
                id="proprietario"
                placeholder="Insira o ID do Cliente"
                name="proprietario"
                value={form.proprietario}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>  
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
}

export default AddAnimal;
