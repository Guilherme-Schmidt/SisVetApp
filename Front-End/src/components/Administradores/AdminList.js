import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Spinner, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function AdminList({ apiURL }) {
  const [admins, setAdmin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const path = "/listarAdmins";
  const url = `${apiURL}${path}`;

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(url);
        setAdmin(response.data);
        setIsLoading(false);
        fetchAdmin();
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdmin();
  }, []);

  const deleteEmployee = async (id) => {
    await axios.delete(`${apiURL}/excluirAdmin/${id}`);
    navigate("/listarAdmins");
};


  const renderClientes = admins
    .filter((admin) =>
        admin.nome.toLowerCase().includes(search.toLowerCase())
    )
    .map((admin) => {
      return (
        <tr key={admin._id}>
          <td>{admin.nome}</td>
          <td>{admin.email}</td>
          <td>{admin.senha}</td>
          <td style={{ width: "250px" }}>
            <Link
              className="btn btn-outline-primary btn-sm m-1"
              role="button"
              to={`/listarAdmin/${admin.id}`}
            >
              Detalhar
            </Link>
            
   
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                window.confirm("Deseja realmente EXCLUIR?") &&
                  deleteEmployee(admin.id);
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
            to="/cadastrarAdmin"
            style={{ color: "#fff" }}
          >
            Novo Administrador
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
              <th>Senha</th>
            </tr>
          </thead>
          <tbody>{renderClientes}</tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminList;
