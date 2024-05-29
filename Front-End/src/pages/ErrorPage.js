import { Button, Container } from "react-bootstrap";
// import { Link } from "react-router-dom"

function ErrorPage() {
  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Button className="p-4" variant="btn btn-outline-danger" size="lg">
        ERRO 404 - DOCUMENTO NÃO ENCONTRADO!
      </Button>
    </Container>
  );
}

export default ErrorPage;
