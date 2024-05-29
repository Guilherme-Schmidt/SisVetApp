import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faPhone,
  faCalendarCheck,
  faCircleCheck,
  faBuildingUser,
} from "@fortawesome/free-solid-svg-icons";

function ClienteDetails({ apiURL }) {
  const [employee, setEmployee] = useState({});
  const { idCliente } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/listarCliente/${idCliente}`
        );
        setEmployee(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployee();
  }, [apiURL, idCliente]);

  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Card className="text-center w-100">
        <Card.Header>
          <Card.Title className="m-0">
            <h3>{employee.nome}</h3>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Title>Informações Funcionais</Card.Title>
          <p />
          <Row>
            <Col>
              {/* Renderizar a imagem apenas se a foto estiver disponível */}
              {employee.foto && (
                <Card.Img
                  variant="top"
                  src={employee.foto}
                  style={{ height: "200px", width: "200px" }}
                />
              )}
            </Col>
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item action variant="primary">
                  Matrícula: {employee.idCliente}
                </ListGroup.Item>
                <ListGroup.Item action variant="secondary">
                  Sexo: {employee.sexo}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Card.Title>Informações de Endereço</Card.Title>
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item action variant="primary">
                  Rua: {employee.rua}
                </ListGroup.Item>
                <ListGroup.Item action variant="secondary">
                  Número: {employee.numero}
                </ListGroup.Item>
                <ListGroup.Item action variant="success">
                  Cidade: {employee.cidade}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Card.Title>Informações de Contato</Card.Title>
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item action variant="primary">
                  Email: {employee.email}
                </ListGroup.Item>
                <ListGroup.Item action variant="secondary">
                  Telefone: {employee.telefone}
                </ListGroup.Item>
                <ListGroup.Item action variant="success">
                  Celular: {employee.celular}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Voltar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ClienteDetails;
