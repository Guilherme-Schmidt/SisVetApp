import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function NavigationBar() {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <Navbar bg="success" variant="success" fluid>    
        <Navbar.Brand>SisVetApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              className="btn btn-outline-light btn-lg m-1"
              role="button"
              to="/"
            >
              HomePage
            </Link>
            <Link
              className="btn btn-outline-light btn-lg m-1"
              role="button"
              to="/listarClientes"
            >
              Proprietários
            </Link>
            <Link
                className="btn btn-outline-light btn-lg m-1"
                role="button"
                to="/listarAnimais"
            >
              Animal
            </Link>
          </Nav>
        </Navbar.Collapse>

    </Navbar>
  );
}

export default NavigationBar;
