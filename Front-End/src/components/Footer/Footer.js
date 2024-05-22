import { Container, Navbar } from "react-bootstrap";

function Footer() {
    
    return (
        <Navbar bg="primary" variant="primary" expand="lg">
            <Container className="d-flex align-items-center justify-content-center">
                <footer>
                    <div className="col-sm-12 text-center">© Antonio Sampaio Jr - Todos os direitos reservados</div>
                </footer>   
            </Container>
        </Navbar>
    );
}
export default Footer;