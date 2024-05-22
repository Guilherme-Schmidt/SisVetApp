import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faPhone, faCalendarCheck, faCircleCheck, faBuildingUser} from "@fortawesome/free-solid-svg-icons";

function GovEmployeeDetails({ apiURL }) {
    const [employee, setEmployee] = useState({})
    const { matricula } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        try {
            const fetchEmployee = async () => {
                const response = await axios.get(`${apiURL}/listarServidor/${matricula}`)
                setEmployee(response.data)
            }

            fetchEmployee()
        } catch (error) {
            console.log(error)
        }
    }, [matricula])
   
    return (
        <Container style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
            
            <Card className="text-center w-100">
                <Card.Header>
                    <Card.Title className="m-0">
                        <h3>{employee.nome}</h3>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Informações Funcionais</Card.Title>
                    < p/>
                    <Row>
                        <Col>
                            <Card.Img variant="top" src={employee.foto} style={{ height: '200px',width:'200px' }}/>
                        </Col>
                        <Col>
                            <ListGroup variant="flush">
                                <ListGroup.Item action variant="primary">Matrícula: {employee.matricula}</ListGroup.Item>
                                <ListGroup.Item action variant="secondary">Órgão: {employee.orgao}</ListGroup.Item>
                                <ListGroup.Item action variant="success">Cargo: {employee.cargo}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col>
                            <ListGroup variant="flush">
                                <ListGroup.Item action variant="primary">Lotação: {employee.lotacao}</ListGroup.Item>
                                <ListGroup.Item action variant="secondary">Exercício: {employee.exercicio}</ListGroup.Item>
                                <ListGroup.Item action variant="success">Vínculo: {employee.vinculo}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Card.Title>Informações Pessoais</Card.Title>
                        <Col>
                            <ListGroup variant="flush">
                                <ListGroup.Item action variant="primary">Email: {employee.email}</ListGroup.Item>
                                <ListGroup.Item action variant="secondary">Telefone: {employee.telefone}</ListGroup.Item>
                                <ListGroup.Item action variant="success">Celular: {employee.celular}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col>
                            <ListGroup variant="flush">
                                <ListGroup.Item action variant="primary">CPF: {employee.cpf}</ListGroup.Item>
                                 <ListGroup.Item action variant="success">Naturalidade: {employee.naturalidade}</ListGroup.Item>
                            </ListGroup>

                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Button
                                variant="secondary"
                                onClick={() => navigate(-1)}
                            >
                                Voltar</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default GovEmployeeDetails;