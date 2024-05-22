import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormLabel,
  Spinner,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ClienteList({ apiURL }) {
  const [clientes, setCliente] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const path = "/listarServidores";
  const url = `${apiURL}${path}`;

  useEffect(() => {
    try {
      const fetchEmployees = async () => {
        const response = await axios.get(url);
        setCliente(response.data);
        setIsLoading(false);
      };

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteEmployee = async (matricula) => {
    await axios.delete(`${apiURL}/excluirServidor/${matricula}`);
    navigate("/listarServidores");
  };

  const renderEmployees = clientes
    .filter((cliente) =>
      cliente.nome.toLowerCase().includes(search.toLowerCase())
    )
    .map((cliente) => {
      return (
        <tr key={cliente._id}>
          <td>{cliente.nome}</td>
          <td>{cliente.email}</td>
          <td>{cliente.telefone}</td>
          <td>{cliente.cidade}</td>

          <td style={{ width: "250px" }}>
            <Link
              className="btn btn-outline-primary btn-sm m-1"
              role="button"
              to={`/listarServidor/${setCliente.idCliente}`}
            >
              Detalhar
            </Link>
            <Link
              className="btn btn-outline-secondary btn-sm m-1"
              role="button"
              to={`/editarServidor/${setCliente.idCliente}`}
            >
              Alterar
            </Link>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                window.confirm("Deseja realmente EXCLUIR?") &&
                  deleteEmployee(cliente.idCliente);
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
        <FormLabel>
          <h3>Total de Proprietários: {clientes.length}</h3>
        </FormLabel>
        <Form.Control
          type="search"
          placeholder="Procurar servidor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p />
        <Button variant="info" size="sm">
          <Link className="nav-link" to="/cadastrarServidor">
            Novo Proprietário
          </Link>
        </Button>
      </Form>
      {isLoading && <Spinner className="" animation="border" />}
      {!isLoading && (
        <Table className="mt-4" striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Cidade</th>

              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{renderEmployees}</tbody>
        </Table>
      )}
    </Container>
  );
}

export default ClienteList;
