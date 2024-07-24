import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";

function CompraList({ apiURL }) {
  const [compras, setCompras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const url = `${apiURL}/listarCompras`;

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await axios.get(url);
        setCompras(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar compras:", error);
      }
    };

    fetchCompras();
  }, [url]);

  const deleteCompra = async (idCompra) => {
    try {
      await axios.delete(`${apiURL}/deletarCompra/${idCompra}`);
      setCompras(compras.filter(compra => compra.idCompra !== idCompra));
    } catch (error) {
      console.error("Erro ao excluir a compra:", error);
    }
  };

  const renderCompras = compras
    .filter((compra) => compra.idCompra.toString().includes(search.toLowerCase()))
    .map((compra) => (
      <tr key={compra.idCompra}>
        <td>{compra.idCompra}</td>
        <td>{compra.proprietario.nome }</td>
        <td>{compra.produtos ? compra.produtos.nome : "Desconhecido"}</td>
        <td>{new Date(compra.data).toLocaleDateString()}</td>
        <td style={{ width: "250px" }}>
          <Link
            className="btn btn-warning btn-sm m-1"
            role="button"
            to={`/listarCompra/${compra.idCompra}`}
          >
            Detalhar
          </Link>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (window.confirm("Deseja realmente EXCLUIR?")) {
                deleteCompra(compra.idCompra);
              }
            }}
          >
            Excluir
          </Button>
        </td>
      </tr>
    ));

  return (
    <>
      <NavigationBar />
      <Container className="container">
        <Form className="my-5">
          <Form.Control
            type="search"
            placeholder="Buscar por ID da Compra"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="success" size="md" className="mt-4 d-block mx-auto">
            <Link
              className="nav-link"
              to="/compras"
              style={{ color: "#fff" }}
            >
              Nova Compra
            </Link>
          </Button>
        </Form>
        <Table className="mt-4" striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Proprietário</th>
              <th>Produto</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center">Carregando...</td>
              </tr>
            ) : (
              renderCompras
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default CompraList;
