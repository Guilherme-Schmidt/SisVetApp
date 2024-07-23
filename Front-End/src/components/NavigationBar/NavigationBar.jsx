import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Logo from "../../images/logoG.png";
import "./NavigationBar.css"; // Adicione um arquivo CSS para os estilos personalizados

function NavigationBar() {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <Navbar variant="success" className="flex-column vertical-navbar">
      <Image src={Logo} className="logo" />

      <Nav className="flex-column nav-links">
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
          to="/cadastrarProdutos"
        >
          Produtos
        </Link>
        <Link
          className="btn btn-outline-light btn-lg m-1"
          role="button"
          to="/compras"
        >
          Compras
        </Link>
      </Nav>

      <Nav className="flex-column mt-auto">
        <Link
          className="btn btn-outline-light btn-lg m-1"
          role="button"
          to="/profilePage"
        >
          Perfil
        </Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
