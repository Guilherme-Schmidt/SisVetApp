import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from "../../NavigationBar/NavigationBar";
import './ProdutoList.css'; // Adicione o arquivo CSS para o estilo personalizado

function ProductList({ apiURL }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const path = '/listarProdutos';
  const url = `${apiURL}${path}`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url);
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [url]);

  const deleteProduct = async (idProduto) => {
    try {
      const response = await axios.delete(`${apiURL}/deletarProduto/${idProduto}`);
      setProducts(products.filter(product => product.idProduto !== idProduto || product.quantidade > 1));
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
    }
  };

  const renderProducts = products
    .filter((product) => product.nome.toLowerCase().includes(search.toLowerCase()))
    .map((product) => (
      <tr key={product.idProduto}>
        <td>{product.nome}</td>
        <td>{product.descricao}</td>
        <td>{product.preco}</td>
        <td>{product.categoria}</td>
        <td>{product.quantidade}</td>
        <td style={{ width: "250px" }}>
          <Link
            className="btn btn-warning btn-sm m-1"
            role="button"
            to={`/listarProduto/${product.idProduto}`}
          >
            Detalhar
          </Link>
          <Link
            className="btn btn-outline-secondary btn-sm m-1"
            role="button"
            to={`/editarProduto/${product.idProduto}`}
          >
            Alterar
          </Link>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (window.confirm("Deseja realmente EXCLUIR?")) {
                deleteProduct(product.idProduto);
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
            placeholder="Buscar por nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button variant="success" size="md" className="mt-4 d-block mx-auto">
            <Link
              className="nav-link"
              to="/cadastrarProdutos"
              style={{ color: "#fff" }}
            >
              Novo Produto
            </Link>
          </Button>
          
        </Form>
        
        <Table className="mt-4" striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center">Carregando...</td>
              </tr>
            ) : (
              renderProducts
            )}
          </tbody>
        </Table>
        
      </Container>
    </>
  );
}

export default ProductList;
