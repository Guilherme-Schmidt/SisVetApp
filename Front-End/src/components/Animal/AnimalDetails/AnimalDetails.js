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

function AnimalDetails({ apiURL }) {
  const [animal, setAnimal] = useState({});
  const { idAnimal } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await axios.get(`${apiURL}/listarAnimal/${idAnimal}`);
        setAnimal(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnimal();
  }, [idAnimal]);

  return (
    <Container style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
      <Card className="text-center w-100">
        <Card.Header>
          <Card.Title className="m-0">
            <h3>{animal.nome}</h3>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Title>Informações Funcionais</Card.Title>
          <Row>
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item action variant="primary">Matrícula: {animal.idAnimal}</ListGroup.Item>
                <ListGroup.Item action variant="secondary">Sexo: {animal.sexo}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item action variant="primary">Idade: {animal.idade}</ListGroup.Item>
                <ListGroup.Item action variant="secondary">Peso: {animal.peso}</ListGroup.Item>
                <ListGroup.Item action variant="success">Raça: {animal.raca}</ListGroup.Item>
                <ListGroup.Item action variant="primary">Alergia: {animal.alergia}</ListGroup.Item>
                <ListGroup.Item action variant="secondary">Cor: {animal.cor}</ListGroup.Item>
                <ListGroup.Item action variant="success">Espécie: {animal.especie}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          {animal.proprietario && (
            <Row>
              <Col>
                <Card.Title>Informações Proprietário</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item action variant="primary">Nome: {animal.proprietario.nome}</ListGroup.Item>
                  <ListGroup.Item action variant="secondary">Matrícula: {animal.proprietario.idCliente}</ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          )}
          <Row className="mt-3">
            <Col>
              <Button
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Voltar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AnimalDetails;
