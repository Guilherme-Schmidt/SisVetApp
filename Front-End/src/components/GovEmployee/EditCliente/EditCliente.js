import axios from "axios";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function EditGovEmployee({ apiURL, form, setForm }) {
  const navigate = useNavigate();
  const { matricula } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await axios.get(`${apiURL}/listarServidor/${matricula}`);
      setForm(response.data);
    };

    fetchEmployee();
  }, [matricula]);

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

      await axios.put(`${apiURL}/editarServidor/${matricula}`, clone);
      navigate("/listarServidores");
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
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Foto do servidor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alterar o link da foto do servidor?"
                name="foto"
                value={form.foto}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Órgão</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alterar o nome do órgão ao qual o servidor está vinculado?"
                name="orgao"
                value={form.orgao}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Alterar o Tipo de vínculo?</Form.Label>
              <Form.Select
                value={form.vinculo} 
                name="vinculo"
                onChange={handleChange}
              >
                <option value="Estatutário">Estatutário</option>
                <option value="Comissionado">Comissionado</option>
                <option value="Terceirizado">Terceirizado</option>
                <option value="Estagiário">Estagiário</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Cargo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alterar o cargo do servidor?"
                name="cargo"
                value={form.cargo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Lotação</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alterar a cidade de lotação do servidor?"
                name="lotacao"
                value={form.lotacao}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Departamento de Exercício</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alterar o departamento de exercício do servidor?"
                name="exercicio"
                value={form.exercicio}
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
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Número de telefone celular</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alterar o número de telefone celular (com DDD)?"
                name="celular"
                value={form.celular}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Naturalidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alterar o nome da cidade onde o servidor nasceu?"
                name="naturalidade"
                value={form.naturalidade}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alterar o número do CPF do servidor?"
                name="cpf"
                value={form.cpf}
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

export default EditGovEmployee;
