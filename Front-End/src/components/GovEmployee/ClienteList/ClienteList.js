import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Spinner, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function ClienteList({ apiURL }) {
  const [employees, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const path = "/listarClientes";
  const url = `${apiURL}${path}`;

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(url);
        setClientes(response.data);
        setIsLoading(false);
        fetchClientes();
      } catch (error) {
        console.log(error);
      }
    };

    fetchClientes();
  }, []);

  const deleteEmployee = async (idCliente) => {
    await axios.delete(`${apiURL}/excluirCliente/${idCliente}`);
    navigate("/listarClientes");
};


  const renderClientes = employees
    .filter((employee) =>
      employee.nome.toLowerCase().includes(search.toLowerCase())
    )
    .map((employee) => {
      return (
        <tr key={employee._id}>
          <td>{employee.nome}</td>
          <td>{employee.cidade}</td>
          <td>{employee.telefone}</td>
          <td>{employee.email}</td>
          <td style={{ width: "250px" }}>
            <Link
              className="btn btn-outline-primary btn-sm m-1"
              role="button"
              to={`/listarCliente/${employee.idCliente}`}
            >
              Detalhar
            </Link>
            <Link
              className="btn btn-outline-secondary btn-sm m-1"
              role="button"
              to={`/editarCliente/${employee.idCliente}`}
            >
              Alterar
            </Link>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                window.confirm("Deseja realmente EXCLUIR?") &&
                  deleteEmployee(employee.idCliente);
              }}
            >
              Excluir
            </Button>
          </td>
        </tr>
      );
    });

  return (
    <Container>
      <Form className="my-4">
        <Form.Control
          type="search"
          placeholder="Buscar por nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="info" size="sm" className="mt-3">
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
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{renderClientes}</tbody>
        </Table>
      )}
    </Container>
  );
}

export default ClienteList;
