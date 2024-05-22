import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, FormLabel, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function GovEmployeeList({ apiURL }) {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const path = '/listarClientes';
    const url = `${apiURL}${path}`;

    useEffect(() => {
        try {
            const fetchEmployees = async () => {
                const response = await axios.get(url)
                setEmployees(response.data)
                setIsLoading(false)
            }

            fetchEmployees()
        } catch (error) {
            console.log(error)
        }
    }, []);

    const deleteEmployee = async (matricula) => {
            await axios.delete(`${apiURL}/excluirCliente/${matricula}`);
            navigate("/listarClientes");
    };

    const renderEmployees = employees
        .filter((employee) => employee.nome.toLowerCase().includes(search.toLowerCase()))
        .map((employee) => {
            return (
                <tr key={employee._id}>
                    
                    <td>{employee.nome}</td>
                    <td>{employee.cidade}</td>
                    <td>{employee.telefone}</td>
                    <td>{employee.email}</td>
                    <td style={{width:'250px'}}>
                        <Link className="btn btn-outline-primary btn-sm m-1" role="button" to={`/listarCliente/${employee.idCliente}`}>Detalhar</Link>
                        <Link className="btn btn-outline-secondary btn-sm m-1" role="button" to={`/editarServidor/${employee.matricula}`}>Alterar</Link>
                        <Button variant="danger" size="sm" onClick={() => {window.confirm("Deseja realmente EXCLUIR?") && deleteEmployee(employee.matricula)}}>Excluir</Button>     
                    </td>
                </tr>
            )
        })

    return (
        <Container>
            <Form className="my-4">
                <FormLabel>
                    <h3>Total de Servidores:{employees.length}</h3>
                </FormLabel>
                <Form.Control
                    type="search"
                    placeholder="Procurar servidor"
                    value={ search }
                    onChange={ (e) => setSearch(e.target.value) }
                />
                < p/>
                <Button variant="info" size="sm">
                        <Link className="nav-link" to="/cadastrarServidor">Novo Servidor</Link>
                </Button>
            </Form>
            {isLoading && <Spinner className="" animation="border" />}
            {!isLoading &&
                <Table className="mt-4" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cidade</th>
                            <th>Telefone</th>
                            <th>Email</th>
                             <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        { renderEmployees }
                    </tbody>
                </Table>
            }
        </Container>
    )
}

export default GovEmployeeList;