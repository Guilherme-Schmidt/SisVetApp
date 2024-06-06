import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from "../../NavigationBar/NavigationBar";

function ClienteList({ apiURL }) {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const path = "/listarClientes";
  const url = `${apiURL}${path}`;

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(url);
        setClientes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClientes();
  }, [url]);

  const deleteCliente = async (idCliente) => {
    try {
      await axios.delete(`${apiURL}/excluirCliente/${idCliente}`);
      // Remover o cliente excluído da lista local
      setClientes(clientes.filter((cliente) => cliente.idCliente !== idCliente));
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  const renderClientes = clientes
    .filter((cliente) =>
      cliente.nome.toLowerCase().includes(search.toLowerCase())
    )
    .map((cliente) => (
      <tr key={cliente.idCliente}>
        <td>{cliente.nome}</td>
        <td>{cliente.cidade}</td>
        <td>{cliente.telefone}</td>
        <td>{cliente.email}</td>
        <td style={{ width: "250px" }}>
          <Link
            className="btn btn-warning btn-sm m-1"
            role="button"
            to={`/listarCliente/${cliente.idCliente}`}
          >
            Detalhar
          </Link>
          <Link
            className="btn btn-outline-secondary btn-sm m-1"
            role="button"
            to={`/editarCliente/${cliente.idCliente}`}
          >
            Alterar
          </Link>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (window.confirm("Deseja realmente EXCLUIR?")) {
                deleteCliente(cliente.idCliente);
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
      <NavigationBar /> {/* Movendo a NavigationBar para fora do Container */}
      <Container>
        <Form className="my-5">
          <Form.Control
            type="search"
            placeholder="Buscar por nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="success" size="md" className="mt-4 d-block mx-auto"> {/* Adicionando classe d-block para transformar o botão em um elemento de bloco e mx-auto para centralizá-lo horizontalmente */}
            <Link
              className="nav-link"
              to="/cadastrarCliente"
              style={{ color: "#fff" }}
            >
              Novo Cliente
            </Link>
          </Button>
        </Form>
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <Table className="mt-4" striped bordered hover>
            <thead className="">
              <tr>
                <th>Nome</th>
                <th>Cidade</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>{renderClientes}</tbody>
          </Table>
        )}
      </Container>
    </>
  );
}

export default ClienteList;
