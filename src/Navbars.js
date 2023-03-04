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
                <Navbar.Brand ><Link to="/" style={style}>𝗛𝗼𝗺𝗲</Link></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link><Link to="/album" style={style}>𝘼𝙡𝙗𝙪𝙢</Link></Nav.Link>
                    <Nav.Link><Link to="/newalbum" style={style}> +Ａｄｄ Ａｌｂｕｍ</Link></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navbars;


