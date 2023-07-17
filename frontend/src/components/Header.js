import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

function CollapsibleExample() {

  const navigt = useNavigate();

  const submit = (e) => {
    e.preventDefault()
    if (window.localStorage.getItem("ok") === "1") {
      const nav = () => navigt('/Dashboard')
        nav();
    }
    else
    {
      const nav = () => navigt('/login-reg')
        nav(); 
    }
  } 

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{padding:10}}>
      <Container>
        <Navbar.Brand>{<HomeIcon/>}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={submit}>{<LoginIcon fontSize='large'/>}</Nav.Link>
          </Nav>
          <Nav>
            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
            {/* <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;