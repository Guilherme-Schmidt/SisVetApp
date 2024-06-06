import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from "../../NavigationBar/NavigationBar";

function AnimalList({ apiURL }) {
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const path = '/listarAnimais';
  const url = `${apiURL}${path}`;

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get(url);
        setAnimals(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnimals();
  }, [url]);

  const deleteAnimal = async (idAnimal) => {
    await axios.delete(`${apiURL}/excluirAnimal/${idAnimal}`);
    window.location.reload(); // Recarrega a página após a exclusão
  };

  const renderAnimals = animals
    .filter((animal) => animal.nome.toLowerCase().includes(search.toLowerCase()))
    .map((animal) => (
      <tr key={animal.idAnimal}>
        <td>{animal.nome}</td>
        <td>{animal.raca}</td>
        <td>{animal.especie}</td>
        <td>{animal.cor}</td>
        <td>{animal.proprietario.nome}</td>
        <td style={{ width: "250px" }}>
          <Link
            className="btn btn-warning btn-sm m-1"
            role="button"
            to={`/listarAnimal/${animal.idAnimal}`}
          >
            Detalhar
          </Link>
          <Link
            className="btn btn-outline-secondary btn-sm m-1"
            role="button"
            to={`/editarAnimal/${animal.idAnimal}`}
          >
            Alterar
          </Link>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (window.confirm("Deseja realmente EXCLUIR?")) {
                deleteAnimal(animal.idAnimal);
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
              to="/cadastrarAnimal"
              style={{ color: "#fff" }}
            >
              Novo Animal
            </Link>
          </Button>
          
        </Form>
        
          <Table className="mt-4" striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Raça</th>
                <th>Espécie</th>
                <th>Cor</th>
                <th>Proprietário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>{renderAnimals}</tbody>
          </Table>
        
      </Container>
    </>
  );
}

export default AnimalList;
