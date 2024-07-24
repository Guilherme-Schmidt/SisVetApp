import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function ClienteDetails({ apiURL }) {
  const [cliente, setCliente] = useState(null); // Inicializado como null
  const [compras, setCompras] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para o carregamento
  const [error, setError] = useState(null); // Estado para erros
  const { idCliente } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dos detalhes do cliente
        const clienteResponse = await axios.get(`${apiURL}/listarCliente/${idCliente}`);
        setCliente(clienteResponse.data);

        // Fetch das compras
        const comprasResponse = await axios.get(`${apiURL}/listarComprasPorCliente/${idCliente}`);
        setCompras(comprasResponse.data);

      } catch (error) {
        setError("Erro ao carregar dados.");
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false); // Atualiza o estado de carregamento no final
      }
    };

    fetchData();
  }, [apiURL, idCliente]);

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div>Carregando...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div>{error}</div>
      </Container>
    );
  }

  if (!cliente) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div>Cliente não encontrado.</div>
      </Container>
    );
  }

  return (
    <Container style={{ height: "100vh" }} className="d-flex flex-column justify-content-center align-items-center">
      <Card className="text-center w-100">
        <Card.Header>
          <Card.Title className="m-0">
            <h3>{cliente.nome}</h3>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Title>Informações Funcionais</Card.Title>
          <Row>
            <Col>
              {cliente.foto && (
                <Card.Img
                  variant="top"
                  src={cliente.foto}
                  style={{ height: "200px", width: "200px" }}
                />
              )}
            </Col>
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item action variant="primary">
                  Matrícula: {cliente.idCliente}
                </ListGroup.Item>
                <ListGroup.Item action variant="secondary">
                  Sexo: {cliente.sexo}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Card.Title>Informações de Endereço</Card.Title>
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item action variant="primary">
                  Rua: {cliente.rua}
                </ListGroup.Item>
                <ListGroup.Item action variant="secondary">
                  Número: {cliente.numero}
                </ListGroup.Item>
                <ListGroup.Item action variant="success">
                  Cidade: {cliente.cidade}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Card.Title>Informações de Contato</Card.Title>
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item action variant="primary">
                  Email: {cliente.email}
                </ListGroup.Item>
                <ListGroup.Item action variant="secondary">
                  Telefone: {cliente.telefone}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="mt-3">
            <Card.Title>Compras</Card.Title>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID Compra</th>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {compras.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">Nenhuma compra registrada.</td>
                  </tr>
                ) : (
                  compras.map((compra) => (
                    <tr key={compra.idCompra}>
                      <td>{compra.idCompra}</td>
                      <td>{compra.produtos ? compra.produtos.nome : "Desconhecido"}</td>
                      <td>{compra.produtos.preco}</td>
                      <td>{new Date(compra.data).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
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
