import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Logo from "../../images/logoG.png";
function NavigationBar() {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <Navbar bg="success" variant="success" fluid>
  <Image src={Logo} style={{ width: "10%", height: "10%" }} />
  
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ms-auto"> {/* Alterado de me-auto para ms-auto */}
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
      <Link
        className="btn btn-outline-light btn-lg m-1"
        role="button"
        to="/profilePage"
      >
        Perfil
      </Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

  );
}

export default NavigationBar;
