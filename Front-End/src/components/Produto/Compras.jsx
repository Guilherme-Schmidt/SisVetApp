import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";

function Compras({ apiURL, form, setForm }) {
    const [produtos, setProdutos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [pagamentos, setPagamentos] = useState([
        "CREDITO",
        "DEBITO",
        "CHEQUE",
        "DINHEIRO"
    ]); // Lista de enumerações para pagamentos
    const navigate = useNavigate();
    const urlProdutos = `${apiURL}/listarProdutos`;
    const urlClientes = `${apiURL}/listarClientes`;
    const urlCadastro = `${apiURL}/compras`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [produtosResponse, clientesResponse] = await Promise.all([
                    axios.get(urlProdutos),
                    axios.get(urlClientes)
                ]);
                setProdutos(produtosResponse.data);
                setClientes(clientesResponse.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error.message);
            }
        };

        fetchData();

        setForm({
            produtoId: "",
            preco: "",
            data: "",
            clienteId: "",
            pagamento: ""
        });
    }, [apiURL, setForm]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Dados do formulário:", form);

        try {
            const response = await axios.post(urlCadastro, {
                produtos: { idProduto: form.produtoId }, // Certifique-se de que o nome do campo corresponde ao esperado pelo backend
                preco: form.preco,
                data: form.data,
                proprietario: { idCliente: form.clienteId }, // Certifique-se de que o nome do campo corresponde ao esperado pelo backend
                pagamento: form.pagamento,
            });
            console.log("Resposta do servidor:", response.data);
            navigate("/listarClientes");
        } catch (error) {
            if (error.response && error.response.status === 403) {
                alert("Você não tem permissão para cadastrar compras.");
            } else {
                console.error("Erro ao cadastrar compra:", error.message);
            }
        }
    };

    return (
        <>
            <NavigationBar />
            <Container>
                <Card className="p-4 my-4 shadow-sm border-dark" style={{ borderRadius: "15px" }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-5" style={{ color: "#4caf50", fontSize: "2rem" }}>
                            Cadastrar Nova Compra
                        </Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-4 justify-content-center">
                                <Col md={6}>
                                    <Form.Group controlId="produtoId">
                                        <Form.Label className="modern-label">Produto</Form.Label>
                                        <Form.Control
                                            as="select"
                                            required
                                            name="produtoId"
                                            value={form.produtoId}
                                            onChange={handleChange}
                                        >
                                            <option value="">Selecione um produto</option>
                                            {produtos.map((produto) => (
                                                <option key={produto.idProduto} value={produto.idProduto}>
                                                    {produto.nome} - {produto.quantidade} em estoque
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-4 justify-content-center">
                                <Col md={6}>
                                    <Form.Group controlId="preco">
                                        <Form.Label className="modern-label">Preço</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            step="0.01"
                                            placeholder="Insira o preço"
                                            name="preco"
                                            value={form.preco}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-4 justify-content-center">
                                <Col md={6}>
                                    <Form.Group controlId="data">
                                        <Form.Label className="modern-label">Data da Compra</Form.Label>
                                        <Form.Control
                                            required
                                            type="date"
                                            name="data"
                                            value={form.data}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-4 justify-content-center">
                                <Col md={6}>
                                    <Form.Group controlId="pagamento">
                                        <Form.Label className="modern-label">Pagamento</Form.Label>
                                        <Form.Control
                                            as="select"
                                            required
                                            name="pagamento"
                                            value={form.pagamento}
                                            onChange={handleChange}
                                        >
                                            <option value="">Selecione um método de pagamento</option>
                                            {pagamentos.map((pagamento) => (
                                                <option key={pagamento} value={pagamento}>
                                                    {pagamento}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-4 justify-content-center">
                                <Col md={6}>
                                    <Form.Group controlId="clienteId">
                                        <Form.Label className="modern-label">Cliente</Form.Label>
                                        <Form.Control
                                            as="select"
                                            required
                                            name="clienteId"
                                            value={form.clienteId}
                                            onChange={handleChange}
                                        >
                                            <option value="">Selecione um cliente</option>
                                            {clientes.map((cliente) => (
                                                <option key={cliente.idCliente} value={cliente.idCliente}>
                                                    {cliente.nome}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center mt-4">
                                <Button
                                    variant="secondary"
                                    onClick={() => navigate(-1)}
                                    className="me-3"
                                    style={{ borderRadius: "20px" }}
                                >
                                    Voltar
                                </Button>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{ borderRadius: "20px" }}
                                >
                                    Cadastrar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Compras;
