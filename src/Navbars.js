import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

//This is Basic Styles Of NavBar 

function Navbars() {
    const style = {
        textDecoration: 'none',
        color: 'mistyrose',
        margin: '20px'
    }
    return (

        <Navbar bg="dark" variant="light">
            <Container>
                <Navbar.Brand ><Link to="/" style={style}>ππΌπΊπ²</Link></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link><Link to="/album" style={style}>πΌπ‘ππͺπ’</Link></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navbars;


