import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: "100vh", padding: "30px" }}>
      <Row>
        <Button className="p-4" variant="primary" size="lg">
          <Link className="nav-link" to="/listarClientes">
            Entrar no Sistema de Capacitação de Servidores (SisCAPACIT 1.0)
            <p />= MÓDULO ADMIN = 
          </Link>
        </Button>
      </Row>
    </Container>
  );
}

export default HomePage;
